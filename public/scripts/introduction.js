let autoRotate = true;
let isStart = true;
let isSpining = true;
let isClicked = false;

let radius = 340;
const rotateSpeed = -60;
const divWidth = 180;
const divHeight = 240;

const introSectionElement = document.getElementById("introduction");
const dragElement = document.getElementById("drag");
const spinElement = document.getElementById("spin");
const activateElement = document.getElementById("activate_card");
const threedElement = document.getElementById("threed_content");
const conceptionElement = document.getElementById("conception");

let activeElement;
let divElement = spinElement.getElementsByTagName("div");
const allDivElements = [...divElement];
const listItems = document.querySelectorAll(".list-item");

spinElement.style.width = divWidth + "px";
spinElement.style.height = divHeight + "px";

/* const ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px"; */

setTimeout(() => {
  introSectionElement.style.display = "flex";
}, 3000);

function init(delayTime) {
  isClicked = false;
  if (isStart) {
    allDivElements.pop();
    isStart = false;

    allDivElements.forEach((divElement) => {
      divElement.addEventListener("click", openPage);
    });
  }

  if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    spinElement.style.animation = `${animationName} ${Math.abs(
      rotateSpeed
    )}s infinite linear`;
  }

  for (let i = 0; i < allDivElements.length; i++) {
    allDivElements[i].style.transform =
      "rotateY(" +
      -i * (360 / allDivElements.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    allDivElements[i].style.transition = "transform 1s";
    allDivElements[i].style.transitionDelay =
      delayTime || (allDivElements.length - i) / 4 + "s";
  }
}

function openPage(e) {
  isClicked = true;
  /* isSpining = false; */
  autoRotate = false;

  (sX = 0), (sY = 0), (nY = 0), (desX = 0), (desY = 0), (tX = 0), (tY = 10);

  for (let i = 0; i < allDivElements.length; i++) {
    spinElement.style.animation = "none";
    if (e.target.dataset.id === allDivElements[i].dataset.id) {
      allDivElements[i].classList.add("active");
      allDivElements[i].style.transform =
        "rotateY(0deg) rotateX(0deg) translateZ(0px) translateY(-320px)";
      allDivElements[i].style.transition = "transform 3s";

      try {
        setTimeout(() => {
          dragElement.style.transform = "rotateY(0deg) rotateX(0deg)";
          dragElement.style.transition = "transform 3s";

          spinElement.style.transform = "rotateY(0deg) rotateX(0deg)";
          spinElement.style.transition = "transform 3s";
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      allDivElements[i].style.transform =
        "rotateY(0deg) rotateX(0deg) translateZ(0px)";
      allDivElements[i].style.transition = "transform 2s";
      allDivElements[i].style.animation = "disappear 2s ease";
      try {
        setTimeout(() => {
          allDivElements[i].style.display = "none";
        }, 1900);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
async function showIntro() {
  isClicked = true;
  setTimeout(init, 100);
  setTimeout(() => {
    activateElement.style.display = "none";
  }, 300);
}

function applyTransform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin() {
  spinElement.style.animationPlayState = isSpining ? "running" : "paused";
}
let sX,
  sY,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

document.onpointerdown = async function (e) {
  if (!isClicked) {
    clearInterval(dragElement.timer);
    e = e || window.event;
    let sX = e.clientX,
      sY = e.clientY;

    this.onpointermove = function (e) {
      e = e || window.event;
      let nX = e.clientX,
        nY = e.clientY;

      desX = nX - sX;
      desY = nY - sY;
      tX += desX * 0.1;
      tY += desY * 0.1;

      applyTransform(dragElement);

      sX = nX;
      sY = nY;
    };

    this.onpointerup = async function (e) {
      dragElement.timer = setInterval(function () {
        desX *= 0.95;
        desY *= 0.95;
        tX += desX * 0.1;
        tY += desY * 0.1;

        applyTransform(dragElement);

        if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
          clearInterval(dragElement.timer);
          playSpin(true);
        }
      }, 17);

      this.onpointermove = this.onpointerup = null;
    };

    return false;
  }
};

document.onmousewheel = function (e) {
  if (!isClicked) {
    e = e || window.event;
    let d = e.wheelDelta / 10 || -e.detail;
    radius -= d;
    init(1);
    console.log(radius);
  }
};

activateElement.addEventListener("click", showIntro);
