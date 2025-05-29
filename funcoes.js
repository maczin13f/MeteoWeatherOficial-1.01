function agruparPrevisaoPorDia(listaPrevisoes) {
  const previsoesPorDia = {};

  listaPrevisoes.forEach(item => {
    const dataHora = item.dt_txt;
    const dataObjUTC = new Date(dataHora);
    const hojeLocal = new Date();
    const dataHoje = new Date(hojeLocal.getFullYear(), hojeLocal.getMonth(), hojeLocal.getDate());
    const dataLocal = new Date(
      dataObjUTC.getUTCFullYear(),
      dataObjUTC.getUTCMonth(),
      dataObjUTC.getUTCDate()
    );
    if (dataLocal.getTime() === dataHoje.getTime()) return;

    const data = dataObjUTC.toISOString().split("T")[0];

    if (!previsoesPorDia[data]) {
      previsoesPorDia[data] = {
        tempsMin: [],
        tempsMax: [],
        icone: item.weather[0].icon,
        descricao: item.weather[0].description,
        diaSemana: formatarDiaSemana(data)
      };
    }

    previsoesPorDia[data].tempsMin.push(item.main.temp_min);
    previsoesPorDia[data].tempsMax.push(item.main.temp_max);
  });

  return Object.entries(previsoesPorDia).map(([data, info]) => ({
    tempMin: Math.min(...info.tempsMin).toFixed(2),
    tempMax: Math.max(...info.tempsMax).toFixed(2),
    icone: info.icone,
    descricao: info.descricao,
    diaSemana: info.diaSemana
  })).slice(0, 5);
}

function formatarDiaSemana(data) {
  const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
  const d = new Date(data);
  return dias[d.getDay()];
}

document.addEventListener("DOMContentLoaded", () => {
  const paisInput = document.getElementById("pais");
  const cidadeInput = document.getElementById("cidade");
  if (paisInput && cidadeInput) {
    paisInput.addEventListener("change", function () {
      const selected = capitaisPorPais[this.value];
      if (selected) cidadeInput.value = selected;
    });
  }

  const btnApagar = document.getElementById("btn-apagar-tudo");
  if (btnApagar) {
    btnApagar.addEventListener("click", apagarHistorico);
  }
});

async function buscarEstadoEPais(lat, lon, paisCodigo) {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
    const data = await response.json();

    if (data.length > 0) {
      const estado = data[0].state || "";
      const paisNome = data[0].country || paisCodigo;
      return { estado, paisNome };
    } else {
      return { estado: "", paisNome: paisCodigo };
    }
  } catch (error) {
    console.error("Erro ao buscar estado e país:", error);
    return { estado: "", paisNome: paisCodigo };
  }
}

function formatarNomeCidade(cidade) {
  if (!cidade || typeof cidade !== 'string') return "Cidade Desconhecida";
  return cidade.toLowerCase()
    .split(" ")
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}


function interpretarAQI(aqi) {
  const niveis = {
    1: { descricao: "Boa", cor: "#40ff00" },
    2: { descricao: "Razoável", cor: "#ffde33" },
    3: { descricao: "Moderada", cor: "#ff9933" },
    4: { descricao: "Ruim", cor: "#cc0033" },
    5: { descricao: "Péssima", cor: "#660099" }
  };
  return niveis[aqi] || { descricao: "Desconhecido", cor: "#999" };
}

function getCorTemperatura(temp) {
  if (temp <= 0) {
    return 'aqua'
  } 
  else if (temp <= 5) {
    return 'royalblue'
  }
  else if (temp <= 10) {
    return 'green'
  }
  else if (temp <= 15) {
    return '#39e09d'
  }
  else if (temp <= 20) {
    return 'yellow'
  }
  else if (temp <= 25) {
    return 'orange'
  }
  else if (temp <= 30) {
    return '#ff6f00'
  } else {
    return '#ff6f00'
  }
}


function getCorTempMin(tempmin) {
  if (tempmin <= 0) {
    return 'aqua'
  } 
  else if (tempmin <= 5) {
    return 'royalblue'
  }
  else if (tempmin <= 10) {
    return 'green'
  }
  else if (tempmin <= 15) {
    return '#39e09d'
  }
  else if (tempmin <= 20) {
    return 'yellow'
  }
  else if (tempmin <= 25) {
    return 'orange'
  }
  else if (tempmin <= 30) {
    return '#ff6f00'
  } else {
    return '#ff6f00'
  }
}

