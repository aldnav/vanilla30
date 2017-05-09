function playSound(e) {
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    // handle high E
    if (e.keyCode == 69 && e.shiftKey) {
        audio = document.querySelector(`audio[data-alt-key="${e.keyCode}"]`);
        key = document.querySelector(`.key[data-alt-key="${e.keyCode}"]`);
    }

    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function playSoundOnClick(e) {
    const target = e.target.closest(`.key`);
    const keyValue = target.getAttribute('data-key');
    if (!keyValue) return;
    let audio;
    if (target.getAttribute('data-alt-key')) {
        audio = document.querySelector(`audio[data-alt-key="${keyValue}"]`);
    } else {
        audio = document.querySelector(`audio[data-key="${keyValue}"]`);
    }
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    target.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
window.addEventListener('click', playSoundOnClick);
