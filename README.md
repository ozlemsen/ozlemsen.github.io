Özlem — Personal Single Page Website

Files:
- index.html
- styles.css
- script.js
- ozlem.jpg (place your portrait image here)

New section 'My Favorite Places' uses OpenLayers to render a map; you can add your own coordinates in `script.js`.  Clicking a location in the list pans the map to that point.

The navigation bar now includes a hamburger menu for mobile screens; tap the ☰ icon to open/close the links.

How to run:
- Open `index.html` in your browser.
- Or run a simple HTTP server and visit http://localhost:8000

Example (PowerShell / Command Prompt):

```powershell
# from the project folder (e:/Egitimler/webGis)
python -m http.server 8000
# then open http://localhost:8000
```

Notes:
- Uses Google Font "Poppins".
- Navigation is fixed; links scroll smoothly to sections.
- Image `ozlem.jpg` should be placed alongside `index.html`.

License: Personal use.
