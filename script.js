const waifus = [
  { name: "Alya", anime: "Alya Sometimes Hides Her Feelings in Russian", rarity: "Legendary", image: "assets/waifu/alya.jpg" },
  { name: "Mahiru", anime: "The Angel Next Door", rarity: "Legendary", image: "assets/waifu/mahiru.jpg" },
  { name: "Hu Tao", anime: "Genshin Impact", rarity: "Legendary", image: "assets/waifu/hutao.jpg" },
  { name: "Marin", anime: "My Dress-Up Darling", rarity: "Legendary", image: "assets/waifu/marin.jpg" },
  { name: "Mai", anime: "Bunny Girl Senpai", rarity: "Legendary", image: "assets/waifu/mai.jpg" },
  { name: "Chizuru", anime: "Rent-a-Girlfriend", rarity: "Rare", image: "assets/waifu/chizuru.jpg" },
  { name: "Emilia", anime: "Re:Zero", rarity: "Rare", image: "assets/waifu/emilia.jpg" },
  { name: "Rias", anime: "High School DxD", rarity: "Rare", image: "assets/waifu/rias.jpg" },
  { name: "Asuna", anime: "SAO", rarity: "Rare", image: "assets/waifu/asuna.jpg" },
  { name: "Miku", anime: "Quintuplets", rarity: "Common", image: "assets/waifu/miku.jpg" },
  { name: "Yui", anime: "Oregairu", rarity: "Common", image: "assets/waifu/yui.jpg" },
];

let pulls = 0;
let gems = 0;
let pity = 0;
let collection = JSON.parse(localStorage.getItem("collection")) || [];

document.getElementById("gacha-button").addEventListener("click", () => {
  if (gems <= 0) {
    alert("💎 Kamu butuh gems untuk gacha!");
    return;
  }

  gems--;
  pulls++;
  pity++;

  let result = gacha();
  displayWaifu(result);
  updateUI();

  if (result.rarity === "Legendary") {
    document.getElementById("legend-sound").play();
    pity = 0;
  }

  saveProgress();
});

document.getElementById("daily-reward").addEventListener("click", () => {
  if (localStorage.getItem("claimed_today")) {
    alert("❌ Kamu sudah ambil daily reward hari ini!");
  } else {
    gems += 1;
    localStorage.setItem("claimed_today", "yes");
    alert("🎁 Kamu dapat 1 pull dari daily reward!");
    updateUI();
  }
});

document.getElementById("collection-button").addEventListener("click", showCollection);

function gacha() {
  let available = waifus.filter(w => {
    if (pity >= 30 && w.rarity === "Legendary") return true;

    let chance = Math.random();
    if (w.rarity === "Legendary") return chance < 0.05;
    if (w.rarity === "Rare") return chance < 0.25;
    return chance < 0.7;
  });

  let selected = available[Math.floor(Math.random() * available.length)];
  if (!collection.includes(selected.name)) collection.push(selected.name);
  return selected;
}

function displayWaifu(waifu) {
  document.getElementById("main-waifu-display").innerHTML = `
    <img src="${waifu.image}" alt="${waifu.name}" />
    <h3>${waifu.name} (${waifu.rarity})</h3>
    <p>From: ${waifu.anime}</p>
  `;
  document.getElementById("result").innerText = `🎉 Kamu dapat: ${waifu.name}!`;
}

function updateUI() {
  document.getElementById("pull-count").innerText = `Total Pulls: ${pulls}`;
  document.getElementById("gems-count").innerText = `💎 Gems: ${gems}`;
}

function showCollection() {
  const grid = document.getElementById("collection-grid");
  grid.innerHTML = "";

  collection.forEach(name => {
    const waifu = waifus.find(w => w.name === name);
    const img = document.createElement("img");
    img.src = waifu.image;
    img.alt = waifu.name;
    grid.appendChild(img);
  });

  document.getElementById("collection-modal").style.display = "block";
}

function closeCollection() {
  document.getElementById("collection-modal").style.display = "none";
}

function saveProgress() {
  localStorage.setItem("collection", JSON.stringify(collection));
  localStorage.setItem("gems", gems);
  localStorage.setItem("pulls", pulls);
}

function loadProgress() {
  gems = parseInt(localStorage.getItem("gems")) || 5;
  pulls = parseInt(localStorage.getItem("pulls")) || 0;
  updateUI();
}

loadProgress();
