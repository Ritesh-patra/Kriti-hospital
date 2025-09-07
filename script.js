// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile menu if open
    closeMobileMenu();
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector("nav");

  if (window.scrollY > 100) {
    navbar.classList.add("bg-white/95", "backdrop-blur-md", "shadow-lg");
  } else {
    navbar.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-lg");
  }

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 500) {
    backToTop.classList.remove("opacity-0", "invisible");
    backToTop.classList.add("opacity-100", "visible");
  } else {
    backToTop.classList.add("opacity-0", "invisible");
    backToTop.classList.remove("opacity-100", "visible");
  }
});

// Back to top functionality
document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.remove("active");
  hamburger.classList.remove("active");
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
  .forEach((el) => {
    observer.observe(el);
  });

// Counter animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 200;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + "+";
  }, 10);
}

// Counter observer
const counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute("data-target"));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter);
});

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Simple form validation
  const inputs = this.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("border-red-500");
    } else {
      input.classList.remove("border-red-500");
    }
  });

  if (isValid) {
    // Simulate form submission
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Booking...';
    button.disabled = true;

    setTimeout(() => {
      alert("Appointment booked successfully! We will contact you soon.");
      this.reset();
      button.innerHTML = originalText;
      button.disabled = false;
    }, 2000);
  } else {
    alert("Please fill in all required fields.");
  }
});

// Add loading animation to page
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Parallax effect for hero section
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const parallax = document.querySelector('#home');
//     const speed = scrolled * 0.1;

//     if (parallax) {
//         parallax.style.transform = `translateY(${speed}px)`;
//     }
// });

// Service card hover effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add ripple effect to buttons
document.querySelectorAll(".btn-hover").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

//whatsaap button
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Form ko page reload hone se rokta hai

  // Input values lete hain
  const name = document.querySelector('input[type="text"]').value;
  const phone = document.querySelector('input[type="tel"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const service = document.querySelector("select").value;
  const date = document.querySelector('input[type="date"]').value;
  const time = document.querySelectorAll("select")[1].value;
  const message = document.querySelector("textarea").value;

  // WhatsApp message format
  const whatsappMessage =
    `Hello,%0A%0A` +
    `*New Appointment Booking*%0A` +
    `--------------------%0A` +
    `👤 Name: ${name}%0A` +
    `📞 Phone: ${phone}%0A` +
    `📧 Email: ${email}%0A` +
    `💊 Service: ${service}%0A` +
    `📅 Date: ${date}%0A` +
    `⏰ Time: ${time}%0A` +
    `📝 Message:%0A${message}`;

  // WhatsApp API link
  const whatsappURL = `https://wa.me/9348148310?text=${whatsappMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappURL, "_blank");
});
