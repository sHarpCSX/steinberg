setTimeout(() => {
  introSectionElement.style.display = "flex";
}, 7000);

async function init(delayTime) {
  isClicked = false;

  if (activeElement >= 0) {
    autoRotate = true;
    allDivElements[activeElement].removeEventListener("click", showIntro);
    allDivElements[activeElement].addEventListener("click", openPage);
    allDivElements[activeElement].classList.remove("active");
    dragElement.style.transform = "none";
    dragElement.style.transition = "none";
    /*  applyTransform(dragElement); */

    for (let i = 0; i < allDivElements.length; i++) {
      allDivElements[i].style.animation = "appear 2s linear forwards";

      for (const listItem of listItems) {
        listItem.style.display = "none";
      }

      setTimeout(() => {
        allDivElements[i].style.display = "flex";
      }, ((allDivElements.length - i) / 4) * 1000);
    }

    activeElement = -1;
  }
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

async function openPage(e) {
  isClicked = true;
  autoRotate = false;
  isSpining = false;
  /* loader.style.display = "flex"; */

  for (let i = 0; i < allDivElements.length; i++) {
    if (e.target.dataset.id === allDivElements[i].dataset.id) {
      activeElement = i;
      allDivElements[activeElement].style.pointerEvents = "none";
      allDivElements[activeElement].classList.add("active");
      allDivElements[activeElement].style.transform =
        "rotateY(0deg) rotateX(0deg) translateZ(0px) translateY(-320px)";
      allDivElements[activeElement].style.transition = "transform 3s";
      setTimeout(() => {
        /* loader.style.display = "none"; */
        allDivElements[activeElement].removeEventListener("click", openPage);
        allDivElements[activeElement].addEventListener("click", showIntro);
        allDivElements[activeElement].style.pointerEvents = "visible";

        for (const listItem of listItems) {
          if (listItem.dataset.id === allDivElements[activeElement].dataset.id)
            listItem.style.display = "flex";
        }
        isSpining = true;
        sX, sY, nY, (desX = 0), (desY = 0), (tX = 0), (tY = 0);
      }, 3000);

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
  spinElement.style.animation = "none";
}
async function showIntro() {
  setTimeout(init, 100);
  if (isStart) {
    setTimeout(() => {
      activateElement.style.display = "none";
    }, 300);
  }
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
  tY = 0;

document.onpointerdown = async function (e) {
  clearInterval(dragElement.timer);
  if (!isClicked) {
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
  }
};

// Eventlistener
activateElement.addEventListener("click", showIntro);
