let particles = [];
const num = 500;

const noiseScale = 0.01/9;

function getRandomImage() {
  const image = ["bazzite", "bluefin", "ucore", "aurora", "ublue"];
  const randomIndex = Math.floor(Math.random() * image.length);
  return image[randomIndex];
}

function setup() {
  let str = getRandomImage();
  let seed = 0;
  for (let i = 0; i < str.length; i++) {
      seed += str.charCodeAt(i);
  }

  randomSeed(seed);
  noiseSeed(seed);
  let container = document.getElementById('sketch-holder');
  let desiredWidth = container.clientWidth;
  let desiredHeight = container.clientHeight;
  var canvas = createCanvas(desiredWidth, desiredHeight);
  canvas.parent('sketch-holder');
  canvas.style('display', 'block');
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  stroke(100);
  clear();
  windowResized();
  frameRate(30);
}

function draw() {
  if (document.hasFocus() && window.scrollY <= window.innerHeight) {
    background(0, 10);
    for(let i = 0; i < num; i ++) {
      let p = particles[i];
      point(p.x, p.y);
      let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
      let a = TAU * n;
      p.x += cos(a);
      p.y += sin(a);
      if(!onScreen(p)) {
        p.x = random(width);
        p.y = random(height);
      }
    }
  }
}

function windowResized() {
  let container = document.getElementById('sketch-holder');
  let desiredWidth = container.clientWidth;
  let desiredHeight = container.clientHeight;
  if(width != desiredWidth || height != desiredHeight) {
    resizeCanvas(desiredWidth, desiredHeight);
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
