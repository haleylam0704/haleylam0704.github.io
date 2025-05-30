// == Data for giveaways ==
const giveaways = [
  {
    title: "The Violence Project: How to Stop a Mass Shooting Epidemic by Jillian Peterson and James Densley",
    description: "A deep dive into the psych of mass shootings. Top researchers in this narrow field.",
    status: "available"
  },

  {
    title: "Darkness Visible by William Styron",
    description: "A great memoir about severe depression. Eye-opening.",
    status: "available"
  },

  {
    title: "The Narcissism Epidemic: Living in the Age of Entitlement by Jean M. Twenge and W. Keith Campbell",
    description: "Very informative, even though written almost 20 years ago. Helped me realize my self-centeredness and need for affirmation.",
    status: "available"
  },

  {
    title: "Panzram: Butchering Humanity: An Autobiography by Carl Panzram",
    description: "A serial killer's autobiography. Tried to understand what goes through a serial killer's mind, but he doesn't quite speak of that. Not great imo.",
    status: "available"
  },

  {
    title: "Moral Issues & Christian Responses by Patricia & Shannon Jung",
    description: "Christian Ethics textbook. Pretty good commentaries on controversial issues from diverse perspectives.",
    status: "available"
  },

  {
    title: "Why Nations Fail by Daron Acemoglu and James A. Robinson",
    description: "Nobel winners a couple of months ago. Very dense economics book with a thesis, so it gets repetitive.",
    status: "available"
  },

  {
    title: "Confessions by Saint Augustine",
    description: "A classic autobiography of a Christian saint.",
    status: "available"
  },

  {
    title: "What Nietzsche Really Said by Robert C. Solomon",
    description: "Clears up some of the misconceptions about Nietzsche's philosophy point by point.",
    status: "available"
  },

  {
    title: "Existentialism: Basic Writings by Charles Guignon",
    description: "Textbook for Existentialism (PHI 2303). Didn't really read it.",
    status: "available"
  },

  {
    title: "A Practical Approach to the Study of Form in Music by Peter Spencer & Peter Temko",
    description: "Textbook for Theory V with Dr. Taylor.",
    status: "available"
  },

  {
    title: "Case Studies in Information and Computer Ethics by Richard A. Spinello",
    description: "Haven't read this yet, but not sure I ever will. Skimmed through it and seems interesting though.",
    status: "available"
  },

  {
    title: "The Holy Bible: NIV",
    description: "An extra Bible I've had for a while.",
    status: "available"
  },
];

// == Map initialization (if you have #research-map) ==
function initMap() {
  const map = document.getElementById("research-map");
  if (!map) return;

  const ideas = [
    { title: "AI + Ethics", description: "Exploring safety, bias, and moral limits." },
    { title: "Access", description: "Making therapy affordable and widespread." },
    { title: "Empathy", description: "Can AI recognize and respond to emotions?" },
    { title: "LLMs", description: "Large language models in mental health support." },
    { title: "Therapist Fatigue", description: "Reducing burnout using AI support." },
    { title: "Bias in Data", description: "Understanding where AI can go wrong." }
  ];

  map.innerHTML = "";
  const popup = document.getElementById("node-popup");
  const popupTitle = document.getElementById("popup-title");
  const popupDesc = document.getElementById("popup-desc");

  const centerX = map.offsetWidth / 2;
  const centerY = map.offsetHeight / 2;
  const radius = 140;

  ideas.forEach((idea, i) => {
    const node = document.createElement("div");
    node.className = "node";
    node.textContent = idea.title;
    node.dataset.title = idea.title;
    node.dataset.description = idea.description;

    const angle = (2 * Math.PI * i) / ideas.length;
    const x = centerX + radius * Math.cos(angle) - 50;
    const y = centerY + radius * Math.sin(angle) - 50;

    node.style.left = `${x}px`;
    node.style.top = `${y}px`;

    map.appendChild(node);
  });

  map.addEventListener("click", e => {
    if (e.target.classList.contains("node")) {
      popupTitle.textContent = e.target.dataset.title;
      popupDesc.textContent = e.target.dataset.description;
      popup.classList.remove("hidden");
    }
  });

  popup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
}


