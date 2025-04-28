const pitchPoints = [
  {
    src: 'images/img1.jpg',
    text: [
      "The world-famous Spirit Island",
      [
        "Located in Jasper National Park",
        "Stunning views at dusk",
        "Popular photography spot"
      ]
    ]
  },
  {
    src: 'images/img2.webp',
    text: [
      "Majestic Mountain Landscape",
      [
        "Snow-capped peaks",
        "Crystal clear lake reflection",
        "Serene and untouched wilderness"
      ]
    ]
  },
  {
    src: 'images/img3.jpeg',
    text: [
      "Vibrant Autumn Forest",
      [
        "Brilliant fall foliage",
        "Golden leaves carpeting the ground",
        "Crisp, fresh air"
      ]
    ]
  },
  // Add more as needed...
];

let currentIndex = 0;
let isTransitioning = false;

function setBackgroundImage(src) {
  let bg = document.querySelector('.bg-image');
  if (!bg) {
    bg = document.createElement('img');
    bg.className = 'bg-image';
    document.body.appendChild(bg);
  }
  // Fade out, change src, fade in
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.src = src;
    bg.onload = () => {
      bg.style.opacity = 1;
    };
  }, 300);
}

function createTextDiv(point, animationClass) {
  const textDiv = document.createElement('div');
  textDiv.className = 'pitch-text' + (animationClass ? ' ' + animationClass : '');

  point.text.forEach(item => {
    if (Array.isArray(item)) {
      const ul = document.createElement('ul');
      item.forEach(liText => {
        const li = document.createElement('li');
        li.textContent = liText;
        ul.appendChild(li);
      });
      textDiv.appendChild(ul);
    } else {
      const h2 = document.createElement('h2');
      h2.textContent = item;
      textDiv.appendChild(h2);
    }
  });

  return textDiv;
}

function renderPitchPoint(index, direction = null) {
  const app = document.getElementById('app');
  let container = document.querySelector('.pitch-text-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'pitch-text-container';
    app.appendChild(container);
  }

  // Remove old text with animation
  const oldText = container.querySelector('.pitch-text');
  if (oldText) {
    isTransitioning = true;
    oldText.classList.add(direction === 'up' ? 'exit-to-top' : 'exit-to-bottom');
    setTimeout(() => {
      if (oldText.parentNode) oldText.parentNode.removeChild(oldText);
      isTransitioning = false;
    }, 500);
  }

  // Set background image
  setBackgroundImage(pitchPoints[index].src);

  // Add new text with animation
  const newText = createTextDiv(
    pitchPoints[index],
    direction === 'up' ? 'enter-from-bottom' : direction === 'down' ? 'enter-from-top' : ''
  );
  container.appendChild(newText);
}

function handleScroll(event) {
  if (isTransitioning) return;
  if (event.deltaY < 0) {
    // Scroll up: next
    if (currentIndex < pitchPoints.length - 1) {
      currentIndex++;
      renderPitchPoint(currentIndex, 'up');
    }
  } else if (event.deltaY > 0) {
    // Scroll down: previous
    if (currentIndex > 0) {
      currentIndex--;
      renderPitchPoint(currentIndex, 'down');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setBackgroundImage(pitchPoints[currentIndex].src);
  renderPitchPoint(currentIndex);

  window.addEventListener('wheel', handleScroll, { passive: false });
});