let currentSong = new Audio();
let songs;
let currSongFolder;
let currThumbnailFolder;

const basePath = window.location.pathname.split("/")[1] ? `/${window.location.pathname.split("/")[1]}` : "";

function formatSecondsToMinutes(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const formattedMins = String(mins).padStart(2, "0");
  const formattedSecs = String(secs).padStart(2, "0");

  return `${formattedMins}:${formattedSecs}`;
}

async function createSongListItem(song, currSongFolder) {
      return new Promise((resolve) => {
        let audio = new Audio(
          `${basePath}/${currSongFolder}/${song}`
        );
        audio.addEventListener("loadedmetadata", () => {
          let li = document.createElement("li");
          li.innerHTML = `<img class ="thumbnail" src = "${basePath}/${currThumbnailFolder}/${song
            .replace(".mp3", "")}.jpeg" alt = "">
                <div class="info">
                  <div class = "song">${song.replace(".mp3", "").replaceAll("_", " ")}</div>
                  <div class = "artist">${currSongFolder
                    .replace("songs/", "").replaceAll("_", " ")
                    }</div>
                </div>
                <div class="durationPlay">
                  <div class="duration">${formatSecondsToMinutes(
                    Math.floor(audio.duration || 0)
                  )}</div>
                  <img class = "invert play-Library" src = "SVG/play.svg" alt = "">
                </div>`;

          //Attach an event listener to each song
          li.addEventListener("click", (element) => {
            const songName = li.querySelector(".info .song").innerText.replaceAll(" ", "_");
            playMusic(songName + ".mp3");
          });

          resolve(li);
        });
      });
    }

async function getSongs(folder) {
  currSongFolder = folder;
  currThumbnailFolder = folder.replace("songs", "songsThumbnail");
  let res = await fetch(`${basePath}/${folder}/info.json`);
  let data = await res.json();
  songs = data.songs;
  let songUL = document.querySelector(".songList ul");
  songUL.innerHTML = "";
  for (let song of songs) {
    const li = await createSongListItem(song, currSongFolder);
    songUL.appendChild(li);
  }
  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = `${basePath}/${currSongFolder}/${track}` ;
  if (!pause) {
    currentSong.play();
    play.src = "SVG/pause.svg";
  }

  document.querySelector(
    ".songThumbnail"
  ).innerHTML = `<img src = "${basePath}/${currThumbnailFolder}/${track.replace(
    ".mp3",
    ""
  )}.jpeg" alt = ""></img>`;
  document.querySelector(".songName").innerHTML = decodeURI(track).replace(
    ".mp3",
    ""
  ).replaceAll("_", " ");
  document.querySelector(".songTime").innerHTML = "0:0/0:0";
};


async function displayAlbums() {
  let res = await fetch(`${basePath}/songs/albums.json`);
  let data = await res.json();
  let folders = data.folders;

  let albumContainer = document.querySelector(".cardContainer");
  albumContainer.innerHTML = "";

  for (const folder of folders) {
    // Fetch info.json inside each album folder
    let infoRes = await fetch(`${basePath}/songs/${folder}/info.json`);
    let info = await infoRes.json();

    albumContainer.innerHTML += `
      <div data-folder="${folder}" class="card">
         <div class="play-cardCase">
                <div class ="play-card">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="black" >
                 <polygon points="8,5 8,19 19,12" />
                 </svg>
                 </div>
          </div>
        <img src ="${basePath}/songs/${folder}/cover.jpeg" alt="">
        <h2>${info.title}</h2>
        <p>${info.description}</p>
      </div>`;
  }

  // load the playlist when card is clicked
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async () => {
      songs = await getSongs(`songs/${e.dataset.folder}`);
      playMusic(songs[0]);
    });
  });
}



async function main() {
  //Get the list of all songs
  await getSongs("songs/Arijit_Singh");
  playMusic(songs[0], true);

  //Display the albums on the page
  displayAlbums();

  // listen for timeupdate event
  currentSong.addEventListener("timeupdate", () => {
    var currentTime = Math.floor(currentSong.currentTime);
    var duration = Math.floor(currentSong.duration || 0);
    document.querySelector(".songTime").innerHTML = `${formatSecondsToMinutes(
      currentTime
    )} / ${formatSecondsToMinutes(duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";

    //Auto start next song when one ends & play the playlist in loop
    if (currentSong.ended) {
      let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
      if (index + 1 < songs.length) {
        playMusic(songs[index + 1]);
      } else {
        playMusic(songs[0]);
      }
    }
  });

  //add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });
}

main();

//add event listener for hamburger
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
});

//add event listener for close
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-120%";
});

//Attach an event listener to play to play & pause song
play.addEventListener("click", () => {
  if (currentSong.paused) {
    currentSong.play();
    play.src = "SVG/pause.svg";
  } else {
    currentSong.pause();
    play.src = "SVG/play.svg";
  }
});

//add event listener to previous & repeat even after the playlist comes to start point
previous.addEventListener("click", () => {
  currentSong.pause();
  let index = songs.indexOf(
    currentSong.src.split("/").slice(-1)[0]
  );
  if (index - 1 >= 0) {
    playMusic(songs[index - 1]);
  } else {
    playMusic(songs[songs.length - 1]);
  }
});

//add event listener to next & repeat even after the playlist ends
next.addEventListener("click", () => {
  currentSong.pause();
  let index = songs.indexOf(
    currentSong.src.split("/").slice(-1)[0]
  );
  if (index + 1 < songs.length) {
    playMusic(songs[index + 1]);
  } else {
    playMusic(songs[0]);
  }
});

//add an event to volume range bar
document
  .querySelector(".range")
  .getElementsByTagName("input")[0]
  .addEventListener("change", (e) => {
    console.log("Setting volume to", e.target.value);
    currentSong.volume = parseInt(e.target.value) / 100;
    if (currentSong.volume == 0) {
      document.querySelector(".volume > img").src = "SVG/mute.svg";
    } else if (currentSong.volume > 0 && currentSong.volume <= 0.5) {
      document.querySelector(".volume > img").src = "SVG/lowVolume.svg";
    } else {
      document.querySelector(".volume > img").src = "SVG/highVolume.svg";
    }
  });

//add 2 event listeners to mute, decrease, or increase the volume by clicking on volume button
document.querySelector(".volume > img").addEventListener("click", (e) => {
  if (e.target.src.includes("SVG/mute.svg")) {
    e.target.src = "SVG/lowVolume.svg";
    currentSong.volume = 0.5;
    document
      .querySelector(".range")
      .getElementsByTagName("input")[0].value = 50;
  } else if (e.target.src.includes("SVG/lowVolume.svg")) {
    e.target.src = "SVG/highVolume.svg";
    currentSong.volume = 1;
    console.log(currentSong.volume);
    document
      .querySelector(".range")
      .getElementsByTagName("input")[0].value = 100;
  } else {
    e.target.src = "SVG/mute.svg";
    currentSong.volume = 0;
    console.log(currentSong.volume);
    document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
  }
});
