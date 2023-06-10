const close = document.querySelector(".close");
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  nav.style.cssText += 'transform:translateX(0)';
});

close.addEventListener("click", () => {
  nav.style.cssText = 'transform:translateX(100%)';
});
