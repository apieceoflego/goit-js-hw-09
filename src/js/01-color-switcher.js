let timeOutId = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  bodyRef: document.querySelector('body'),
};

refs.btnStart.addEventListener('click', startChangeCollors);

refs.btnStop.addEventListener('click', () => {
  clearInterval(timeOutId);
  refs.btnStart.disabled = false;
});

function startChangeCollors() {
  timeOutId = setInterval(() => {
    refs.bodyRef.style.background = getRandomHexColor();
  }, 1000);
  refs.btnStart.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
