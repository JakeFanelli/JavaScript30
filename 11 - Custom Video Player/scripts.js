const viewer = document.querySelector('.viewer');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const playerSlider = document.querySelectorAll(".player__slider");
const volumeSlider = document.querySelector('.player__slider[name=volume]');
const playbackSlider = document.querySelector('.player__slider[name=playbackRate]');
viewer.volume = volumeSlider.value;
viewer.playbackRate = playbackSlider.value;

function togglePlay(){
    (viewer.paused) ? viewer.play() : viewer.pause();
}
function togglePlayButton(){
    let icon = (viewer.paused) ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function sliderControl(e){
    viewer[this.name] = this.value;
}
function mouseDownChange(){
    mouseDown = true;
}
function mouseUpChange(){
    mouseDown = false;
}
function skip(){
    viewer.currentTime += parseInt(this.dataset.skip);
}
function progressUpdate(){
    let percentFilled = (viewer.currentTime/viewer.duration) * 100;
    progressFilled.style.flexBasis = `${percentFilled}%`;
}
function changeTimeInVideo(e){
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * viewer.duration;
    viewer.currentTime = scrubTime;
}
function mouseDownChangeTimeInVideo(e){
    if(mouseDown){
        const scrubTime = (e.offsetX / progressBar.offsetWidth) * viewer.duration;
        viewer.currentTime = scrubTime;
    }
}

toggle.addEventListener('click', togglePlay);
viewer.addEventListener('play', togglePlayButton);
viewer.addEventListener('pause', togglePlayButton);
viewer.addEventListener('timeupdate', progressUpdate);
progressBar.addEventListener('click', changeTimeInVideo);
progressBar.addEventListener('mousemove', mouseDownChangeTimeInVideo);
progressBar.addEventListener('mousedown', mouseDownChange);
progressBar.addEventListener('mouseup', mouseUpChange);
progressBar.addEventListener('mouseleave', mouseUpChange);

skipButtons.forEach(button => button.addEventListener('click', skip));

let mouseDown = false;
playerSlider.forEach(slider => slider.addEventListener('mousemove', sliderControl));
playerSlider.forEach(slider => slider.addEventListener('change', sliderControl));
playerSlider.forEach(slider => slider.addEventListener('mousedown', mouseDownChange));
playerSlider.forEach(slider => slider.addEventListener('mouseup', mouseUpChange));