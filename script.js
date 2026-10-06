const yes = document.getElementById("yes");
const no = document.getElementById("no");
let dodges = 0;

function dodge(e) {
  e.preventDefault();
  no.style.position = "fixed";   // lets it move anywhere on screen
  no.style.left = Math.random() * (innerWidth - no.offsetWidth) + "px";
  no.style.top = Math.random() * (innerHeight - no.offsetHeight) + "px";
  dodges++;
  yes.style.transform = "scale(" + Math.min(1 + dodges * 0.08, 1.8) + ")";
}

["pointerenter", "pointerdown", "touchstart", "click"]
  .forEach(t => no.addEventListener(t, dodge));

yes.onclick = () => {
  no.hidden = true;
  document.getElementById("msg").textContent = "Yay!! 🥰";
};