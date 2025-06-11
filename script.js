const paisinput = document.getElementById('pais');
const inputbusca = document.getElementById('cidade');
const fechar = document.getElementById('fechar');
const divMapa = document.getElementById('mapa');
const dias = document.getElementById('dias');
const botaovoltar = document.getElementById('voltar');
const mapact = document.getElementById('mapaContainer');
const containerbuscas = document.querySelector('.containerbuscas');



inputbusca.addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        if (cidade) {
         buscarPrevisao(cidade);
        }
    }
})

const otherinfo = document.getElementById('otherinfo');
const resu = document.getElementById('resultado');
const resu3 = document.getElementById('resultado3');
 const resu1 = document.getElementById('resultado1');
const resu2 = document.getElementById('resultado2');
const alertas = document.getElementById('alertasClimaticos');
const nextdias = document.getElementById('previsaoDias');
const background = document.getElementById('background');
    const mapa2 = document.getElementById('map');
    const mapa2ct = document.querySelector('.map2ct')

otherinfo.addEventListener('click', function(){
    const secaoAlertas = document.getElementById('alertasClimaticos');
const grafico = document.getElementById('graficoClima');
const resuLua = document.getElementById('faseLua');
const resuEstacoes = document.getElementById('estacoes');
const noalert = document.getElementById('noalert');


    if (resu.style.display === '') {
    background.style.display = 'none';
    resu.style.display = 'none';
    resu3.style.display = '';
    resu1.style.display = '';
    resu2.style.display = '';
    alertas.style.display = 'none';
    nextdias.style.display = 'none';
    mapact.style.display = 'none';
    noalert.style.display = 'none'
    document.querySelector('#previsaoDias h5').style.marginLeft = '-6.5em';
    otherinfo.textContent = 'Voltar';
    secaoAlertas.style.display = 'none';
    grafico.style.display = ''
    resu3.style.transform = 'translateY(-53.8em)';
    fechar.style.transform = 'translateY(-17.1em)';
    resuLua.style.display = '';
    resuEstacoes.style.display = '';
    
    }
    else if (resu.style.display === 'none') {
      grafico.style.display = 'none'
    } 
})

const botoespreview = document.getElementById('botoespreview');

function fecharBuscas() {
    const secaoAlertas = document.getElementById('alertasClimaticos');
    background.style.display = 'none'
    resu.style.display = 'none';
    resu1.style.display = 'none';
    resu2.style.display = 'none';
    divMapa.style.display = 'none';
    alertas.style.display = 'none';
    nextdias.style.display = 'none';
    otherinfo.style.display = 'none';
    botoespreview.style.display = 'block';  
    fechar.style.display = 'none';
    carregarBuscas();
    containerbuscas.style.display = 'block';
    secaoAlertas.style.display = 'none';
}


const verpreview1 = document.getElementById('preview1');
const verpreview2 = document.getElementById('preview2');
const verpreview5 = document.getElementById('preview3');
const verpreview4 = document.getElementById('preview4');
const verpreview3 = document.getElementById('preview5');


const preview1 = document.getElementById('previsaoDias3');
const preview2 = document.getElementById('previsaoDias2');
const preview3 = document.getElementById('previsaoDias1');
const preview4 = document.getElementById('previsaoDias4');
const preview5 = document.getElementById('previsaoDias5');

verpreview1.addEventListener('click', function(){
    if (preview1.style.display === 'none') {
        preview1.style.display = 'block';
        verpreview1.style.background = '#00ff00';
        verpreview1.style.color = 'white';
    } else {
        preview1.style.display = 'none';
        verpreview1.style.color = '';
        verpreview1.style.background = '';

    }
})

verpreview2.addEventListener('click', function(){
    if (preview2.style.display === 'none') {
        preview2.style.display = 'block';
        verpreview2.style.background = '#00ff00';
        verpreview2.style.color = 'white';
    } else {
        preview2.style.display = 'none';
        verpreview2.style.background = '';
        verpreview2.style.color = '';
    }
})

verpreview3.addEventListener('click', function(){
    if (preview5.style.display === 'none') {
        preview5.style.display = 'block';
        verpreview3.style.background = '#00ff00';
        verpreview3.style.color = 'white';
    } else {
        preview5.style.display = 'none';
        verpreview3.style.background = '';
        verpreview3.style.color = '';
    }
})

verpreview4.addEventListener('click', function(){
    if (preview4.style.display === 'none') {
        preview4.style.display = 'block';
        verpreview4.style.background = '#00ff00';
        verpreview4.style.color = 'white';
    } else {
        preview4.style.display = 'none';
        verpreview4.style.background = '';
        verpreview4.style.color = '';
    }
})

verpreview5.addEventListener('click', function(){
    if (preview3.style.display === 'none') {
        preview3.style.display = 'block';
        verpreview5.style.background = '#00ff00';
        verpreview5.style.color = 'white';
    } else {
        preview3.style.display = 'none';
        verpreview5.style.background = '';
        verpreview5.style.color = '';
    }
})

