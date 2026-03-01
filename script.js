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

  // --------- OpenLayers map initialization ----------
  const mapContainer = document.getElementById('map');
  if(mapContainer && typeof ol !== 'undefined'){
    // create a map with OSM tiles
    const view = new ol.View({
      center: ol.proj.fromLonLat([0,0]),
      zoom: 2
    });

    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: view
    });

    // Example places array
    const places = [
      {name: 'Location A', coords: [51.505, -0.09], note: 'A beautiful park where I relax and read.'},
      {name: 'Location B', coords: [48.8566, 2.3522], note: 'A historic site with rich cultural heritage.'},
      {name: 'Location C', coords: [34.0522, -118.2437], note: 'Coastal area perfect for nature walks.'}
    ];

    const features = places.map(p => {
      const feat = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([p.coords[1], p.coords[0]])),
        name: p.name,
        note: p.note
      });
      return feat;
    });

    const vectorSource = new ol.source.Vector({features});
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    map.addLayer(vectorLayer);

    if(features.length){
      const extent = vectorSource.getExtent();
      view.fit(extent, {padding: [50,50,50,50]});
    }

    // Add simple popups
    const overlayContainer = document.createElement('div');
    overlayContainer.className = 'map-popup';
    const overlay = new ol.Overlay({element: overlayContainer});
    map.addOverlay(overlay);

    map.on('click', function(e){
      map.forEachFeatureAtPixel(e.pixel, function(feat){
        const coords = feat.getGeometry().getCoordinates();
        overlay.setPosition(coords);
        overlayContainer.innerHTML = `<strong>${feat.get('name')}</strong><br>${feat.get('note')}`;
      });
    });

    // clicking list items pans to coordinate
    const placeItems = document.querySelectorAll('.places-list li');
    placeItems.forEach(item => {
      item.addEventListener('click', () => {
        const data = item.dataset.coords;
        if(data){
          const parts = data.split(',').map(parseFloat);
          const lonLat = [parts[1], parts[0]];
          const dest = ol.proj.fromLonLat(lonLat);
          view.animate({center: dest, duration: 800, zoom: 10});
        }
      });
    });
  }
});
