const player = document.querySelector(".player");
const playpause_btn = document.querySelector(".playpause-track");
const slider = document.querySelector(".slider_container");
const volume_slider = document.querySelector(".volume_slider");
const volumeIcon = document.querySelector(".volume_container");
const enableAudioBtn = document.getElementById("audio-enable_btn");
const disableAudioBtn = document.getElementById("audio-disable_btn");
const startPage = document.getElementById("start");
const header = document.querySelector("header");
const main = document.querySelector("main");

let isPlaying = false;
let track_index = 0;
let curr_track = document.createElement("audio");
let previousVolume;
let previousSliderValue;

const music_list = [
  { name: "Danheim - Ulvekald", source: "/audio/danheim.mp3" },
];

loadTrack(track_index);

function loadTrack() {
  curr_track.src = music_list[track_index].source;
  curr_track.load();
  curr_track.addEventListener("ended", () => {
    player.style.display = "none";
  });
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  setVolume();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause fa-xl"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-xl"></i>';
  console.log("test");
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;

  if (curr_track.volume >= 0.5) {
    volumeIcon.innerHTML =
      '<i class="fa-solid fa-volume-high fa-2x1" id="volumeHighIcon"></i>';
  } else {
    if (curr_track.volume === 0) {
      volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark fa-2x1"></i>';
    } else {
      volumeIcon.innerHTML =
        '<i class="fa-solid fa-volume-low fa-2x1" id="volumeLowIcon"></i>';
    }
  }
}

function toggleVolume() {
  if (curr_track.volume === 0) {
    curr_track.volume = previousVolume;
    volume_slider.value = previousSliderValue;
    setVolume();
  } else {
    previousVolume = curr_track.volume;
    previousSliderValue = volume_slider.value;
    curr_track.volume = 0;
    volume_slider.value = 0;
    setVolume();
  }
}

function showPage() {
  startPage.style.display = "none";
  main.style.display = "block";
  header.style.display = "flex";
}

function enableAudio() {
  showPage();
  player.style.display = "flex";
  playTrack();
}

enableAudioBtn.addEventListener("click", enableAudio);
disableAudioBtn.addEventListener("click", showPage);
volumeIcon.addEventListener("click", toggleVolume);
