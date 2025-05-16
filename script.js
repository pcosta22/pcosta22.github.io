const allItems = [
  "Pirotecnia", "Mudança de nota", "Máquina de vento", "BDSM KINKY OOOOH", "Máquina de fumo", "Adereço gigante questionável", "free feet pics (artista descalç)",
  "glitter glitter glitter", "Letra política", "Dueto", "Instrumento estranho", "Voice crack", "Nota extra longa", "Canção bilíngue",
  "Balada dramática desnecessária", "Língua nativa", "Fato de animal", "Asas", "Coreografia intensa", "Artista a chorar", "PIANO", "Fenómeno meteorológico",
  "Câmara aérea", "Luzes epilépticas", "Roupa prateada/dourada", "Apresentador(es) awkward", "Ovação em pé", "Filtro na câmara (PB, sépia...)", "Hino à paz",
  "Referência à guerra", "Free Palestine 🇵🇸", "Solo guitarra", "Mudança de estilo inesperada", "#free the nipple", "Banda ao vivo", "Verka Serduchka",
  "UK ou DE em último", "isto é meio gay...", "Erro técnico", "Portugal nos últimos 5", "FUCK ISRAEL", "START VOTING NOW", "Falha de som", "Douze points",
  "CHA CHA CHA", "Saxofone/Violino", "Artista canta deitad", "Artista levantad por dançarinos", "Dança tradicional", "Anos 70/80", "Artista muda de roupa",
  "Artista suspenso/voa", "Performance minimalista", "Vestido volumoso", "LOVE LOVE PEACE PEACE", "Flashback", "Thank you, Merci, Gracias, Obrigado",
  "Chapéu", "Yodel", "BEIJO!", "Apresentador muda de roupa", "Momento je ne parle pas", "Good morning Australia",
];

const app = document.getElementById('app');
const bingoList = document.getElementById('bingo-list');
const resetBtn = document.getElementById('reset');
const themeBtn = document.getElementById('toggle-theme');
const overlayDrink = document.getElementById('overlay-drink');
const overlayBingo = document.getElementById('overlay-bingo');
const overlayAlmost = document.getElementById('overlay-almost');

let bingoItems = [];
let bingoState = {};

function getRandomItems(array, count) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}

function createCheckboxElement(item) {
  const container = document.createElement("div");
  container.className = "checkbox-container";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = bingoState[item] || false;

  checkbox.onchange = () => handleCheckboxChange(item, checkbox);

  const label = document.createElement("label");
  label.textContent = item;

  container.appendChild(checkbox);
  container.appendChild(label);

  return container;
}

function handleCheckboxChange(item, checkbox) {
  bingoState[item] = checkbox.checked;
  localStorage.setItem("bingo-state", JSON.stringify(bingoState));

  if (checkbox.checked) {
    showOverlay(overlayDrink, 1500);
  }

  const checkedCount = bingoItems.filter(i => bingoState[i]).length;

  if (checkedCount === bingoItems.length) {
    showOverlay(overlayBingo);
  } else if (checkedCount === bingoItems.length - 1) {
    showOverlay(overlayAlmost);
  }
}

function renderBingo() {
  bingoList.innerHTML = "";
  bingoItems.forEach(item => {
    const checkboxEl = createCheckboxElement(item);
    bingoList.appendChild(checkboxEl);
  });
}


function showOverlay(overlay, duration = null) {
  overlay.classList.remove("hidden");
  if (duration) {
    setTimeout(() => overlay.classList.add("hidden"), duration);
  }
}

function closeOverlays() {
  [overlayBingo, overlayAlmost].forEach(o => o.classList.add("hidden"));
}

function initGame() {
  const storedItems = localStorage.getItem("bingo-items");
  const storedState = localStorage.getItem("bingo-state");

  if (storedItems && storedState) {
    bingoItems = JSON.parse(storedItems);
    bingoState = JSON.parse(storedState);
  } else {
    bingoItems = getRandomItems(allItems, 10);
    bingoState = {};
    bingoItems.forEach(item => bingoState[item] = false);
    localStorage.setItem("bingo-items", JSON.stringify(bingoItems));
    localStorage.setItem("bingo-state", JSON.stringify(bingoState));
  }

  renderBingo();
}

resetBtn.onclick = () => {
  bingoItems.forEach(item => bingoState[item] = false);
  localStorage.setItem("bingo-state", JSON.stringify(bingoState));
  renderBingo();
  closeOverlays();
};

themeBtn.onclick = () => {
  app.classList.toggle("dark");
  app.classList.toggle("light");
  themeBtn.textContent = app.classList.contains("dark") ? "☀️" : "🌙";
};

document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = closeOverlays;
});

initGame();
