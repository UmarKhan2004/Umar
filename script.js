let currentSong = new Audio();
let songs;
let currFolder;
function formatTime(seconds) {
    const totalSeconds = Math.floor(seconds); // remove milliseconds
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const paddedSecs = secs.toString().padStart(2, '0');
    return `${mins}:${paddedSecs}`;
}


async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}`)[1])
        }
    }
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = " "
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                             <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Harry</div>
                            </div>
                            <span class="playnow">Play Now</span>
                            <img class="invert" src="play.svg" alt=""></li>`
        //attach an eventlistner with each song

        Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            })

        })
    }
return songs
}
const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track
    currentSong.play
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }


    document.querySelector(".songs-info").innerHTML = track.replaceAll("%20", " ")
    document.querySelector(".songs-time").innerHTML = "00:00/00:00"
}
async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".card-container");
    let array=Array.from(anchors) 
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0];
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let response = await a.json();
            console.log(response)
            cardContainer.innerHTML = cardContainer.innerHTML + `
                <div data-folder="${folder}" class="card">
                    <div class="play-button">
                        <div class="play-icon"></div>
                    </div>
                    <img src="songs/${folder}/cover.jpg" alt="Album Cover">
                    <h3>${response.artist}</h3>
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>

                </div>`
        }
    }
    
}

async function main() {
    //Get list of all the songs
    await getSongs("songs/music")
    playMusic(songs[0], true)
    //show all the songs in the playlist
    await displayAlbums();

    //Attach an event listener to play,previous and next
    let playBtn = document.getElementById("play")
    playBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg"
        }
        else {
            currentSong.pause();
            play.src = "play.svg"

        }
    })
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songs-time").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"

    })
    //Attach an eventlistener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
    //Attach an eventlistener to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0
    })
    //Attach an eventlistener to close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })
    //Attach an eventlistener to next and 
    let next = document.getElementById("next")
    next.addEventListener("click", () => {
        console.log("Next is clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })
    // previous button
    let previous = document.getElementById("previous")
    previous.addEventListener("click", () => {
        console.log("previous is clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })
    //Add an eventlistener to volume seekbar
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("setting volume to", e.target.value)
        currentSong.volume = parseInt(e.target.value) / 100
    })
    //Load the library when someone clicks on the card
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            const folder = e.dataset.folder; // get the folder name
            songs = await getSongs(`songs/${folder}`);
            playMusic(songs[0]);
        });
    });
    //Add an eventlistener to the volume button to mute
    document.querySelector(".volume").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg","mute.svg");
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
            currentSong.volume = 0;
        }
        else {
            currentSong.volume = .10;
            e.target.src = e.target.src.replace("mute.svg","volume.svg");
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    })
}
main();


