const API_KEY = "9fd2e6d05708adae2650cf7871a24abc";

async function buscarPrevisao() {
  const alertasContainer = document.getElementById("alertasClimaticos");

  const cidade = document.getElementById("cidade").value.trim();
  const pais = document.getElementById("pais").value;

  alertasContainer.style.display = 'none';

  fechar.style.display = 'none';


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

    // Extrair dados de previsão para gráfico
    const dadosGrafico = forecastData.list.slice(0, 10).map(item => ({
      hora: new Date(item.dt * 1000).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
      temperatura: item.main.temp,
      sensacao: item.main.feels_like,
      umidade: item.main.humidity,
      pressao: item.main.pressure
    }));

    // Criar gráfico com Highcharts
    Highcharts.chart('graficoClima', {
      chart: {
        type: 'line',
        backgroundColor: 'rgba(255,255,255,0.95)'
      },
      title: {
        text: '🌤️ Previsão Climática - Próximas Horas'
      },
      xAxis: {
        categories: dadosGrafico.map(d => d.hora),
        title: { text: 'Hora' }
      },
      yAxis: [{
        title: { text: 'Temperatura (°C) / Sensação (°C)' },
        labels: { format: '{value}°C' }
      }, {
        title: { text: 'Umidade (%)' },
        labels: { format: '{value}%' },
        opposite: true
      }, {
        title: { text: 'Pressão (hPa)' },
        labels: { format: '{value} hPa' },
        opposite: true
      }],
      series: [{
        name: 'Temperatura',
        data: dadosGrafico.map(d => d.temperatura),
        tooltip: { valueSuffix: ' °C' },
        color: '#FF5733',
        yAxis: 0
      }, {
        name: 'Sensação Térmica',
        data: dadosGrafico.map(d => d.sensacao),
        tooltip: { valueSuffix: ' °C' },
        dashStyle: 'ShortDash',
        color: '#FF8C00',
        yAxis: 0
      }, {
        name: 'Umidade',
        data: dadosGrafico.map(d => d.umidade),
        tooltip: { valueSuffix: ' %' },
        color: '#2980b9',
        yAxis: 1
      }, {
        name: 'Pressão',
        data: dadosGrafico.map(d => d.pressao),
        tooltip: { valueSuffix: ' hPa' },
        color: '#2ecc71',
        yAxis: 2
      }],
      credits: {
        enabled: false
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
      }
    });

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

    function horasDinamica() {
      const agora = new Date();
      const date = agora.toLocaleDateString("pt-BR");
      const time = agora.toLocaleTimeString("pt-BR");

      document.querySelector(".data").textContent = `📅 ${date}`;
      document.querySelector(".hora").textContent = `⏰ ${time}`;

      return { date, time };
    }

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
    const cortempmin = getCorTempMin(tempmin);
    const direcoesVento = obterDirecaoVento(direcaovento);
    mapact.style.display = '';
      mostrarMapa(lat, lon, cidadeFormatada);

    document.getElementById("resultado").innerHTML = `
            <p class="cidade"> 🌍 <strong>${cidadeFormatada} ${estado ? ", " + estado : ""} - ${paisNome}</strong></p> 
            <p class="temperatura" style="color: ${corTemperatura};"> 🌡️ <strong>${Math.round(temperatura)}°C</strong></p>
            <p class="sensacao">Sensação Térmica: <span style="color: ${corTemperatura};">${Math.round(sensacao)}°C</span></p>
            <p class="ar">💨 Qualidade do Ar: <strong><span style="color: ${qualidadeAr.cor};">${qualidadeAr.descricao}</span></strong></p>
            <p class="minima">Min: <span style="color: ${cortempmin};">${Math.round(tempmin)}°C</span></p>
            <p class="maxima">Max: <span style="color: ${cortempmax};">${Math.round(tempmax)}°C</span></p>
        `;
    document.getElementById("resultado").style.display = "";
    background.style.display = 'block';

    // result 1
    document.getElementById("resultado1").innerHTML = `
                <p class="lat">📍 Latitude: ${lat}</p> 
                <p class="lon">📍 Longitude: ${lon}</p> 
                <p class="velovento">💨 Velocidade Vento: ${velocidadeKmh} Km/h</p> 
                <p class="direcaovento">Direção Vento: ${direcaovento}°<strong id='setavento'> - ${direcoesVento}</strong></p> 
                <p class="pressao">Pressão Atmosférica: ${pressao} hPa</p>
                <p class="humidade">Humidade: ${humidade}%</p>
        `;

    document.getElementById("resultado1").style.display = "none";

    // Se já existe um mapa, remova-o antes de criar um novo
  if (map2) {
    map2.remove();
  }

  map2 = L.map('map').setView([lat, lon], 5); // Novo mapa

  mapa2.style.marginTop = '-33.5em';

  // Mapa base
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map2);

  // Camadas climáticas
  const tempLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
    opacity: 0.6
  });

  const windLayer = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
    opacity: 0.6
  });

  const cloudsLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
    opacity: 0.5
  });

  const humidityLayer = L.tileLayer(`https://tile.openweathermap.org/map/humidity_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
    opacity: 0.6
  });

  // Controle de camadas
  const overlayMaps = {
    "Temperatura": tempLayer,
    "Vento": windLayer,
    "Nuvens": cloudsLayer,
    "Humidade": humidityLayer
  };

  L.control.layers(null, overlayMaps).addTo(map2);

  // Camada padrão
  tempLayer.addTo(map2);

      const apiKey = "1aedeb4499f74007a9920729250904"; // Coloque sua chave WeatherAPI aqui

      const hoje1 = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
      const url = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${lat},${lon}&dt=${hoje1}`

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
          document.getElementById("faseLua").innerText = "Erro: " + data.error.message;
          return;
        }

        const faseI = data.astronomy.astro.moon_phase;
        const iluminacao = data.astronomy.astro.moon_illumination;
        const imgLuaV = obterImgLua(faseI);
        const periododia = periodoDiurno(time);

        // Tradução da fase da lua
        const fasePT = fasesLuaPT[faseI] || faseI;

        document.getElementById("faseLua").innerHTML = `
          <p> ${fasePT} (${iluminacao}% iluminada)</p>
          <p class='periodo'>${periododia}</p>
          <img src="${imgLuaV}">
            `
          
      } catch (e) {
        document.getElementById("faseLua").innerText = "Não foi possível carregar os dados.";
        console.error(e);
      }

    const direcaoventoseta = document.querySelector('.direcaovento').textContent;

    // result 2
    document.getElementById("resultado2").innerHTML = `
         <p class="cidade"> 🌍 <strong>${cidadeFormatada} ${estado ? ", " + estado : ""} - ${paisNome}</strong></p> 
            <p class="condicaotemp"> ${condicaoTraduzidaComEmoji}</p>
            <p class="descricao">Tempo: ${descricao1}</p>
            <p class="porcecloud"> ${porcecloud}% De Nuvens No Céu</p>
            <p class="visib"> Visibilidade: ${visibilidadeKm} Km</p>
        `;

    document.getElementById("resultado2").style.display = "none";

    const estacao = obterEstacao(new Date(), lat); // ✅
    const obterImgE = obterImgEstacao(estacao);
    
