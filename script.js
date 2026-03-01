// script.js - small interactions for single page app
// - Smooth scroll is handled with CSS; this file adds active nav highlighting
// - Handles "Learn More About Me" button

// Wait for DOM
document.addEventListener('DOMContentLoaded', function(){
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main > section');
  const learnBtn = document.getElementById('learn-btn');

  // Scroll to hobbies when button clicked
  if(learnBtn){
    learnBtn.addEventListener('click', () => {
      const target = document.getElementById('hobbies');
      if(target){ target.scrollIntoView({behavior: 'smooth', block: 'start'}); }
    });
  }

  // Use IntersectionObserver to toggle active nav link
  const observerOpts = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  }, observerOpts);

  sections.forEach(section => observer.observe(section));

  // Smooth scroll for nav links (fallback)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Let default anchor behavior occur (CSS smooth handles it). Close mobile nav if implemented.
    });
  });
});
