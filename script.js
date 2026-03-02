console.log("Lets write javascript");
async function getsongs() {
    let songs = [
        "songs/Aage_Peeche.mp3",
        "songs/Abhi_kuch_dino_se.mp3",
        "songs/Dil_ka_jo_haal_he.mp3",
        "songs/Kyon.mp3",
        "songs/Matargashti.mp3",
        "songs/Param_Sundari.mp3",
        "songs/Tera_hone_laga_hu.mp3",
        "songs/Tu_jane_na.mp3",
        "songs/Uff_teri_aada.mp3",
        "songs/Ye_tune_kya_kiya.mp3"
    ];

    return songs;
}
// async function getsongs() {
//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let response = await a.text();
//     console.log(response)
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     let songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href)
//         }
//     }
//     return songs
}
async function main() {

    let songs = await getsongs();
    let audio = new Audio();
    let currentSongIndex = 0;

    if (songs.length > 0) {
        audio.src = songs[0];
    }

    const playBtn = document.getElementById("playBtn");
    const nextBtn = document.getElementById("nextBtn");
    const previousBtn = document.getElementById("previousBtn");
    const playNowBtn = document.querySelector(".playNowBtn");

    // ===== PLAY / PAUSE FUNCTION (Reusable) =====
    async function togglePlay() {
        if (audio.paused) {
            await audio.play();
            playBtn.src = "pause.svg";
        } else {
            audio.pause();
            playBtn.src = "play.svg";
        }
    }

    // Bottom Play Button
    playBtn.addEventListener("click", togglePlay);

    // Sidebar Play Now Button
    playNowBtn.addEventListener("click", togglePlay);

    // NEXT
    nextBtn.addEventListener("click", async () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audio.src = songs[currentSongIndex];
        await audio.play();
        playBtn.src = "pause.svg";
    });

    // PREVIOUS
    previousBtn.addEventListener("click", async () => {
        currentSongIndex =
            (currentSongIndex - 1 + songs.length) % songs.length;
        audio.src = songs[currentSongIndex];
        await audio.play();
        playBtn.src = "pause.svg";
    });

    // Click song from list
    document.querySelectorAll(".songlist li")
        .forEach((song, index) => {
            song.addEventListener("click", async () => {
                currentSongIndex = index;
                audio.src = songs[currentSongIndex];
                await audio.play();
                playBtn.src = "pause.svg";
            });
        });

    // Auto next when song ends
    audio.addEventListener("ended", () => {
        nextBtn.click();
    });

}

main();
// async function main() {
//     let songs = await getsongs()
//     console.log(songs)
//     var audio = new Audio(songs[0]);

//     // audio.play();
//     audio.addEventListener("loadeddata", ()=>{
//         let duration = audio.duration;
//         console.log(audio.duration, audio.currentSrc, audio.currentTime)
//     });
// }

// main()