const yes = document.getElementById("yes");
const no = document.getElementById("no");
const bear = document.getElementById("bear");
const msg = document.getElementById("msg");
let dodges = 0;
let mood = "🐻";     // ang mukha ng bear kapag walang tinatapatan
let done = false;    // true kapag nag-Yes na siya

const NO_FACES = ["🥺", "😢", "😭", "😤", "🙈", "😵", "🥹", "😡"];
const KILIG_FACES = ["🥰", "😍", "🤭", "😳"];

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

// --- NO: umiiwas at iba-iba ang reaksyon ng bear ---
function dodge(e) {
  e.preventDefault();
  if (done) return;
  no.style.position = "fixed";
  no.style.left = Math.random() * (innerWidth - no.offsetWidth) + "px";
  no.style.top = Math.random() * (innerHeight - no.offsetHeight) + "px";

  mood = NO_FACES[dodges % NO_FACES.length];
  bear.textContent = mood;
  bear.classList.add("shake");
  setTimeout(() => bear.classList.remove("shake"), 400);

  dodges++;
  yes.style.transform = "scale(" + Math.min(1 + dodges * 0.08, 1.8) + ")";
}

["pointerenter", "pointerdown", "touchstart", "click"]
  .forEach(t => no.addEventListener(t, dodge));

// --- YES: kinikilig kapag tinapat ---
yes.addEventListener("pointerenter", () => {
  if (done) return;
  bear.textContent = KILIG_FACES[Math.floor(Math.random() * KILIG_FACES.length)];
  bear.classList.add("kilig");
  const r = bear.getBoundingClientRect();
  for (let i = 0; i < 4; i++) heart(r.left + Math.random() * r.width, 20 + Math.random() * 14);
});

yes.addEventListener("pointerleave", () => {
  if (done) return;
  bear.classList.remove("kilig");
  bear.textContent = mood;
});

yes.onclick = () => {
  done = true;
  no.hidden = true;
  bear.classList.add("kilig");
  bear.textContent = "🥰";
  msg.textContent = "Yay!! 🥰";
  msg.classList.add("pop");
  for (let i = 0; i < 40; i++) {
    setTimeout(() => heart(Math.random() * innerWidth, 20 + Math.random() * 24), i * 60);
  }
};