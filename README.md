# Spotify Clone 🎧

A frontend clone of Spotify’s web player, built using HTML, CSS, and JavaScript. This project features a working audio player and dynamically rendered playlists and songs using JSON files. This version is fully compatible with GitHub Pages.

## 🔧 Tech Stack
- HTML5
- CSS3 (Flexbox)
- JavaScript (DOM, Events, Audio API)

## 📱 Features
- Sidebar with user’s library of songs and play buttons
- “Trending Playlists” section displaying albums dynamically
- Audio player with:
  - Play/Pause functionality
  - Live song metadata (title, artist, album cover)
  - Seekbar and duration sync
  - Volume control
- All playlists and song details are loaded using:
  - `albums.json` → for playlist names and folder mapping
  - `info.json` → inside each album folder for song details
- Also works smoothly & quickly when run locally in VS Code — not limited to GitHub Pages.

## 📁 Data Handling
- Not hardcoded in JavaScript — all metadata is fetched from JSON
- Designed to support GitHub Pages which doesn't allow folder inspection
- Song files and covers organized in structured album folders

## 🚫 Limitations
- No backend/API integration
- Not suitable for live folder reading (used JSON instead)
- No authentication, real-time sync, or search functionality

## 🚀 Live Demo
[View Live on GitHub Pages](https://pjha91275.github.io/Spotify-Clone/)

## 🛑 Browser Warning Notice

> ⚠️ **Important:** When you open the live site link, your browser may show a security warning (red background) saying the site is dangerous or deceptive.

This is a **false warning** caused because the project is hosted on **GitHub Pages** and looks visually similar to real websites of Spotify.

To proceed and view the site:

1. On the red warning page, click the **"Details"** button at the bottom.  
2. A new warning page will appear with some text and a red background.  
3. On the last line, you'll see the phrase **“visit this unsafe site”** — only **“this unsafe site”** will be underlined and acts as a clickable link.  
4. Click that underlined text to open the site normally.

## ⚠️ Performance Note

Due to GitHub Pages' static hosting limitations, initial loading may take time:

- The playlist section, library area, and playbar may take **10–15 seconds** to load on first visit.
- Clicking on any playlist card for the first time may take **5–7 seconds** to load the relevant song list and playbar.

🕒 This delay is caused by:
- **Main:** GitHub’s slower file serving, especially for nested folders and assets
- Use of multiple `fetch()` calls inside loops to dynamically load song and playlist data
- Lack of backend/server support for batching or preloading requests
 
✅ However, after this initial load:
- All UI interactions like play, pause, seek, and volume control work **smoothly**
- There is **no noticeable lag during actual usage**

💡 The same project (this GitHub version) runs much faster when cloned and opened locally in VS Code with Live Server.  
For the best performance, you can either:
- 🖥️ Clone/download this repo and run it locally, or  
- ⚡ Try the [Spotify Clone Local Version](https://github.com/pjha91275/Spotify-Clone-Local), which is specially designed to dynamically fetch songs and playlists directly from folders without relying heavily on JSON.

## 📁 Folder Structure
Spotify-Clone/
│
├── index.html
├── favicon.ico
│
├── CSS/
│ ├── style.css
│ └── utility.css
│
├── JS/
│ └── script.js
│
├── SVG/
│ ├── play.svg
│ ├── pause.svg
│ ├── nextsong.svg
│ ├── prevsong.svg
│ ├── ...
│
├── songs/
│ ├── albums.json
│ ├── Arijit_Singh/
│ │ ├── info.json
│ │ ├── cover.jpg
│ │ ├── Apna_Bana_Le.mp3
│ │ ├── ...
│ ├── B_Praak/
│ │ ├── info.json
│ │ ├── cover.jpg
│ │ ├── ...
│ └── ...
│
├── songsThumbnail/
│ ├── Arijit_Singh/
│ │ ├── Apna_Bana_Le.jpeg
│ │ ├── ...
│ ├── B_Praak/
│ │ ├── ...
│ └── ...
│
├── README.md

## 🔗 Related Projects
- 🎧 **[Spotify Clone (VS Code Version)](https://github.com/pjha91275/Spotify-Clone-Local)** – A local-only version that fetches songs and playlists **directly from folders** without using JSON. Works only on `Live Server` or local hosting (not supported on GitHub Pages).

## ✍️ Author
**Prince Jha**
