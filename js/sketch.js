let particles = [];
const num = 500;

const noiseScale = 0.01/9;

async function fetchJSONAsync(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function applyImageBasedNoise() {
  const url = 'https://universal-blue.org/image_list.json';

  fetchJSONAsync(url)
    .then(jsonData => {
      if (jsonData && jsonData.length > 0) {
        const nonPrivateElements = jsonData.filter(element => !element.private);
        const randomIndex = Math.floor(Math.random() * nonPrivateElements.length);
        const randomImage = Math.floor(Math.random() * nonPrivateElements[randomIndex].length)
        const randomName = nonPrivateElements[randomIndex][randomImage].name;

        let seed = 0;
        for (let i = 0; i < randomName.length; i++) {
            seed += randomName.charCodeAt(i);
        }

        randomSeed(seed);
        noiseSeed(seed);

        const imageNameElement = document.getElementById('image-name');
        const imageURLElement = document.getElementById('image-url');
        imageURLElement.textContent = randomName;
        imageURLElement.href = nonPrivateElements[randomIndex][randomImage].repository.html_url;
        imageNameElement.style.display = '';
      } else {
        console.log("Failed to fetch JSON data or JSON data is empty.");
      }
    })
    .catch(error => console.error("Error fetching JSON data:", error));
}

function setup() {
  applyImageBasedNoise();

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
}

function draw() {
  if (window.scrollY <= window.innerHeight) {
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