const getPointObject = () => document.getElementsByClassName("point")[0];
const getTargetObject = ()=> document.getElementById('target');
const getRandom = (min, max) => {
  const random = Math.floor(Math.random() * (max - min) + min);
  return random;
};
const maxX = 89;
const maxY = 87;
const movePixel = 1;
const speeds = { low: 1000, medium: 500, fast: 100 };
const speed = speeds.fast;
const changeDirectSpeeds = { low: 5000, medium: 3000, fast: 1000 };
const changeDirectSpeed = changeDirectSpeeds.medium;
let point = getPointObject();
let target = getTargetObject();
const direction = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

let targetX = getRandom(0, maxX);
let targetY = getRandom(0, maxY);

const changePositionTarget = () => {
    targetX = getRandom(0, maxX);
    targetY = getRandom(2, 77);
    target = getTargetObject();
    target.style.left = targetX + 'vw';
    target.style.top = targetY + 'vh';

}

const checkOverlap = (el1, el2) =>{
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
  }

const randomDirect = () => {
  const keys = Object.keys(direction);
  const randomKey = Math.floor(Math.random() * keys.length);
  return direction[keys[randomKey]];
};

let direct = direction.down;

let x = getRandom(0, maxX);
let y = getRandom(0, maxY);

const moveUp = (pixel) => {
  if (check() === false) return;
  y -= pixel;
  movePoint();
};

const moveDown = (pixel) => {
  if (check() === false) return;
  y += pixel;
  movePoint();
};

const moveLeft = (pixel) => {
  if (check() === false) return;
  x -= pixel;
  movePoint();
};

const moveRight = (pixel) => {
  if (check() === false) return;
  x += pixel;
  movePoint();
};

const movePoint = () => {
  point = getPointObject();
  point.style.left = x + "vw";
  point.style.top = y + "vh";
  const isOverlap = checkOverlap(point, target);
  if(isOverlap) changePositionTarget();
};

const check = () => {
  let result = true;
  if (direct === direction.up && y - movePixel <= 0) result = false;
  else if (direct === direction.down && y + movePixel >= maxY) result = false;
  else if (direct === direction.left && x - movePixel <= 0) result = false;
  else if (direct === direction.right && x + movePixel >= maxX) result = false;

  if (result === false) direct = randomDirect();
  return result;
};

const randomMove = () => {
  switch (direct) {
    case direction.down:
      moveDown(movePixel);
      break;
    case direction.up:
      moveUp(movePixel);
      break;
    case direction.left:
      moveLeft(movePixel);
      break;
    case direction.right:
      moveRight(movePixel);
      break;
  }
};

const changePosition = (e) => {
  point = getPointObject();
  const newX = getRandom(0, maxX);
  const newY =getRandom(0, maxY);
  direct = randomDirect();
  x = newX;
  y = newY;
  point.style.left = newX + "vw";
  point.style.top = newY + "vh";
};

point.addEventListener("mouseover", ()=>{ 
    direct = randomDirect();
});
let timer = setInterval(randomMove, speed);
let timer2 = setInterval(() => {
  direct = randomDirect();
}, changeDirectSpeed);
const handleKeypress = (e) => {
  const keycode = e.keyCode;
  if (Object.values(direction).indexOf(keycode) > -1) {
    direct = keycode;
  }
};

window.addEventListener("keydown", handleKeypress);
target.addEventListener('mouseover', changePositionTarget);



