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

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinksEl = document.querySelector('.nav-links');
  if(toggle && navLinksEl){
    toggle.addEventListener('click', () => {
      navLinksEl.classList.toggle('open');
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

  // --------- Leaflet map initialization ----------
  const mapContainer = document.getElementById('map');
  if(mapContainer && typeof L !== 'undefined'){
    // center on Turkey [lat, lon]
    const map = L.map('map').setView([39.0, 35.0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Example places - coordinates in [lat, lon]
    const places = [
      {name: 'Ankara', coords: [39.9334, 32.8597], note: 'Türkiye\'nin <a href="./myPlaces/ankara.html">başkenti</a> ve ikinci büyük şehri.'},
      {name: 'Location B', coords: [41.0082, 28.9784], note: 'Şehrin simgesi: <a href="./myPlaces/istanbul.html">İstanbul ve Boğazı</a>.'},
        {name: 'Antalya', coords: [36.8969, 30.7133], note: 'Deniz-kum-güneş. <a href="./myPlaces/antalya.html">Sahil</a> boyunca yürümeyi seviyorsanız Antalya\'yı gezin.'},
    ];

    places.forEach(p => {
      L.marker(p.coords).addTo(map).bindPopup(`<strong>${p.name}</strong><br>${p.note}`);
    });

    if(places.length){
      const group = L.featureGroup(places.map(p => L.marker(p.coords)));
      map.fitBounds(group.getBounds().pad(0.5));
    }

    // clicking list items pans to coordinate
    const placeItems = document.querySelectorAll('.places-list li');
    placeItems.forEach(item => {
      item.addEventListener('click', () => {
        const data = item.dataset.coords;
        if(data){
          const parts = data.split(',').map(parseFloat);
          map.setView([parts[0], parts[1]], 10, {animate: true});
        }
      });
    });
  }
});
