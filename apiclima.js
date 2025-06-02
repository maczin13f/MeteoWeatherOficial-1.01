const API_KEY = "9fd2e6d05708adae2650cf7871a24abc";

async function buscarPrevisao() {
  const cidade = document.getElementById("cidade").value.trim();
  const pais = document.getElementById("pais").value;

  let localBusca = cidade;

  const codigoISO = codigosPais[pais] || "";
  if (cidade && codigoISO) {
    localBusca += `,${codigoISO}`;

  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localBusca}&appid=${API_KEY}&units=metric&lang=pt`);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("Cidade não encontrada!");
      return;
    }

    const temperatura = data.main.temp;
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const sensacao = data.main.feels_like;
    const condicao = data.weather[0].main;
    const porcecloud = data.clouds.all;
    const velovento = data.wind.speed;
    const velocidadeKmh = (velovento * 3.6).toFixed(1);
    const direcaovento = data.wind.deg;
    const visib = data.visibility;
    const pressao = data.main.pressure;
    const humidade = data.main.humidity;
    const visibilidadeKm = (visib / 1000).toFixed(1);
    const condicaoTraduzidaComEmoji = condicoesTraduzidasComEmoji[condicao] || condicao;
    const descricaoOriginal = data.weather[0].description;
    const descricao1 = descricaoOriginal
      .toLowerCase()
      .split(" ")
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");

    // 🔍 Forecast
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`);
    const forecastData = await forecastRes.json();

    // Previsão dos próximos dias
    const previsoesPorDia = agruparPrevisaoPorDia(forecastData.list);

    const diasHtml = previsoesPorDia.map(previsao => `
            <div class="card-dias">
                <p class="dia-nome">${previsao.diaSemana}</p>
                <img src="https://openweathermap.org/img/wn/${previsao.icone}.png" alt="${previsao.descricao}" class="icone" />
                <p class="min-max"> Min: ${Math.round(previsao.tempMin)}°C / Max: ${Math.round(previsao.tempMax)}°C</p>
            </div>
        `).join("");

    document.getElementById("previsaoDias").innerHTML = `
            <h5>📆 Previsão dos próximos dias:</h5>
            <div id="dias">${diasHtml}</div>
        `;
    document.getElementById("previsaoDias").style.display = "";

    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    // Converte para o horário local com base no offset
    const sunriseTime = sunrise.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const sunsetTime = sunset.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const agora = new Date();
    const date = agora.toLocaleDateString("pt-BR");
    const time = agora.toLocaleTimeString("pt-BR");
    const hoje = previsoesPorDia[0];
    const tempmin = hoje.tempMin;
    const tempmax = hoje.tempMax;

    // Alerta se a temperatura atual estiver abaixo da mínima prevista
    if (temperatura < tempmin) {
      alert("⚠️ A Temperatura Atual Está Abaixo Da Mínima Prevista Para Hoje!");
    }

    const { estado, paisNome } = await buscarEstadoEPais(lat, lon, pais);

    const airResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const airData = await airResponse.json();
    const aqi = airData.list[0].main.aqi;
    const qualidadeAr = interpretarAQI(aqi);

    const cidadeFormatada = formatarNomeCidade(cidade);
    const corTemperatura = getCorTemperatura(temperatura);
    const cortempmax = getCorTempMax(tempmax);
    const cortempmin = getCorTempMin(tempmin)
    otherinfo.addEventListener('click', function () {
      mostrarMapa(lat, lon, cidadeFormatada);
    })

    document.getElementById("resultado").innerHTML = `
            <p class="cidade"> 🌍 <strong>${cidadeFormatada} ${estado ? ", " + estado : ""} - ${paisNome}</strong></p> 
            <p class="temperatura" style="color: ${corTemperatura};"> 🌡️ <strong>${Math.round(temperatura)}°C</strong></p>
            <p class="sensacao">Sensação Térmica De: <span style="color: ${corTemperatura};">${Math.round(sensacao)}°C</span></p>
            <p class="ar">💨 Qualidade do Ar: <strong><span style="color: ${qualidadeAr.cor};">${qualidadeAr.descricao}</span></strong></p>
            <p class="minima">Min: <span style="color: ${cortempmin};">${Math.round(tempmin)}°C</span></p>
            <p class="maxima">Max: <span style="color: ${cortempmax};">${Math.round(tempmax)}°C</span></p>
        `;
    document.getElementById("resultado").style.display = "block";

    // result 1
    document.getElementById("resultado1").innerHTML = `
            <div class="ladolon">
                <p class="lon">📍 Longitude: ${lon}</p> 
                <p class="velovento">💨 Velocidade Do Vento: ${velocidadeKmh} Km/h</p> 
                <p class="nascersol">Nascer Do sol: ${sunriseTime}</p>
            </div>
            <div class="ladolat">
                <p class="lat">📍 Latitude: ${lat}</p> 
                <p class="direcaovento">🧭 Direção Do vento: ${direcaovento}°</p> 
                <p class="pordosol">Por Do sol: ${sunsetTime}</p>
            </div>
            <div class="pressaohumidade">
                <p class="pressao">Pressão Atmosférica: ${pressao} hPa</p>
                <p class="humidade">Humidade: ${humidade}%</p>
            </div>
        `;


    // result 2
    document.getElementById("resultado2").innerHTML = `
         <p class="cidade"> 🌍 <strong>${cidadeFormatada} ${estado ? ", " + estado : ""} - ${paisNome}</strong></p> 
            <p class="condicaotemp"> ${condicaoTraduzidaComEmoji}</p>
            <p class="descricao">Tempo: ${descricao1}</p>
            <p class="porcecloud"> ${porcecloud}% De Nuvens No Céu</p>
            <p class="visib"> Visibilidade: ${visibilidadeKm} Km</p>
        `;


    // result 3
    document.getElementById("resultado3").innerHTML = `
            <div class="dataehora">
                <p class="data"> 📅 ${date}</p>
                <p class="hora"> ⏰ ${time}</p>
            </div>
        `;
    document.getElementById("resultado3").style.display = "block";

    document.getElementById("fechar").style.display = "block";

    document.getElementById('otherinfo').style.display = 'block';

    const containerbuscas = document.querySelector('.containerbuscas');

    containerbuscas.style.display = 'none';

    const background = document.getElementById('background');
    const cidaderesu = document.querySelector('#resultado .cidade');
    const cidaderesu2 = document.querySelector('#resultado2 .cidade');
    const datadia = document.querySelector('#resultado3 .data');
    const hora = document.querySelector('#resultado3 .hora');


    if (resu1.style.display === 'block') {
      resu1.style.display = 'none';
      resu2.style.display = 'none';
      divMapa.style.display = 'none';
      fechar.style.top = '-35.5em';
    }


    if (["⛈️ Trovoadas", "🌦️ Garoa", "🌧️ Chuva"].includes(condicaoTraduzidaComEmoji)) {
      cidaderesu.style.background = 'linear-gradient(to right, blue, black, white)';
      cidaderesu2.style.background = 'linear-gradient(to right, blue, black, white)';
      datadia.style.background = 'linear-gradient(to right, blue, black, white)';
      hora.style.background = 'linear-gradient(to right, blue, black, white)';
      background.style.background = 'url(imagens/thunderstorm.jpg)';
      otherinfo.addEventListener("mouseover", () => {
        otherinfo.style.background = 'linear-gradient(to right, blue, black, white)';
      });

      otherinfo.addEventListener("mouseout", () => {
        otherinfo.style.background = '';
      });

      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = 'left 8%';
      resu.style.color = 'white';
      resu.style.textShadow = 'black 2px 3px 1px'
      resu1.style.background = 'url(imagens/thunderstorm.jpg)';
      resu1.style.backgroundSize = 'cover';
      resu1.style.backgroundPosition = 'center 38%';
      resu1.style.color = 'white';
      resu1.style.textShadow = 'black 2px 3px 1px'
      resu2.style.background = 'url(imagens/thunderstorm.jpg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
      resu2.style.color = 'white';
      resu2.style.textShadow = 'black 2px 2px 1px';

    }
    else if (["🌫️ Névoa", "🌫️ Neblina", "🌁 Nevoeiro", "☁️ Nuvens"].includes(condicaoTraduzidaComEmoji)) {
      cidaderesu.style.background = 'linear-gradient(to right, #721da8, #721da8, white)';
      cidaderesu2.style.background = 'linear-gradient(to right, #721da8, #721da8, white)';
      hora.style.background = 'linear-gradient(to right, #721da8, #721da8, white)';
      datadia.style.background = 'linear-gradient(to right, #721da8, #721da8, white)';
      otherinfo.addEventListener("mouseover", () => {
        otherinfo.style.background = 'linear-gradient(to right, #721da8, #721da8, white)';
      });

      otherinfo.addEventListener("mouseout", () => {
        otherinfo.style.background = '';
      });

      background.style.background = 'url(imagens/nevoa.jpg)';
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = 'left 8%';
      resu.style.color = 'white';
      resu.style.textShadow = 'black 2px 3px 1px';
      resu1.style.background = 'url(imagens/nevoa.jpg)';
      resu1.style.backgroundSize = 'cover';
      resu1.style.backgroundPosition = 'center 38%';
      resu1.style.color = 'white';
      resu1.style.textShadow = 'black 2px 3px 1px'
      resu2.style.background = 'url(imagens/nevoa.jpg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
      resu2.style.color = 'white';
      resu2.style.textShadow = 'black 2px 2px 1px';
    }
    else if (["🌪️ Poeira", "🏜️ Areia", "🌋 Cinzas", "🚬 Fumaça", '🌪️ Tornado'].includes(condicaoTraduzidaComEmoji)) {
      cidaderesu.style.background = 'linear-gradient(to right, orange, orange, white)';
      cidaderesu2.style.background = 'linear-gradient(to right, orange, orange, white)';
      data.style.background = 'linear-gradient(to right, orange, orange, white)';
      datadia.style.background = 'linear-gradient(to right, orange, orange, white)';
      otherinfo.addEventListener("mouseover", () => {
        otherinfo.style.background = 'linear-gradient(to right, orange, orange, white)';
      });

      otherinfo.addEventListener("mouseout", () => {
        otherinfo.style.background = '';
      });
      background.style.background = 'url(imagens/areia.jpeg)';
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = 'center 25%';
      resu1.style.background = 'url(imagens/areia.jpeg)';
      resu1.style.backgroundSize = 'cover';
      resu1.style.backgroundPosition = 'center 38%';
      resu2.style.background = 'url(imagens/areia.jpeg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
    }
    else if (["🌬️ Rajada"].includes(condicaoTraduzidaComEmoji)) {
      cidaderesu.style.background = 'linear-gradient(to right, #3f3843, white)';
      cidaderesu2.style.background = 'linear-gradient(to right, #3f3843, white)';
      datadia.style.background = 'linear-gradient(to right, #3f3843, white)';
      hora.style.background = 'linear-gradient(to right, #3f3843, white)';
      otherinfo.addEventListener("mouseover", () => {
        otherinfo.style.background = 'linear-gradient(to right, #3f3843, white)';
      });

      otherinfo.addEventListener("mouseout", () => {
        otherinfo.style.background = '';
      });
      background.style.background = 'url(imagens/tornado.jpg)';
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = 'left 8%';
      resu.style.color = 'white';
      resu.style.textShadow = 'black 2px 3px 1px';
      resu1.style.background = 'url(imagens/tornado.jpg)';
      resu1.style.backgroundSize = 'cover';
      resu1.style.backgroundPosition = 'center 38%';
      resu1.style.color = 'white';
      resu1.style.textShadow = 'black 2px 3px 1px'
      resu2.style.background = 'url(imagens/tornado.jpg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
      resu2.style.color = 'white';
      resu2.style.textShadow = 'black 2px 2px 1px';
    }
    else if (condicaoTraduzidaComEmoji === "❄️ Neve") {
      cidaderesu.style.background = 'linear-gradient(to right, #1596ff, white)';
      cidaderesu2.style.background = 'linear-gradient(to right, #1596ff, white)';
      datadia.style.background = 'linear-gradient(to right, #1596ff, white)';
      hora.style.background = 'linear-gradient(to right, #1596ff, white)';
      otherinfo.addEventListener("mouseover", () => {
        otherinfo.style.background = 'linear-gradient(to right, #1596ff, white)';
      });

      otherinfo.addEventListener("mouseout", () => {
        otherinfo.style.background = '';
      });
      background.style.background = 'url(imagens/neve.jpg)';
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = 'left 8%';
      resu.style.color = 'white';
      resu.style.textShadow = 'blue 2px 1px 1px'
      resu1.style.background = 'url(imagens/neve.jpg)';
      resu1.style.backgroundSize = 'cover';
      resu1.style.backgroundPosition = 'center 38%';
      resu1.style.color = 'white';
      resu1.style.textShadow = 'blue 2px 3px 1px'
      resu2.style.background = 'url(imagens/neve.jpg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
      resu2.style.color = 'white';
      resu2.style.textShadow = 'blue 2px 2px 1px';
    } else {
      background.style.background = 'url(imagens/ceusol.jpg)';
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = 'center 1%';
      resu1.style.background = 'url(imagens/ceusol.jpg)';
      resu1.style.backgroundSize = 'cover';
      resu1.style.backgroundPosition = 'center 20%';
      resu2.style.background = 'url(imagens/ceusol.jpg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
    }

    document.getElementById("previsaoDias2").style.display = "none";

    const paisinput = document.getElementById('pais');
    paisinput.style.top = '-11.45em'
    paisinput.style.left = '49em';

    const botoespreview = document.getElementById('botoespreview');

    botoespreview.style.display = 'none';

    let userId = localStorage.getItem("id");
    if (!userId) {
      userId = "user-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("id", userId);
    }

    await fetch("https://updatetempweather.onrender.com/save-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        cidade: cidadeFormatada,
        codigo_iso: paisNome,
        estado,
        temperatura: Math.round(temperatura) + "°C",
        data: date,
        hora: time,
      }),
    });

  } catch (error) {
    console.error("Erro ao buscar previsão:", error);
  }
  try {
    const response = await fetch('https://updatetempweather.onrender.com/inmet-alertas');
    const data = await response.json();
    console.log("🔍 Dados recebidos do INMET:", data);

    const alertas = [...data.hoje];
    const cidadeNormalizada = normalizarTexto(document.getElementById("cidade").value);

    const alertasFiltrados = alertas.filter(alerta =>
      normalizarTexto(alerta.municipios || "").includes(cidadeNormalizada)
    );

    const hrefAlertas = document.getElementById('hrefalertas');
    const alertasContainer = document.getElementById("alertasClimaticos");

    // Encontra o alerta mais severo possível com base nas regras
    const grandePerigo = alertasFiltrados.find(a => a.severidade === "Grande Perigo");
    const perigo = alertasFiltrados.find(a => a.severidade === "Perigo");
    const perigoPotencial = alertasFiltrados.find(a => a.severidade === "Perigo Potencial");

    const alertaMaisRelevante = grandePerigo || perigo || perigoPotencial;
    const inputValue = document.getElementById('cidade').value;

    if (alertaMaisRelevante) {
      const alerta = alertaMaisRelevante;
      const alertasHtml = `
          <div class="alerta-inmet">
            <h4 id='h4'> ${alerta.descricao}</h4>
            <p id='estadosalertas'>Estados: ${alerta.estados}</p>
            <p id='locais'> Local: ${inputValue}</p>
            <p id='severidadealerta'><strong>Severidade:</strong> ${alerta.severidade}</p>
            ${alerta.riscos?.length ? `<p><strong>Riscos:</strong> ${alerta.riscos.join(" ")}</p>` : ""}
          </div>
        `;

      alertasContainer.innerHTML = alertasHtml;
      alertasContainer.style.display = "none";
      hrefAlertas.style.display = 'block';

      const tituloalerta = document.querySelector('.alerta-inmet #severidadealerta')
      const h4 = document.getElementById('h4')

      if (tituloalerta && tituloalerta.textContent.includes('Grande Perigo')) {
        h4.style.color = 'orangered';
        hrefAlertas.style.background = 'orangered';
      } else if (tituloalerta && tituloalerta.textContent.includes('Perigo Potencial')) {
        h4.style.color = 'yellow';
        hrefAlertas.style.background = 'yellow';
      } else if (tituloalerta && tituloalerta.textContent.includes('Perigo')) {
        h4.style.color = 'orange';
        hrefAlertas.style.background = 'orange';
      }
    } else {
      alertasContainer.style.display = 'none';
      hrefAlertas.style.display = 'none';
      hrefAlertas.style.textShadow = 'white 1px 1px 1px';
    }
  } catch (err) {
    console.error("Erro ao buscar ou processar alertas do INMET (JSON):", err);
  }
}    
