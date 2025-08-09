const replacements = [
  "pandi karimbara makanee", "😫😫😫", "get a job", "such an IDIOT",
  "aaaaaaaaahhhhhhhhhhhh", "U r soo useless!!", "Just Give Up", "504 GATEWAY TIMEOUT", "🔥", "LOL"
];

const sounds = [
  "https://www.myinstants.com/media/sounds/vine-boom.mp3",
  "https://www.myinstants.com/media/sounds/fart.mp3",
  "https://www.myinstants.com/media/sounds/rizz-sound-effect.mp3",
  "https://www.myinstants.com/media/sounds/peter-griffin-you-stupid-ni.mp3",
];

const explosionSound = "https://www.myinstants.com/media/sounds/explosion.mp3";

let exploded = false;
let soundIndex = 0;
let wordCount = 0;
let isPlayingSound = false;

const input = document.getElementById('textInput');

input.addEventListener('input', function (e) {
  if (exploded) return;

  const text = e.target.value;
  const lastChar = text.slice(-1);

  if (lastChar === ' ' || lastChar === '\n') {
    let words = text.trim().split(/\s+/).filter(w => w.length > 0);

    if (words.length > wordCount) {
      wordCount = words.length;

      let randomReplacement = replacements[Math.floor(Math.random() * replacements.length)];
      words[words.length - 1] = randomReplacement;
      e.target.value = words.join(" ") + " ";

      if (wordCount % 2 === 0 && !isPlayingSound) {
        playNextSound();
        shakeScreen();
      }
    }
  }

  if (text.length >= 100) {
    triggerExplosion();
  }
});

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 100%, 80%)`;
}

function shakeScreen() {
  document.body.style.transform = "translate(5px, 5px)";
  setTimeout(() => { document.body.style.transform = "translate(-5px, -5px)"; }, 100);
  setTimeout(() => { document.body.style.transform = "translate(0, 0)"; }, 200);
}

function playNextSound() {
  isPlayingSound = true;
  let audio = new Audio(sounds[soundIndex]);
  audio.play();
  soundIndex = (soundIndex + 1) % sounds.length;

  audio.onended = () => {
    isPlayingSound = false;
  };
}

function triggerExplosion() {
  exploded = true;
  document.getElementById('explosionMessage').style.display = "block";
  input.disabled = true;

  let flashInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomColor();
  }, 100);

  let boom = new Audio(explosionSound);
  boom.play();

  setTimeout(() => {
    clearInterval(flashInterval);
    document.body.style.backgroundColor = "#000";
  }, 3000);
}
