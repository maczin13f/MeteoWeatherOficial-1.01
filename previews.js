

async function previewRj() {

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-22.91&lon=-43.17&appid=${API_KEY}&units=metric&lang=pt`);
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

    document.getElementById("previsaoDias2").innerHTML = `
            <h5><span class="nextdias">Rio de Janeiro RJ</span></h5>
            <div class="dias">${diasHtml}</div>
        `;
    document.getElementById("previsaoDias2").style.display = "none";
}

async function previewSp() {

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-23.55&lon=-46.63&appid=${API_KEY}&units=metric&lang=pt`);
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

    document.getElementById("previsaoDias3").innerHTML = `
            <h5><span class="nextdias">São Paulo SP</span></h5>
            <div class="dias">${diasHtml}</div>
        `;
    document.getElementById("previsaoDias3").style.display = "none";
}

async function previewDf() {

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-15.78&lon=-47.93&appid=${API_KEY}&units=metric&lang=pt`);
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

    document.getElementById("previsaoDias1").innerHTML = `
            <h5><span class="nextdias">Brasília DF</span></h5>
            <div class="dias">${diasHtml}</div>
        `;
    document.getElementById("previsaoDias1").style.display = "none";
}

async function previewSba() {

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-12.97&lon=-38.50&appid=${API_KEY}&units=metric&lang=pt`);
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

    document.getElementById("previsaoDias4").innerHTML = `
            <h5><span class="nextdias">Salvador BA</span></h5>
            <div class="dias">${diasHtml}</div>
        `;
    document.getElementById("previsaoDias4").style.display = "none";
}

async function previewFt() {

    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-3.72&lon=-38.52&appid=${API_KEY}&units=metric&lang=pt`);
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

    document.getElementById("previsaoDias5").innerHTML = `
            <h5><span class="nextdias">Fortaleza CE</span></h5>
            <div class="dias">${diasHtml}</div>
        `;
    document.getElementById("previsaoDias5").style.display = "none";
}

window.onload = previewRj();
window.onload = previewSp();
window.onload = previewDf();
window.onload = previewSba();
window.onload = previewFt();
window.onload = carregarBuscas;