function renderGiveawayList() {
  const list = document.getElementById('giveaway-list');
  if (!list) return;
  list.innerHTML = '';

  giveaways.forEach((item, idx) => {
    const parts = item.title.match(/^(.*?)(?:\s+by\s+)(.+)$/);
    const titleOnly  = parts ? parts[1] : item.title;
    const authorOnly = parts ? parts[2] : '';

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="giveaway-entry">
        <span class="giveaway-title">
          ${idx + 1}. 
          <span class="book-title">${titleOnly}</span>
          ${authorOnly ? `<span class="book-author"> by ${authorOnly}</span>` : ""}
          <span class="status ${item.status}">
            ${item.status === 'available' ? 'AVAILABLE' : 'CLAIMED'}
          </span>
        </span>
      </div>
      <p class="giveaway-desc">${item.description}</p>
    `;
    list.appendChild(li);
  });
}

// == Tab switching ==
function initTabs() {
  const buttons = document.querySelectorAll('.tab-button');
  const panes = document.querySelectorAll('.tab-content');

  function switchTab(tabName) {
    // 1) Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-button[data-tab="${tabName}"]`).classList.add('active');

    // 2) Fade out the currently active pane
    const currentPane = document.querySelector('.tab-content.active');
    if (currentPane) {
      currentPane.classList.add('fade-out');
      setTimeout(() => {
        currentPane.classList.remove('active', 'fade-out');
        currentPane.classList.add('hidden');
        
        // 3) Show the selected pane and mark it 'active' with fade-in
        const sel = document.querySelector(`.tab-content[data-tab="${tabName}"]`);
        sel.classList.remove('hidden', 'fade-out');
        sel.classList.add('active');
      }, 300); // shorter transition for better UX
    } else {
      // If no active pane, just show the selected one
      const sel = document.querySelector(`.tab-content[data-tab="${tabName}"]`);
      sel.classList.remove('hidden', 'fade-out');
      sel.classList.add('active');
    }

    // Update URL hash without triggering a page reload
    history.pushState(null, null, `#${tabName}`);
  }

  // Add click event listeners to tab buttons
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      switchTab(button.dataset.tab);
    });
  });

  // Handle URL hash on page load
  window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      switchTab(hash);
    } else {
      // Default to home tab if no hash
      const defaultTab = document.querySelector('.tab-button.active').dataset.tab;
      switchTab(defaultTab);
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      switchTab(hash);
    }
  });
}

// == Kick things off when the DOM is ready ==
window.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderGiveawayList();
  initTabs();

  // Tooltip logic for about-chips
  const tooltip = document.getElementById('global-tooltip');
  document.querySelectorAll('.about-chips li').forEach(li => {
    li.addEventListener('mouseenter', function (e) {
      let content = this.getAttribute('data-tooltip');
      // Special case: add hyperlink for HBR if present
      if (content && content.includes('HBR:')) {
        content = content.replace(
          /HBR: (https?:\/\/[^ )]+)/,
          '<a href="$1" target="_blank" rel="noopener">HBR</a>'
        );
      }
      tooltip.style.whiteSpace = 'normal'; // in case something's overriding it
      tooltip.style.width = 'auto'; // let it grow
      tooltip.style.maxWidth = '440px';
      tooltip.innerHTML = content;
      tooltip.style.display = 'block';
      tooltip.style.opacity = '1';
      // Set offscreen first for accurate measurement
      tooltip.style.left = '0px';
      tooltip.style.top = '0px';
      tooltip.style.position = 'absolute';
      requestAnimationFrame(() => {
        const rect = this.getBoundingClientRect();
        const tipRect = tooltip.getBoundingClientRect();
        let top = rect.top + window.scrollY - tipRect.height - 16;
        let left = rect.left + window.scrollX + rect.width / 2 - tipRect.width / 2;
        // Clamp to viewport
        left = Math.max(8, Math.min(left, window.scrollX + window.innerWidth - tipRect.width - 8));
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      });
    });
    li.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    });
  });

  // --- Dark/Light mode toggle ---
  const modeToggleBtn = document.getElementById("mode-toggle");
  if (modeToggleBtn) {
    modeToggleBtn.addEventListener("click", function () {
      const body = document.body;
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
      }
      updateToggleText();
    });
    // Initial label setup
    updateToggleText();
  }

  // Landing section fade-out and main-content fade-in
  const landing = document.getElementById('landing');
  const mainContent = document.getElementById('main-content');
  const scrollCue = document.querySelector('.landing-scroll-cue');
  function showMainContent() {
    if (landing) landing.classList.add('fade-out');
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.style.opacity = '1';
    }
    setTimeout(() => {
      if (landing) landing.style.display = 'none';
    }, 1300);
  }
  if (landing && mainContent) {
    landing.addEventListener('wheel', showMainContent);
    landing.addEventListener('touchstart', showMainContent);
    if (scrollCue) scrollCue.addEventListener('click', showMainContent);
    setTimeout(() => { landing.classList.add('fade-out'); mainContent.classList.remove('hidden'); }, 6000); // auto-fade after 6s
  }

  // Add glow to main CV button
  const cvBtn = document.querySelector('.cv-button');
  if (cvBtn) cvBtn.classList.add('glow');

  // --- Section fade-in on scroll ---
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-animate');
  });
  function revealSections() {
    document.querySelectorAll('.section-animate').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        section.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealSections);
  revealSections();
});

function updateToggleText() {
  const toggleButton = document.getElementById("mode-toggle");
  if (!toggleButton) return;
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "Light Mode";
  } else {
    toggleButton.textContent = "Dark Mode";
  }
}