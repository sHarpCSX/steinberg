// variables
// caroussel
let autoRotate = true;
let isStart = true;
let isSpining = true;
let isClicked = true;
let radius = 340;
let activeElement = -1;
const rotateSpeed = -60;
const divWidth = 180;
const divHeight = 240;

// audio-config
let isPlaying = false;
let track_index = 0;
let previousVolume;
let previousSliderValue;
let curr_track = document.createElement("audio");
const music_list = [
  { name: "Danheim - Ulvekald", source: "/audio/danheim.mp3" },
];

// climber

// DOM-variables
// caroussel
const introSectionElement = document.getElementById("introduction");
const dragElement = document.getElementById("drag");
const spinElement = document.getElementById("spin");
const activateElement = document.getElementById("activate_card");
const threedElement = document.getElementById("threed_content");
const conceptionElement = document.getElementById("conception");
const listItems = document.querySelectorAll(".list-item");
const loader = document.querySelector(".loader-wrapper");
const divElement = spinElement.getElementsByTagName("div");
const allDivElements = [...divElement];
/* const ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px"; */
spinElement.style.width = divWidth + "px";
spinElement.style.height = divHeight + "px";

// audio-config
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

// climber
