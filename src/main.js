import "./style.css";

const video = document.getElementById("video-player");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const speedUpBtn = document.getElementById("speed-up");
const speedDownBtn = document.getElementById("speed-down");
const speedNormalBtn = document.getElementById("speed-normal");
const volumeBtn = document.getElementById("volume");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeSpan = document.getElementById("current-time");
const durationSpan = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

playBtn.onclick = play;
pauseBtn.onclick = pause;
stopBtn.onclick = stop;
speedUpBtn.onclick = speedUp;
speedDownBtn.onclick = speedDown;
speedNormalBtn.onclick = speedNormal;
volumeBtn.oninput = videoVolume;
nextBtn.onclick = getNextVideo;
prevBtn.onclick=getPrevVideo;



function play() {
  video.play();
}

function pause() {
  video.pause();
}

function stop() {
  video.pause();
  video.currentTime = 0;
}

function speedUp() {
  video.play();
  video.playbackRate = 2;
}

function speedDown() {
  video.play();
  video.playbackRate = 0.5;
}

function speedNormal() {
  video.play();
  video.playbackRate = 1;
}

function videoVolume() {
  let v = this.value;
  video.volume = v / 100;
}

function getUpdateDuration(time) {
  const minutes = Math.trunc(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.trunc(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

setTimeout((durationSpan.innerText = getUpdateDuration(video.duration)), 500);

video.addEventListener("timeupdate", function () {
  const { currentTime, duration } = video;
  currentTimeSpan.innerText = getUpdateDuration(video.currentTime);
  const persentage = (currentTime / duration) * 100;
  progress.style.width = persentage + "%";
});

progressContainer.addEventListener("click", function (event) {
  const persent = (event.offsetX / progressContainer.clientWidth) * 100;
  const timeToGo = (persent * video.duration) / 100;
  video.currentTime = timeToGo;
});

const videos = [
  {
    video: "../assets/video/Bird - 46026.mp4",
  },
  {
    video: "../assets/video/Bullfinch - 24805.mp4",
  },
  {
    video: "../assets/video/Dog - 15305.mp4",
  },
  {
    video: "../assets/video/istockphoto-1296400636-640_adpp_is.mp4",
  },
  {
    video: "../assets/video/Red Whiskered Bulbul Bird - 44653.mp4",
  },
  {
    video: "../assets/video/Squirrel - 406.mp4",
  },
];

let currentIndex = 0;

function loadMusic(index) {
  let currentVideo = videos[index];
  video.src = currentVideo.video;
  pause()
  progress.style.width='0%'
}

loadMusic(currentIndex);


function getNextVideo () {
  currentIndex++
  if(currentIndex>videos.length-1) {
    currentIndex=0
  }
  
  durationSpan.innerText=getUpdateDuration(video.duration)
  loadMusic(currentIndex)
}

function getPrevVideo () {
  currentIndex--
  if(currentIndex<0) {
    currentIndex=videos.length-1
  }
  durationSpan.innerText=getUpdateDuration(video.duration)
  loadMusic(currentIndex)
}