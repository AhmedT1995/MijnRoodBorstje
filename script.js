// Wacht tot de DOM volledig geladen is
document.addEventListener("DOMContentLoaded", function () {
    alert("Ik hou van jou Robin ❤️");
});

// Functie om de geheime code te controleren
function checkCode() {
    let code = document.getElementById("accessCode").value;

    if (code === "28/08/2024") {
        // Toegang verleend, verberg inlog en toon hoofdinhoud
        document.getElementById("login").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    } else {
        // Foutieve code, toon melding
        alert("Foutieve code! Probeer opnieuw.");
    }
}

// Functie om foto’s en video’s te tonen
function toonFotosVideos() {
    document.getElementById("content").innerHTML = `
        <h2>Foto’s en Video’s</h2>
        <p>Kies een categorie:</p>
        <button onclick="toonGebeurtenissen('Zomervakanties')">Zomervakanties</button>
        <button onclick="toonGebeurtenissen('Kerstvakanties')">Kerstvakanties</button>
        <button onclick="toonGebeurtenissen('Op reis')">Op reis</button>
        <button onclick="toonGebeurtenissen('Uitstappen')">Uitstappen</button>
        <button onclick="toonGebeurtenissen('Zomaar jij en ik')">Zomaar jij en ik</button>
        <div id="gebeurtenissen"></div>
    `;
}

// Functie om gebeurtenissen per categorie te tonen
function toonGebeurtenissen(categorie) {
    const gebeurtenissen = {
        "Zomervakanties": ["Zomer 2022", "Zomer 2023", "Zomer 2024"],
        "Kerstvakanties": ["Kerst 2022", "Kerst 2023", "Kerst 2024"],
        "Op reis": ["Weekend Parijs", "Italië Trip", "Spanje Avontuur"],
        "Uitstappen": ["Dierentuin", "Pretpark", "Stadsbezoek"],
        "Zomaar jij en ik": ["Romantische avond", "Samen koken", "Wandeling"]
    };

    let html = `<h3>${categorie}</h3>`;
    gebeurtenissen[categorie].forEach(event => {
        html += `<button onclick="toonFotos('${categorie}', '${event}')">${event}</button>`;
    });

    document.getElementById("gebeurtenissen").innerHTML = html;
}

// Functie om foto's van een specifieke gebeurtenis te tonen
function toonFotos(categorie, event) {
    let fotos = JSON.parse(localStorage.getItem(`${categorie}-${event}`)) || [];
    let html = `
        <h3>Foto's van ${event}</h3>
        <input type="file" id="fileUpload" multiple accept="image/*">
        <button onclick="uploadFotos('${categorie}', '${event}')">Upload Foto's</button>
        <div class="foto-container" id="fotoGalerij"></div>
    `;
    
    document.getElementById("gebeurtenissen").innerHTML = html;
    laadFotos(categorie, event);
}

// Functie om het dagboek te tonen
function toonDagboek() {
    document.getElementById("content").innerHTML = `
        <h2>Dagboek</h2>
        <textarea id="dagboekInput" rows="4" cols="50" placeholder="Schrijf hier je bericht..."></textarea><br>
        <button onclick="opslaanDagboek()">Opslaan</button>
        <div id="dagboekEntries"></div>
    `;
    laadDagboek();
}

// Functie om een bericht in het dagboek op te slaan
function opslaanDagboek() {
    let tekst = document.getElementById("dagboekInput").value;
    let datum = new Date().toLocaleString();

    if (tekst.trim() === "") {
        alert("Het bericht mag niet leeg zijn.");
        return;
    }

    let berichten = JSON.parse(localStorage.getItem("dagboek")) || [];
    berichten.push({ datum, tekst });
    localStorage.setItem("dagboek", JSON.stringify(berichten));
    laadDagboek();
}

// Functie om de opgeslagen foto's te laden
function laadFotos(categorie, event) {
    let fotos = JSON.parse(localStorage.getItem(`${categorie}-${event}`)) || [];
    let fotoGalerij = document.getElementById("fotoGalerij");

    fotoGalerij.innerHTML = fotos.map(foto => {
        return `<img src="${foto}" alt="Foto van ${event}" />`;
    }).join('');
}

// Functie om foto's te uploaden
function uploadFotos(categorie, event) {
    let fileInput = document.getElementById("fileUpload");
    let files = fileInput.files;

    if (files.length === 0) {
        alert("Kies een foto om te uploaden.");
        return;
    }

    let fotos = JSON.parse(localStorage.getItem(`${categorie}-${event}`)) || [];

    Array.from(files).forEach(file => {
        let reader = new FileReader();

        reader.onload = function (e) {
            fotos.push(e.target.result);
            localStorage.setItem(`${categorie}-${event}`, JSON.stringify(fotos));
            laadFotos(categorie, event);
        };

        reader.readAsDataURL(file);
    });
}

// Functie om het dagboek te laden
function laadDagboek() {
    let berichten = JSON.parse(localStorage.getItem("dagboek")) || [];
    let dagboekEntries = document.getElementById("dagboekEntries");

    dagboekEntries.innerHTML = berichten.map(entry => {
        return `<div><strong>${entry.datum}</strong><p>${entry.tekst}</p></div>`;
    }).join('');
}