function getCorTempMax(tempmax) {
  if (tempmax <= 0) {
    return 'aqua'
  } 
  else if (tempmax <= 5) {
    return 'royalblue'
  }
  else if (tempmax <= 10) {
    return 'green'
  }
  else if (tempmax <= 15) {
    return '#39e09d'
  }
  else if (tempmax <= 20) {
    return 'yellow'
  }
  else if (tempmax <= 25) {
    return 'orange'
  }
  else if (tempmax <= 30) {
    return '#ff6f00'
  } else {
    return '#ff6f00'
  }
}

function mostrarMapa(lat, lon, cidade) {
  const divMapa = document.getElementById("mapa");
  divMapa.style.display = "block";

  if (mapa) {
    mapa.setView([lat, lon], 10);
    if (marcador) {
      marcador.setLatLng([lat, lon]).setPopupContent(`📍 ${cidade}`).openPopup();
    } else {
      marcador = L.marker([lat, lon]).addTo(mapa).bindPopup(`📍 ${cidade}`).openPopup();
    }
    setTimeout(() => mapa.invalidateSize(), 100);
    return;
  }

  mapa = L.map('mapa').setView([lat, lon], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(mapa);

  marcador = L.marker([lat, lon]).addTo(mapa).bindPopup(`📍 ${cidade}`).openPopup();
  setTimeout(() => mapa.invalidateSize(), 200);
}

async function carregarBuscas() {
  try {
    const res = await fetch("https://updatetempweather.onrender.com/buscas");
    const dados = await res.json();

    const visitorId = localStorage.getItem("id");
    const minhasBuscas = dados.filter(busca => busca.user_id === visitorId);

    let html = "";
    minhasBuscas.forEach(busca => {
      const agora = new Date();
      const date = agora.toLocaleDateString("pt-BR");
      const horaFormatada = new Date(`1970-01-01T${busca.hora}`).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      html += `
        <div class="buscas" data-id="${busca._id}">
          <p class='cidadehis'>${busca.cidade}</p>
          <p class='estado'>${busca.estado}</p>
          <p class='codigoiso'>${busca.codigo_iso}</p>
          <p class='temperaturahis'>${busca.temperatura}</p>
          <p class='datahis'>${date}</p>
          <p class='horahis'>${horaFormatada}</p>
          <button class="btn-apagar-busca">❌ Apagar</button>
        </div>
      `;
    });

    const buscasContainer = document.getElementById("buscas");
    buscasContainer.innerHTML = html;

    document.querySelectorAll(".btn-apagar-busca").forEach(button => {
      button.addEventListener("click", async function () {
        const item = this.closest(".buscas");
        const id = item.getAttribute("data-id");

        const confirmado = confirm("Deseja apagar esta busca?");
        if (!confirmado) return;

        try {
          const res = await fetch(`https://updatetempweather.onrender.com/apagar-busca/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            item.remove();
            alert("Busca apagada com sucesso!");
          } else {
            alert("Erro ao apagar busca.");
          }
        } catch (error) {
          console.error("Erro ao apagar busca:", error);
          alert("Erro ao apagar busca.");
        }
      });
    });

  } catch (error) {
    console.error("Erro ao carregar buscas:", error);
  }
}

async function apagarHistorico() {
  const userId = localStorage.getItem("id");
  if (!userId) return;

  const confirmado = confirm("Tem certeza que deseja apagar todo o histórico?");
  if (!confirmado) return;

  try {
    const res = await fetch(`https://updatetempweather.onrender.com/apagar-buscas/${userId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Histórico apagado com sucesso!");
      document.getElementById("buscas").innerHTML = "";
    } else {
      alert("Erro ao apagar histórico.");
    }
  } catch (error) {
    console.error("Erro ao apagar histórico:", error);
    alert("Erro ao apagar histórico.");
  }
}

async function apagarHistoricoAll() {
  const userId = localStorage.getItem("id");
  if (!userId) return;

  const confirmado = confirm("Tem certeza que deseja apagar todo o histórico?");
  if (!confirmado) return;

  try {
    const res = await fetch(`https://updatetempweather.onrender.com/apagar-buscas/${userId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Histórico apagado com sucesso!");
      document.getElementById("buscas").innerHTML = ""; // limpa visualmente
    } else {
      alert("Erro ao apagar histórico.");
    }
  } catch (error) {
    console.error("Erro ao apagar histórico:", error);
    alert("Erro ao apagar histórico.");
  }
}

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const secaoAlertas = document.getElementById('alertasClimaticos');
const hrefAlertas = document.getElementById('hrefalertas');

hrefAlertas.addEventListener("click", () => {
  hrefAlertas.style.display = 'none';
  secaoAlertas.style.display = 'block';
 
});

secaoAlertas.addEventListener("click", () => {
  secaoAlertas.style.display = 'none';
  hrefAlertas.style.display = 'block';
});


