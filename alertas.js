async function alertasClima(alertas) {
  const alertasContainer = document.getElementById("alertasClimaticos");
  alertasContainer.innerHTML = '';

  if (alertas.length) {
    const alertasHtml = alertas.map(alerta => `
      <div class="alerta-inmet">
        <h4 class='h4'>${alerta.descricao}</h4>
        <p class='estadosalertas'>Estados: ${alerta.estados}</p>
        <p class='severidadealerta' title=''>Severidade: <strong class='strongseveridade'>${alerta.severidade}</strong></p>
        <p class='descriscos'>${alerta.riscos}</p>
        <p class='inicio'>Início: ${new Date(alerta.inicio).toLocaleString('pt-BR')}</p>
        <p class='fim'>Fim: ${new Date(alerta.fim).toLocaleString('pt-BR')}</p>
        <h2 class='h2prev' style='display: none;'>Prevenções</h2>
        <h3 class='instrucoes'><span class='instrucoestxt'>Orientações</span></h3>
        <div class='prevencoes' style='display: none;'>
          <ul id='ulprev' style='display: none;'></ul>
          <h3 class='instrucoesvoltar' style='display: none;'><span class='instrucoestxt'>Voltar</span></h3>
        </div>
      </div>
    `).join("");

    alertasContainer.innerHTML = alertasHtml;
    console.log(alertas)
    alertasContainer.style.display = '';

    // Ajustar cores e títulos de severidade
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
        titleseveridade.setAttribute('title', 'Perigo : Alerta de risco Médio para a população e Evite deslocamentos desnecessários');
      }
    });

    // Cria instruções de prevenção
    document.querySelectorAll('.alerta-inmet').forEach(alertaEl => {
      const descriscos = alertaEl.querySelector('.descriscos');
      const ulprev = alertaEl.querySelector('#ulprev');
      const prevencoescaixa = alertaEl.querySelector('.prevencoes');
      const severidade = alertaEl.querySelector('.severidadealerta');
      const estadoalerta = alertaEl.querySelector('.estadosalertas');
      const h4 = alertaEl.querySelector('.h4');
      const severidadestrong = alertaEl.querySelector('.strongseveridade');
      const h2prev = alertaEl.querySelector('.h2prev');
      const h3 = alertaEl.querySelector('.instrucoes');
      const h3voltar = alertaEl.querySelector('.instrucoesvoltar');
      const severidadestrongtxt = severidadestrong.textContent;
      const descriscostxt = descriscos.textContent;
      const ulPrevLi = alertaEl.querySelector('#ulprev li')

      ulprev.innerHTML = '';

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

      if (h4.textContent == 'Chuvas Intensas' && severidadestrongtxt == 'Perigo Potencial') {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em caso de Chuvas Intensas (Perigo Potencial):</strong> Evite exposição a chuva e fique atento aos Alagamentos';
        ulprev.appendChild(li);
      }
      if (h4.textContent == 'Chuvas Intensas' && severidadestrongtxt == 'Perigo') {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em caso de Chuvas Intensas (Perigo):</strong> Evite qualquer deslocamento, caso esteja na rua procure um local seguro e fique atento a Alagamentos';
        ulprev.appendChild(li);
      }
       if (h4.textContent == 'Chuvas Intensas' && severidadestrongtxt == 'Grande Perigo') {
        const li = document.createElement('li');
        li.innerHTML = '<strong>Em caso de Chuvas Intensas (Grande Perigo):</strong> Não saia de sua Residência, caso esteja na rua procure um local seguro URGENTE, caso esteja em um veículo, procure um local alto e com cobertura';
        ulprev.appendChild(li);
      }
      if (h4.textContent == 'Tempestade' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Tempestade (Perigo Potencial):</strong> Evite atividades ao ar livre, fique atento a quedas de galhos e possíveis descargas elétricas.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Tempestade' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Tempestade (Perigo):</strong> Não permaneça em áreas abertas, evite o uso de aparelhos eletrônicos ligados na tomada e busque abrigo seguro.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Tempestade' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Tempestade (Grande Perigo):</strong> Permaneça em casa, desligue aparelhos eletrônicos, evite contato com água corrente e procure abrigo em local seguro imediatamente.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Geada' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Geada (Perigo Potencial):</strong> Proteja plantas sensíveis e fique atento às condições de cultivo e pastagem.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Geada' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Geada (Perigo):</strong> Redobre a proteção de plantações, proteja animais expostos ao frio e evite exposição prolongada ao ar livre.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Geada' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Geada (Grande Perigo):</strong> Fortes impactos à agricultura. Mantenha pessoas, animais e plantações protegidos. Risco elevado de prejuízos severos.';
  ulprev.appendChild(li);
}if (h4.textContent == 'Tempestade de Raios' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Tempestade de Raios (Perigo Potencial):</strong> Evite áreas abertas e uso de objetos metálicos durante a tempestade.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Tempestade de Raios' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Tempestade de Raios (Perigo):</strong> Fique em local fechado e não utilize aparelhos elétricos conectados à tomada.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Tempestade de Raios' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Tempestade de Raios (Grande Perigo):</strong> Proteja-se em local seguro imediatamente e evite contato com redes metálicas ou cabos expostos.';
  ulprev.appendChild(li);
}

// Granizo
if (h4.textContent == 'Granizo' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Granizo (Perigo Potencial):</strong> Proteja veículos e cubra plantas sensíveis.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Granizo' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Granizo (Perigo):</strong> Evite permanecer ao ar livre e procure abrigo seguro.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Granizo' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Granizo (Grande Perigo):</strong> Abrigue-se imediatamente e proteja janelas e vidros expostos.';
  ulprev.appendChild(li);
}

// Acumulado de Chuva
if (h4.textContent == 'Acumulado de Chuva' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Acumulado de Chuva (Perigo Potencial):</strong> Fique atento a locais com drenagem precária e possíveis alagamentos.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Acumulado de Chuva' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Acumulado de Chuva (Perigo):</strong> Evite transitar por ruas alagadas e áreas de risco de deslizamento.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Acumulado de Chuva' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Acumulado de Chuva (Grande Perigo):</strong> Procure abrigo seguro, evite saídas e siga orientações da Defesa Civil.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Frio Intenso' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Frio Intenso (Perigo Potencial):</strong> Use roupas adequadas e evite exposição prolongada ao ar livre.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Frio Intenso' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Frio Intenso (Perigo):</strong> Abrigue-se adequadamente, proteja idosos e crianças e evite ambientes sem aquecimento.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Frio Intenso' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Frio Intenso (Grande Perigo):</strong> Perigo à saúde. Permaneça abrigado e forneça suporte a pessoas em situação de rua.';
  ulprev.appendChild(li);
}

// Declínio de Temperatura
if (h4.textContent == 'Declínio de Temperatura' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Declínio de Temperatura (Perigo Potencial):</strong> Vista-se com roupas quentes e esteja atento a mudanças bruscas no tempo.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Declínio de Temperatura' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Declínio de Temperatura (Perigo):</strong> Proteja-se do frio intenso e evite exposição em horários noturnos.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Declínio de Temperatura' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Declínio de Temperatura (Grande Perigo):</strong> Risco elevado de hipotermia. Busque abrigo aquecido e proteja animais e pessoas vulneráveis.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Vendaval' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Vendaval (Perigo Potencial):</strong> Retire objetos soltos de áreas externas e evite se abrigar debaixo de árvores.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Vendaval' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Vendaval (Perigo):</strong> Fique em local seguro, evite trânsito em áreas arborizadas e mantenha distância de janelas.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Vendaval' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Vendaval (Grande Perigo):</strong> Altíssimo risco de quedas de estruturas. Abrigue-se imediatamente e siga recomendações das autoridades.';
  ulprev.appendChild(li);
}

// Ventos Costeiros
if (h4.textContent == 'Ventos Costeiros' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Ventos Costeiros (Perigo Potencial):</strong> Evite esportes náuticos e embarcações leves.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Ventos Costeiros' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Ventos Costeiros (Perigo):</strong> Suspensão de atividades marítimas. Evite áreas costeiras e siga recomendações da Marinha.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Ventos Costeiros' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Ventos Costeiros (Grande Perigo):</strong> Perigo extremo em áreas costeiras. Interrupção total de atividades marítimas. Evacuação pode ser necessária.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Onda de Calor' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Onda de Calor (Perigo Potencial):</strong> Hidrate-se com frequência e evite atividades físicas em horários quentes.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Onda de Calor' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Onda de Calor (Perigo):</strong> Permaneça em locais frescos e redobre a hidratação, principalmente para crianças e idosos.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Onda de Calor' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Onda de Calor (Grande Perigo):</strong> Risco grave à saúde. Evite exposição solar direta, use roupas leves e aumente a ingestão de líquidos.';
  ulprev.appendChild(li);
}

// Baixa Umidade
if (h4.textContent == 'Baixa Umidade' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Baixa Umidade (Perigo Potencial):</strong> Beba bastante água e umidifique ambientes.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Baixa Umidade' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Baixa Umidade (Perigo):</strong> Evite exercícios ao ar livre e aumente a hidratação. Risco de ressecamento da pele e mucosas.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Baixa Umidade' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Baixa Umidade (Grande Perigo):</strong> Situação crítica. Mantenha-se em ambientes úmidos e evite qualquer exposição ao sol.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Neblina' || h4.textContent == 'Nevoeiro') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Em caso de Neblina/Nevoeiro:</strong> Reduza a velocidade ao dirigir, mantenha faróis baixos acesos e evite ultrapassagens.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Mar Grosso' && severidadestrongtxt == 'Perigo Potencial') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Mar Grosso (Perigo Potencial):</strong> Evite banhos de mar e atividades náuticas leves.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Mar Grosso' && severidadestrongtxt == 'Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Mar Grosso (Perigo):</strong> Risco de afogamentos. Suspensão de embarcações pequenas e pesca artesanal.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Mar Grosso' && severidadestrongtxt == 'Grande Perigo') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Mar Grosso (Grande Perigo):</strong> Perigo extremo no mar. Proibição de navegação e evacuação de áreas de risco podem ser necessárias.';
  ulprev.appendChild(li);
}
if (h4.textContent == 'Risco de Incêndio Florestal') {
  const li = document.createElement('li');
  li.innerHTML = '<strong>Risco de Incêndio Florestal:</strong> Não queime lixo, evite fogueiras e denuncie qualquer foco de incêndio.';
  ulprev.appendChild(li);
}

      h3.addEventListener('click', () => {
        if (estadoalerta.style.display !== 'none') {
          h4.style.display = 'none';
          estadoalerta.style.display = 'none';
          severidade.style.display = 'none';
          descriscos.style.display = 'none';
          h3.style.display = 'none';
          h2prev.style.display = 'block';
          prevencoescaixa.style.display = 'block';
          ulprev.style.display = 'block';
          h3voltar.style.display = 'block';
          h2prev.scrollIntoView({ behavior: 'smooth' });
        }
      });
      h3voltar.addEventListener('click', () => {
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
        }
      });
    });
  }
}

window.onload = async () => {
  const response = await fetch('https://updatetempweather.onrender.com/inmet-alertas');
  const data = await response.json();

  const hoje = document.getElementById('hoje');
  const futuro = document.getElementById('futuro');
  const todos = document.getElementById('todos');

  // Mostrar todos inicialmente
  alertasClima([...data.hoje]);
  hoje.checked = true;

  hoje.addEventListener('change', () => {
    alertasClima(data.hoje);
  });
  futuro.addEventListener('change', () => {
    alertasClima(data.futuro);
  });
  todos.addEventListener('change', () => {
    alertasClima([...data.hoje, ...data.futuro]);
  });
};
