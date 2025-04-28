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
  ];
  
  function setBackgroundImage(src) {
    let bg = document.querySelector('.bg-image');
    if (!bg) {
      bg = document.createElement('img');
      bg.className = 'bg-image';
      document.body.appendChild(bg);
      bg.src = src;
      bg.style.opacity = 1;
      return;
    }
    if (bg.src.endsWith(src)) return; // Don't change if already set
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.src = src;
      bg.onload = () => {
        bg.style.opacity = 1;
      };
    }, 300);
  }
  
  function renderPitchSections() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    pitchPoints.forEach((point, idx) => {
      const section = document.createElement('section');
      section.className = 'pitch-section';
      section.dataset.index = idx;
  
      const textDiv = document.createElement('div');
      textDiv.className = 'pitch-text';
  
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
  
      section.appendChild(textDiv);
      app.appendChild(section);
    });
  }
  
  let lastScrollY = window.scrollY;

  function onScroll() {
    const sections = document.querySelectorAll('.pitch-section');
    let scrollDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;

    let selectedIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      const textDiv = sections[i].querySelector('.pitch-text');
      const rect = textDiv.getBoundingClientRect();

      if (scrollDown) {
        // If scrolling down, switch when the bottom of the text box reaches the bottom of the viewport
        if (rect.bottom >= 0 && rect.bottom <= window.innerHeight) {
          selectedIndex = i;
          break;
        }
      } else {
        // If scrolling up, switch when the bottom of the text box reaches the top of the viewport
        if (rect.bottom <= 0) {
          selectedIndex = i + 1;
        }
      }
    }

    setBackgroundImage(pitchPoints[selectedIndex].src);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    renderPitchSections();
    setBackgroundImage(pitchPoints[0].src);
    window.addEventListener('scroll', onScroll);
  });