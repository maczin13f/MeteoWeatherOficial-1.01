async function alertasClima() {
  const response = await fetch('https://updatetempweather.onrender.com/inmet-alertas');
  const data = await response.json();
  console.log("🔍 Dados recebidos do INMET:", data);

  const alertasContainer = document.getElementById("alertasClimaticos");
  const alertas = [...data.hoje, ...data.futuro];

  if (alertas.length) {
    const alertasHtml = alertas.map(alerta => `
      <div class="alerta-inmet">
        <h4 class='h4'>${alerta.descricao}</h4>
        <p class='estadosalertas' style='display: block';>Estados: ${alerta.estados}</p>
        <p class='severidadealerta' title=''>Severidade:<strong class='strongseveridade'>${alerta.severidade}</strong></p>
        <p class='descriscos'>${alerta.riscos}</p>
        <p class= 'inicio'>Início Do Alerta: ${new Date(alerta.inicio).toLocaleString('pt-BR')}</p>
        <p class= 'inicio'>Provável Fim Do Alerta: ${new Date(alerta.fim).toLocaleString('pt-BR')}</p>
        <h2 class='h2prev' style='display: none';>Prevenções</h2>
        <h3 class='instrucoes'><span class='instrucoestxt'>Orientações</span></h3>
        <div class='prevencoes' style='display: none';>
        <ul id='ulprev' style='display: none';>
        </ul>
        <h3 class='instrucoesvoltar' style= 'display: none'><span class='instrucoestxt'>Voltar</span></h3>
        </div>
      </div>
    `).join("");

    alertasContainer.innerHTML = alertasHtml;
    alertasContainer.style.display = "";

    // Ajustar cor de cada alerta individualmente
    document.querySelectorAll('.alerta-inmet').forEach(alertaEl => {
      const tituloalerta = alertaEl.querySelector('.severidadealerta');
      const severidade = alertaEl.querySelector('.strongseveridade');
      const titleseveridade = alertaEl.querySelector('.severidadealerta');


      if (tituloalerta && tituloalerta.textContent.includes('Grande Perigo')) {
        severidade.style.color = 'red';
        titleseveridade.setAttribute('title', 'Grande Perigo : Alerta muito severo, risco alto de danos e acidentes graves');
      } else if (tituloalerta && tituloalerta.textContent.includes('Perigo Potencial')) {
        severidade.style.color = '#efdb27';
        titleseveridade.setAttribute('title', 'Perigo Potencial : Alerta de baixo risco para a população');
      } else if (tituloalerta && tituloalerta.textContent.includes('Perigo')) {
        severidade.style.color = 'orange';
        titleseveridade.setAttribute('title', 'Perigo : Alerta de risco Médio para a população e Evite deslocamentos Desnecessarios');
      }
    });

    document.querySelectorAll('.alerta-inmet').forEach(alertaEl => {
      const descriscos = alertaEl.querySelector('.descriscos');
      const ulprev = alertaEl.querySelector('#ulprev');


      // Pega o texto do <p class='descriscos'>
      const descriscostxt = descriscos.textContent;
      const prevencoescaixa = alertaEl.querySelector('.prevencoes');
      const severidade = alertaEl.querySelector('.severidadealerta');
      const estadoalerta = alertaEl.querySelector('.estadosalertas');
      const h4 = alertaEl.querySelector('.h4');
      const btnfixar = alertaEl.querySelector('.fixaralerta')

      // Limpa o ulprev
      ulprev.innerHTML = '';

      // 2️⃣ Verifica as palavras e cria <li> se necessário
      if (descriscostxt.includes('alagamentos')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Alagamentos:</strong> Evite contato com águas de alagamentos.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Riscos de doenças por contato com águas contaminadas (Leptospirose, Hepatite A, infecções gastrointestinais).';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Evite transitar em ruas alagadas e busque abrigo em locais seguros.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('ventos')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Rajadas de Vento:</strong> Não se abrigue debaixo de árvores, evite ficar perto de fiações elétricas.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Evite usar aparelhos eletrônicos ligados à tomada.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Não estacione veículos próximos a torres de transmissão e placas de propaganda.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('frio') || descriscostxt.includes('geada')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Frio Intenso:</strong> Use roupas quentes e evite exposição prolongada ao frio.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Mantenha ambientes internos aquecidos e proteja-se do vento gelado.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Em caso de frio extremo, procure locais de abrigo e assistência.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('calor') || descriscostxt.includes('onda de calor')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Calor Intenso:</strong> Beba bastante água e evite exposição ao sol das 10h às 16h.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Use roupas leves e claras e busque locais frescos e ventilados.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Redobre os cuidados com crianças e idosos.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('granizo')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Queda de Granizo:</strong> Abrigue veículos em locais seguros para evitar danos.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Afaste-se de janelas e áreas de risco de vidro quebrado.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Proteja plantas e estruturas frágeis durante a queda de granizo.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('umidade baixa')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Baixa Umidade:</strong> Beba bastante água e mantenha a hidratação constante.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Use umidificadores ou toalhas úmidas para melhorar o ambiente.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Evite exercícios físicos ao ar livre em horários mais secos.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('nevoeiro')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Nevoeiro:</strong> Reduza a velocidade e use faróis baixos ao dirigir.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Mantenha distância segura de outros veículos.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Evite dirigir em áreas de neblina densa, se possível.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('ressaca') || descriscostxt.includes('mar agitado')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Ressaca ou Mar Agitado:</strong> Evite banho de mar e atividades náuticas.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Fique longe de costões e áreas de arrebentação.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Embarcações devem adiar saídas em mar aberto.';
        ulprev.appendChild(li2);
      }

      if (descriscostxt.includes('plantações') || descriscostxt.includes('geada') || descriscostxt.includes('frio')) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em Caso de Frio que Afeta Plantações:</strong> Proteja suas plantações com mantas térmicas ou plásticos agrícolas.';
        ulprev.appendChild(li);

        const li1 = document.createElement('li');
        li1.textContent = 'Monitore a previsão do tempo para adaptar o manejo agrícola.';
        ulprev.appendChild(li1);

        const li2 = document.createElement('li');
        li2.textContent = 'Considere irrigar o solo antes da madrugada para reduzir efeitos do frio intenso.';
        ulprev.appendChild(li2);
      }

      const h2prev = alertaEl.querySelector('.h2prev');
      const h3 = alertaEl.querySelector('.instrucoes');
      const h3voltar = alertaEl.querySelector('.instrucoesvoltar');

      h3.addEventListener('click', function () {
        if (estadoalerta.style.display === 'block') {
          h4.style.display = 'none';
          estadoalerta.style.display = 'none';
          severidade.style.display = 'none';
          descriscos.style.display = 'none';
          h3.style.display = 'none';
          h2prev.style.display = 'block';
          prevencoescaixa.style.display = 'block';
          ulprev.style.display = 'block';
          h3voltar.style.display = 'block';
          ulprev.scrollIntoView({ behavior: 'smooth', block: 'center' });
          };
        
        h3voltar.addEventListener('click', function() {
          if (estadoalerta.style.display === 'none') {
          h4.style.display = 'block';
          estadoalerta.style.display = 'block';
          severidade.style.display = 'block';
          descriscos.style.display = 'block';
          h3.style.display = 'block';
          h2prev.style.display = 'none';
          prevencoescaixa.style.display = 'none';
          ulprev.style.display = 'none';
          h3voltar.style.display = 'none';
        };
      })
})
  })
  }}
window.onload = alertasClima;







