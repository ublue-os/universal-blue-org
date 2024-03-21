let particles = [];
const num = 500;

const noiseScale = 0.01/3;

function setup() {
  let str = "1a5652bae6b1e0f0b315814a52d7953326b17b676157f58cd3b2d7f4e707ad61";
  let seed = 0;
  for (let i = 0; i < str.length; i++) {
      seed += str.charCodeAt(i);
  }

  randomSeed(seed);
  noiseSeed(seed);
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  stroke(100);
  clear();
}

function draw() {
  var height = window.scrollY;
  var winheight = window.innerHeight;
  if (document.hasFocus() && height <= winheight) {
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
  resizeCanvas(windowWidth, windowHeight);
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}