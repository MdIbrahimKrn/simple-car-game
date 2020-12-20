let btn = document.querySelector("button");
let gameArea = document.getElementById("game-area");
let gameScr = document.querySelector(".game-scr");

const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  Enter: false,
  Test: false,
};
let carImg = [
  "url('img/car1.png')",
  "url('img/car2.png')",
  "url('img/car3.png')",
  "url('img/car4.png')",
];
let plyer = { speed: 5, scr: 0 };
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  if (e.key == "Enter" && !keys.Test) {
    enter();
  }
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function isCollide(mCar, oCars) {
  let otCars = oCars.getBoundingClientRect();
  return !(
    mCar.bottom < otCars.top ||
    mCar.top > otCars.bottom ||
    mCar.right < otCars.left ||
    mCar.left > otCars.right
  );
}
function endGame() {
  plyer.strat = false;
  keys.Test = false;
  btn.classList.remove("hide");
  btn.innerHTML = `Game Over. <br> Your Score: ${
    plyer.scr + 1
  }.<br> Click This Botton Restart Your Game`;
}
function moveLine() {
  let lines = document.querySelectorAll(".lines");

  lines.forEach((item) => {
    item.y += plyer.speed;
    item.style.top = item.y + "px";
    if (item.y >= 700) {
      item.y -= 750;
    }
  });
}
function moveCar(roadV, myCar) {
  let cars = document.querySelectorAll(".animicars");

  cars.forEach((item) => {
    if (isCollide(myCar, item)) {
      endGame();
    }
    if (item.y >= 700) {
      item.y = -300;
      item.style.left =
        Math.floor(Math.random() * (roadV.width - myCar.width)) + "px";
      item.style.backgroundImage =
        carImg[Math.floor(Math.random() * carImg.length)];
    }
    item.y += plyer.speed + 1;
    item.style.top = item.y + "px";
  });
}
btn.addEventListener("click", startGame);

function enter() {
  keys.Enter = true;
  keys.Test = true;
  if (keys.Enter) {
    startGame();
  }
}

function startGame() {
  btn.classList.add("hide");
  gameArea.innerHTML = "";
  plyer.scr = 0;
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  plyer.strat = true;
  plyer.x = car.offsetTop;
  plyer.y = car.offsetLeft;
  for (let x = 0; x < 5; x++) {
    let line = document.createElement("div");
    line.setAttribute("class", "lines");
    line.y = x * 150;
    line.style.top = line.y + "px";
    gameArea.appendChild(line);
  }

  for (let x = 0; x < 4; x++) {
    let animicar = document.createElement("div");
    animicar.setAttribute("class", "animicars");
    animicar.y = (x + 1) * 250 * -1;
    animicar.style.top = animicar.y + "px";
    animicar.style.left = Math.floor(Math.random() * (400 - 45)) + "px";
    animicar.style.backgroundImage =
      carImg[Math.floor(Math.random() * carImg.length)];
    gameArea.appendChild(animicar);
  }
  requestAnimationFrame(playGame);
}

function playGame() {
  car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  let carValue = car.getBoundingClientRect();

  if (plyer.strat) {
    moveLine();
    moveCar(road, carValue);
    if (keys.ArrowUp && plyer.x > road.y + 100) {
      plyer.x -= plyer.speed;
    }
    if (keys.ArrowDown && plyer.x < road.height - (carValue.height + 5)) {
      plyer.x += plyer.speed;
    }
    if (keys.ArrowLeft && plyer.y > road.width - road.width) {
      plyer.y -= plyer.speed;
      car.style.transform = "rotateZ(-10deg)";
    } else {
      car.style.transform = "rotateZ(0deg)";
    }
    if (keys.ArrowRight && plyer.y < road.width - (carValue.width + 5)) {
      plyer.y += plyer.speed;
      car.style.transform = "rotateZ(10deg)";
    }
    car.style.top = plyer.x + "px";
    car.style.left = plyer.y + "px";
    requestAnimationFrame(playGame);
    plyer.scr++;
    gameScr.innerHTML = "Your scr: " + plyer.scr;
  }
}
