const yes = document.getElementById("yes");
const no = document.getElementById("no");
const bear = document.getElementById("bear");
const say = document.getElementById("say");
const msg = document.getElementById("msg");
const title = document.getElementById("title");
const BASE = "I miss you Dianne Dale Balmes🥹";

let dodges = 0;
let done = false;
let last = 0;
let mood = { face: "🐻", text: "" };

// ✏️ Pwede ninyong palitan o dagdagan ang mga ito
const NO_REACTIONS = [
  { face: "🥺", text: "Hala..." },
  { face: "😢", text: "Totoo ba?" },
  { face: "😭", text: "Wag naman please" },
  { face: "🙈", text: "Huy, wag kang ganyan" },
  { face: "😵", text: "Nahihilo na ako..." },
  { face: "🥹", text: "Sige na pleaseee" },
  { face: "😤", text: "Ayaw mo talaga?" },
  { face: "😡", text: "KAKAGATIN KITA" },
];
const KILIG = [
  { face: "🥰", text: "Ayieee" },
  { face: "😍", text: "Kinikilig ako!" },
  { face: "🤭", text: "Hihihi" },
  { face: "😳", text: "Talaga??" },
];

function react(r) {
  bear.textContent = r.face;
  say.textContent = r.text;
  say.classList.remove("pop");
  void say.offsetWidth;          // para umulit ang pop animation
  say.classList.add("pop");
}

function heart(x, size) {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = ["💖", "💕", "💗", "🌸"][Math.floor(Math.random() * 4)];
  h.style.left = x + "px";
  h.style.fontSize = size + "px";
  h.style.animationDuration = 3 + Math.random() * 3 + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6500);
}
setInterval(() => heart(Math.random() * innerWidth, 16 + Math.random() * 20), 500);

function updateTitle() {
  const caps = BASE.split("")
    .map((ch, i) => (i < dodges * 4 ? ch.toUpperCase() : ch))
    .join("");
  const bang = "!".repeat(Math.min(Math.floor(dodges / 2), 6));
  title.textContent = caps + "?" + bang + " 🌹";
  const max = innerWidth < 600 ? 3 : 5;   // mas maliit ang limit sa phone
  title.style.fontSize = Math.min(2 + dodges * 0.3, max) + "rem";
}

function dodge(e) {
  e.preventDefault();
  if (done) return;
  const now = Date.now();
  if (now - last < 300) return;   // isang tap = isang bilang lang
  last = now;

  no.style.position = "fixed";
  no.style.left = Math.random() * (innerWidth - no.offsetWidth) + "px";
  no.style.top = Math.random() * (innerHeight - no.offsetHeight) + "px";

  mood = NO_REACTIONS[dodges % NO_REACTIONS.length];
  react(mood);
  bear.classList.add("shake");
  setTimeout(() => bear.classList.remove("shake"), 400);

  dodges++;
  updateTitle();
  yes.style.fontSize = Math.min(1 + dodges * 0.1, 2) + "rem";
}

["pointerenter", "pointerdown", "touchstart", "click"]
  .forEach(t => no.addEventListener(t, dodge));

yes.addEventListener("pointerenter", () => {
  if (done) return;
  react(KILIG[Math.floor(Math.random() * KILIG.length)]);
  bear.classList.add("kilig");
  const r = bear.getBoundingClientRect();
  for (let i = 0; i < 4; i++) heart(r.left + Math.random() * r.width, 20 + Math.random() * 14);
});

yes.addEventListener("pointerleave", () => {
  if (done) return;
  bear.classList.remove("kilig");
  react(mood);
});

yes.onclick = () => {
  done = true;
  no.hidden = true;
  bear.classList.add("kilig");
  react({ face: "🥰", text: "Sabi ko na eh! 😘" });
  msg.textContent = "Yay!! 🥰";
  title.textContent = "I LOVE YOU!! 💖";
  title.style.fontSize = "3rem";
  for (let i = 0; i < 40; i++) {
    setTimeout(() => heart(Math.random() * innerWidth, 20 + Math.random() * 24), i * 60);
  }
};