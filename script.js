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

otherinfo.addEventListener('click', function(){
    const secaoAlertas = document.getElementById('alertasClimaticos');
const hrefAlertas = document.getElementById('hrefalertas');
const grafico = document.getElementById('graficoClima');

    if (resu.style.display === '') {
        fechar.style.transform = 'translateY(-39.4em)';
    background.style.display = 'none';
    resu.style.display = 'none';
    resu3.style.display = 'none';
    resu1.style.display = 'block';
    resu2.style.display = 'block';
    alertas.style.display = 'none';
    nextdias.style.display = 'none';
    mapact.style.display = 'block';
    document.querySelector('#previsaoDias h5').style.marginLeft = '-6.5em';
    otherinfo.textContent = 'Voltar';
    hrefAlertas.style.display = 'none';
    secaoAlertas.style.display = 'none';
    grafico.style.display = 'block'
    }
    else if (resu.style.display === 'none') {
        background.style.display = 'block';
        resu.style.display = 'block';
    resu3.style.display = 'block';
    resu1.style.display = 'none';
    resu2.style.display = 'none';
    alertas.style.display = 'block';
    nextdias.style.display = 'block';
    nextdias.style.marginLeft = '15em';
    mapact.style.display = 'none';
    divMapa.style.display = 'none';
    otherinfo.textContent = 'Mais Informações';
     hrefAlertas.style.display = 'block';
     secaoAlertas.style.display = 'none';
     grafico.style.display = 'none'
    } 
})

const botoespreview = document.getElementById('botoespreview');

function fecharBuscas() {
    const secaoAlertas = document.getElementById('alertasClimaticos');
const hrefAlertas = document.getElementById('hrefalertas');
    background.style.display = 'none'
    resu.style.display = 'none';
    resu1.style.display = 'none';
    resu2.style.display = 'none';
    resu3.style.display = 'none';
    divMapa.style.display = 'none';
    alertas.style.display = 'none';
    nextdias.style.display = 'none';
    otherinfo.style.display = 'none';
    botoespreview.style.display = 'block';
    paisinput.style.transform = 'translateY(-8.8em)';  
    fechar.style.display = 'none';
    carregarBuscas();
    containerbuscas.style.display = 'block';
    hrefAlertas.style.display = 'none';
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

function obterEstacao(data = new Date()) {
  const mes = data.getMonth() + 1;
  const dia = data.getDate();

  if ((mes === 12 && dia >= 21) || mes === 1 || mes === 2 || (mes === 3 && dia < 20)) {
    return "Verão";
  } else if ((mes === 3 && dia >= 20) || mes === 4 || mes === 5 || (mes === 6 && dia < 21)) {
    return "Outono";
  } else if ((mes === 6 && dia >= 21) || mes === 7 || mes === 8 || (mes === 9 && dia < 23)) {
    return "Inverno";
  } else {
    return "Primavera";
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