function obterEstacao(data = new Date(), lat = 0) {
  const mes = data.getMonth();
  const dia = data.getDate();
  let estacao = "";

  if (lat >= 0) {
    // Hemisfério Norte
    if ((mes === 2 && dia >= 20) || mes === 3 || mes === 4 || (mes === 5 && dia < 21)) {
      estacao = "Primavera";
    } else if ((mes === 5 && dia >= 21) || mes === 6 || mes === 7 || (mes === 8 && dia < 23)) {
      estacao = "Verão";
    } else if ((mes === 8 && dia >= 23) || mes === 9 || mes === 10 || (mes === 11 && dia < 21)) {
      estacao = "Outono";
    } else {
      estacao = "Inverno";
    }
  } else {
    // Hemisfério Sul
    if ((mes === 8 && dia >= 23) || mes === 9 || mes === 10 || (mes === 11 && dia < 21)) {
      estacao = "Primavera";
    } else if ((mes === 11 && dia >= 21) || mes === 0 || mes === 1 || (mes === 2 && dia < 20)) {
      estacao = "Verão";
    } else if ((mes === 2 && dia >= 20) || mes === 3 || mes === 4 || (mes === 5 && dia < 21)) {
      estacao = "Outono";
    } else {
      estacao = "Inverno";
    }
  }

  return estacao;
}

const fasesLuaPT = {
  "New Moon": "Lua Nova",
  "Waxing Crescent": "Crescente",
  "First Quarter": "Quarto Crescente",
  "Waxing Gibbous": "Gibosa Crescente",
  "Full Moon": "Lua Cheia",
  "Waning Gibbous": "Gibosa Minguante",
  "Last Quarter": "Quarto Minguante",
  "Waning Crescent": "Minguante"
};

function obterImgEstacao(estacao) {
  if (estacao === 'Outono') {
    return 'imagens/outono.png'
  }
}

function obterImgLua(faseI) {
  if (faseI == 'Waxing Gibbous') {
     return 'imagens/gibosac.png'
  }
  else if (faseI == 'New Moon') {
    return 'imagens/nova.png'
 }
 else if (faseI == 'Waxing Crescent') {
  return 'imagens/crescente.png'
}
else if (faseI == 'First Quarter') {
  return 'imagens/quartoc.png'
}
else if (faseI == 'Full Moon') {
  return 'imagens/cheia.png'
}
else if (faseI == 'Waning Gibbous') {
  return 'imagens/gibosam.png'
}
else if (faseI == 'Last Quarter') {
  return 'imagens/4minguante.png'
}
else if (faseI == 'Waning Crescent') {
  return 'imagens/minguante.png'
}
}

document.addEventListener('DOMContentLoaded', function () {
  Highcharts.chart('graficoClima', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Condições Meteorológicas'
    },
    xAxis: {
      categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
    },
    yAxis: [{
      title: { text: 'Umidade / Temperatura (°C)' },
      opposite: false
    }, {
      title: { text: 'Pressão (hPa)' },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    series: [
      {
        name: 'Umidade',
        data: [75, 82, 60, 70, 80, 65, 78],
        yAxis: 0,
        color: '#00aaff'
      },
      {
        name: 'Temperatura (°C)',
        data: [28, 30, 27, 26, 29, 31, 30],
        yAxis: 0,
        color: '#ff3333'
      },
      {
        name: 'Pressão (hPa)',
        data: [1012, 1015, 1010, 1008, 1013, 1016, 1011],
        yAxis: 1,
        color: '#888888'
      },
      {
        name: 'Sensação Térmica (°C)',
        data: [30, 31, 29, 28, 32, 33, 31],
        yAxis: 0,
        color: '#ffaa00'
      }
    ]
  });
});

function mapaL() {
  if (mapa2.style.display == '') {
    mapa2.style.display = 'none';
    divMapa.style.display = '';
  }
}

function mapaT() {
  if (divMapa.style.display == '') {
   divMapa.style.display = 'none';
    mapa2.style.display = '';
  }
}

const btnmapat = document.getElementById('btnmapat');

btnmapat.addEventListener('click', function(){
  mapa2.style.marginTop = '-61em';
})

function corSeveridade(severidade) {
 if (severidade == 'Perigo Potencial') {
        return 'yellow';
      } else if ( severidade == 'Perigo') {
        return 'orange';
      } else if (severidade == 'Grande Perigo') {
        return 'red';
      }
    }

    const dataHoras = new Date();
      const hora0a23 = dataHoras.getHours(); //
      console.log(hora0a23);

      function periodoDiurno() {
        if (hora0a23 >= 1 && hora0a23 <= 11) {
            return 'Manhã';
        } else if (hora0a23 >= 12 && hora0a23 <= 19) {
            return 'Tarde';
        } else {
            return 'Noite';
        }
    }