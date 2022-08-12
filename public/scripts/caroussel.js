// opening animation for title and appearance of caroussel
setTimeout(() => {
  introSectionElement.style.display = "flex";
}, 7000);

// init function to create the caroussel
async function init(delayTime) {
  isClicked = false;

  // checking if the caroussel is in initial state or if one card is already active and has to go back in line
  if (activeElement >= 0) {
    autoRotate = true;
    allDivElements[activeElement].removeEventListener("click", showIntro);
    allDivElements[activeElement].addEventListener("click", openPage);
    allDivElements[activeElement].classList.remove("active");
    dragElement.style.transform = "none";
    dragElement.style.transition = "none";

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
  // checking if it's the start initialization
  if (isStart) {
    allDivElements.pop();
    isStart = false;

    allDivElements.forEach((divElement) => {
      divElement.addEventListener("click", openPage);
    });
  }

  // autoRotate function for caroussel. Especially when one card is activated it's necessary to stop the autorotaion. Otherwise the animations and transitions would not be smooth
  if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    spinElement.style.animation = `${animationName} ${Math.abs(
      rotateSpeed
    )}s infinite linear`;
  }

  // bringing the cards in the right position around the center
  for (let i = 0; i < allDivElements.length; i++) {
    allDivElements[i].style.transform =
      "rotateY(" +
      -i * (360 / allDivElements.length) +
      "deg) rotateX(" +
      -tY +
      "deg) translateZ(" +
      radius +
      "px)";
    allDivElements[i].style.transition = "transform 1s";
    allDivElements[i].style.transitionDelay =
      delayTime || (allDivElements.length - i) / 4 + "s";
  }
}

// function to activate a card and to show the content
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

// starting initialization.
//TODO: Here is still a placeholder ("activateElement"). Not sure yet how I want it to appear. yet to change.
async function showIntro() {
  setTimeout(init, 10);
  if (isStart) {
    setTimeout(() => {
      activateElement.style.display = "none";
    }, 300);
  }
}

// applying the right x and y angles
function applyTransform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

// spining animation what makes it a caroussel.
function playSpin() {
  spinElement.style.animationPlayState = isSpining ? "running" : "paused";
}

// initial values for positioning
let sX,
  sY,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 0;

// mouseevents to spin/drag the caroussel around
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

// scrollevent to increase/decrease distance of the cards from the center
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
