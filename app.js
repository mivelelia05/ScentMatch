let allPerfumes = [];

async function loadPerfumes() {
    const response = await fetch("perfumes.json");
    allPerfumes = await response.json();
}

function getImageSrc(p) {
    return p.image || "images/placeholder.png";
}

function renderResults(matches) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!matches || matches.length === 0) {
        resultsDiv.innerHTML = "<p>No perfumes found.</p>";
        return;
    }

    matches.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.onclick = () => {
            const url = `perfume.html?name=${encodeURIComponent(p.name)}`;
            window.location.href = url;
        };

        const brandHtml = p.brand ? `<div class="brand">${p.brand}</div>` : "";

        card.innerHTML = `
            <img src="${getImageSrc(p)}" alt="${p.name}">
            <h2>${p.name}</h2>
            ${brandHtml}
            <div class="meta"><strong>Family:</strong> ${p.family || "N/A"}</div>
            <div class="meta"><strong>Notes:</strong> ${(p.notes || []).join(", ")}</div>
        `;

        resultsDiv.appendChild(card);
    });
}

async function searchPerfume() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    if (allPerfumes.length === 0) {
        await loadPerfumes();
    }

    const matches = allPerfumes.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.notes && p.notes.some(n => n.toLowerCase().includes(query)))
    );

    renderResults(matches);
}

window.addEventListener("DOMContentLoaded", async () => {
    await loadPerfumes();
});
