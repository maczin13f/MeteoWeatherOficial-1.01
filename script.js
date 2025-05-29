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
         buscarPrevisao(cidade)
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

otherinfo.addEventListener('click', function(){
    if (resu.style.display === 'block') {
    resu.style.display = 'none';
    resu3.style.display = 'none';
    resu1.style.display = 'block';
    resu2.style.display = 'block';
    alertas.style.display = 'none';
    nextdias.style.display = 'none';
    otherinfo.style.bottom = '4.3em';
    fechar.style.top = '-39.35em';
    paisinput.style.top = '-11.45em';
    paisinput.style.left = '49em';
    mapact.style.display = 'block';
    document.querySelector('#previsaoDias h5').style.marginLeft = '-6.5em';
    otherinfo.textContent = 'Voltar';
    hrefAlertas.style.display = 'none';
    secaoAlertas.style.display = 'none';
    }
    else if (resu.style.display === 'none') {
        resu.style.display = 'block';
    resu3.style.display = 'block';
    resu1.style.display = 'none';
    resu2.style.display = 'none';
    alertas.style.display = 'block';
    nextdias.style.display = 'block';
    fechar.style.top = '-35.5em';
    nextdias.style.marginLeft = '15em';
    mapact.style.display = 'none';
    divMapa.style.display = 'none';
    otherinfo.textContent = 'Mais Informações';
     hrefAlertas.style.display = 'block';
     secaoAlertas.style.display = 'none'
    } 
})

const botoespreview = document.getElementById('botoespreview')

function fecharBuscas() {
    resu.style.display = 'none';;
    resu1.style.display = 'none';
    resu2.style.display = 'none';
    resu3.style.display = 'none';
    divMapa.style.display = 'none';
    alertas.style.display = 'none';
    nextdias.style.display = 'none';
    otherinfo.style.display = 'none';
    botoespreview.style.display = 'block';
    paisinput.style.top = '-8.86em';
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




