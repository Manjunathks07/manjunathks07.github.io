// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
});

// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  menu.classList.toggle('active');
}

// Close mobile menu on link click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navMenu').classList.remove('active');
    });
  });
});

// Active Navigation with Scroll Spy
function setActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links li a[href^="#"]');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // Check if we're in this section (with 150px offset from top)
    if (window.pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Update active state for navigation links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// Scroll Progress Bar
function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
}

// Navbar Scroll Effect
let lastScroll = 0;
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}

// Combined scroll event listener
window.addEventListener('scroll', () => {
  setActiveNav();
  updateProgressBar();
  handleNavbarScroll();
});

// Initial calls on page load
window.addEventListener('load', () => {
  setActiveNav();
  updateProgressBar();
});

// Fade in animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
});

// Animate stat numbers
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateNumber = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (target - start) * progress;
      
      // Format the number with one decimal place
      element.textContent = current.toFixed(1) + '+';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final value is exactly the target
        element.textContent = target.toFixed(1) + '+';
      }
    };
    
    requestAnimationFrame(animate);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
});

// Smooth scroll with offset for fixed navbar
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Copy to clipboard function
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}