document.getElementById('estacoes').innerHTML = `
<p id='estacaoano'>${estacao}</p>
<img src='${obterImgE}'>
 <p class="nascersol">Nascer Do sol: ${sunriseTime}</p>
<p class="pordosol">Por Do sol: ${sunsetTime}</p>
`
    document.getElementById('estacaoano').textContent = estacao;

    // result 3
    document.getElementById("resultado3").innerHTML = `
                <p class="data"></p>
                <p class="hora"></p>
        `;

    horasDinamica();
    setInterval(horasDinamica, 1000);

    document.getElementById('otherinfo').style.display = 'block';

    const containerbuscas = document.querySelector('.containerbuscas');

    containerbuscas.style.display = 'none';

    const cidaderesu = document.querySelector('#resultado .cidade');
    const cidaderesu2 = document.querySelector('#resultado2 .cidade');
    const datadia = document.querySelector('#resultado3 .data');
    const hora = document.querySelector('#resultado3 .hora');

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
      resu2.style.background = 'url(imagens/neve.jpg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
      resu2.style.color = 'white';
      resu2.style.textShadow = 'blue 2px 2px 1px';
    } else {
      background.style.background = 'url(imagens/ceusol.jpg)';
      background.style.backgroundSize = "cover";
      background.style.backgroundPosition = 'center 1%';
      resu2.style.background = 'url(imagens/ceusol.jpg)';
      resu2.style.backgroundSize = 'cover';
      resu2.style.backgroundPosition = 'center';
    }

    document.getElementById("previsaoDias2").style.display = "none";

    const paisinput = document.getElementById('pais');
    paisinput.style.transform = 'translateY(-11.4em)'

    const botoespreview = document.getElementById('botoespreview');

    botoespreview.style.display = 'none';

    let userId = localStorage.getItem("id");
    if (!userId) {
      userId = "user-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("id", userId);
    }

    const { date, time } = horasDinamica();

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
  
  fechar.style.display = '';
  fechar.style.transform = 'translateY(-34.5em)';
  try {
    const response = await fetch('https://updatetempweather.onrender.com/inmet-alertas');
    const data = await response.json();
    console.log("🔍 Dados recebidos do INMET:", data);

    const alertas = [...data.hoje];
    const cidadeNormalizada = normalizarTexto(document.getElementById("cidade").value);

    const alertasFiltrados = alertas.filter(alerta =>
      normalizarTexto(alerta.municipios || "").includes(cidadeNormalizada)
    );



    // Encontra o alerta mais severo possível com base nas regras
    const grandePerigo = alertasFiltrados.find(a => a.severidade === "Grande Perigo");
    const perigo = alertasFiltrados.find(a => a.severidade === "Perigo");
    const perigoPotencial = alertasFiltrados.find(a => a.severidade === "Perigo Potencial");

    const alertaMaisRelevante = grandePerigo || perigo || perigoPotencial;
    if (alertaMaisRelevante) {
      const alerta = alertaMaisRelevante;
       const corSev = corSeveridade(alerta.severidade);

      const alertasHtml = `
          <div class="alerta-inmet">
            <h4 id='h4'> ${alerta.descricao}</h4>
            <p id='severidadealerta' style='color: ${corSev};'>${alerta.severidade}</p>
            <p id='riscos'>${alerta.riscos}</p>
            </div>
        `;

      alertasContainer.innerHTML = alertasHtml;
      alertasContainer.style.display = "";
      mapact.style.display = '';
        fechar.style.transform = 'translateY(-23.05em)';

    } else {
      alertasContainer.style.display = 'none';
        fechar.style.transform = 'translateY(-34.5em)';
    }

  } catch (err) {
    console.error("Erro ao buscar ou processar alertas do INMET (JSON):", err);
  }
}
