

const loader = document.querySelector('.loader')
const postLoader = document.querySelector('.postLoader')
const text = document.querySelector('.loader_text')
const digits = document.querySelector('.loader_bar_digitals')
const btnRestart = document.querySelector('.postLoader_btn');
btnRestart.addEventListener("click", resetLoader);

loader.addEventListener('mousedown', loaderMouseStart);
loader.addEventListener('mousemove', loaderMouseMove);
loader.addEventListener('mouseup', loaderMouseEnd);
loader.addEventListener('mouseleave', loaderMouseEnd);

let loaderState, loaderAngle, loaderWidth, LoaderWheelStartAngle, loaderMouseStartAngle;
resetLoader();

function resetLoader() {

  loaderState = 'Idle';
  loaderAngle = 0;
  loaderWidth = 0;

  loader.classList.remove('hide');
  postLoader.classList.add('hide');

  setCssProperties(0,0);
  setLoaderText();
}

function loaderMouseStart(e) {

  if (loaderState === 'On') {
    return false;
  }

  LoaderWheelStartAngle = loaderAngle;
  loaderMouseStartAngle = getAngle(e);
  loaderState = 'On';
}

function loaderMouseMove(e) {

  if (loaderState !== 'On') {
    return false;
  }

  const lastAngle = loaderAngle;
  const thisMouseAngle = getAngle(e);
  loaderAngle = LoaderWheelStartAngle + (thisMouseAngle - loaderMouseStartAngle);

  const wChange = Math.min(5, Math.max(-5, (loaderAngle + 360) - (lastAngle + 360)));
  loaderWidth = Math.min(100, Math.max(0, loaderWidth + wChange * 0.025));

  if (loaderWidth >= 100) {
    loaded();
  } else {
    setCssProperties(loaderAngle, loaderWidth);
    setLoaderText(loaderWidth);
  }
}

function loaderMouseEnd(e) {
  loaderState = 'Idle';
}

function loaded() {
  loader.classList.add('hide');
  postLoader.classList.remove('hide');
}

function getAngle(e) {
  return Math.atan2((e.y - (window.innerHeight / 2)), (e.x - (window.innerWidth / 2))) * 180 / Math.PI;
}

function setLoaderText(w=0) {
  switch (true) {
    case w > 80:
      text.innerHTML = 'Almost there...';
      break;

    case w > 60:
      text.innerHTML = 'Keep going...';
      break;

    case w > 40:
      text.innerHTML = `You're doing good...`;
      break;

    case w > 20:
      text.innerHTML = `That's it...`;
      break;

    case w > 0:
      text.innerHTML = 'loading...';
      break;

    default:
      text.innerHTML = 'Crank the wheel<br>to start loading';
      break;
  }
}

function setCssProperties(a, w) {
  loader.style.setProperty('--loaderWheelAngle', `${a}deg`);
    loader.style.setProperty('--loaderBarWidth', `${w}%`);
    digits.textContent = `${Math.trunc(w)}%`;
}
