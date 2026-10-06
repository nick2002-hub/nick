const yes = document.getElementById("yes");
const no = document.getElementById("no");
const bear = document.getElementById("bear");
const msg = document.getElementById("msg");
let dodges = 0;

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

// walang tigil na lumulutang na hearts
setInterval(() => heart(Math.random() * innerWidth, 16 + Math.random() * 20), 500);

function dodge(e) {
  e.preventDefault();
  no.style.position = "fixed";
  no.style.left = Math.random() * (innerWidth - no.offsetWidth) + "px";
  no.style.top = Math.random() * (innerHeight - no.offsetHeight) + "px";
  dodges++;
  yes.style.transform = "scale(" + Math.min(1 + dodges * 0.08, 1.8) + ")";
  bear.textContent = ["🥺", "😢", "😭"][Math.min(dodges - 1, 2)];
}

["pointerenter", "pointerdown", "touchstart", "click"]
  .forEach(t => no.addEventListener(t, dodge));

yes.onclick = () => {
  no.hidden = true;
  bear.textContent = "🥰";
  msg.textContent = "Yay!! 🥰";
  msg.classList.add("pop");
  for (let i = 0; i < 40; i++) {
    setTimeout(() => heart(Math.random() * innerWidth, 20 + Math.random() * 24), i * 60);
  }
};