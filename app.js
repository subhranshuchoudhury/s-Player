var songTitle;
var songSrc;
var finalData;
var audio;
var isPlaying = false;
var lastSongID;
const Mylist = document.querySelector("#myList");
var display = document.querySelector(".display");
const URL = "https://raw.githubusercontent.com/subhranshuchoudhury/jsNotes/main/api/songAPI";
var playBtns = document.querySelectorAll(".playBtn");
var pauseBtns = document.querySelectorAll(".pauseBtn");
const statusDisplay = document.querySelector(".status");


//**************************************************

const getPosts = async () => {

    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Error in fetching JSON data, Contact subhranshuchoudhury");
    }
    const data = await response.json(); // it will wait to resolve.
    return data;

}

getPosts()
    .then(mydata => {
        myFunction(mydata);
    })
    .catch(error => {
        alert(error);

    })

//*************************************************


function myFunction(mydata) {
    // Create an "li" node:
    finalData = mydata;
    for (let i = 0; i < mydata.length; i++) {
        songTitle = mydata[i].title;
        songSrc = mydata[i].src;
        addSongToList(songTitle, songSrc, i);


    }

    activateButtons();
}



function addSongToList(title, src, i) {
    const songList = document.createElement("tr");
    songList.innerHTML = `<td>${i+1}... ${title}</td><td> <button id="${i}" class="playBtn button-80">▶️ PLAY</button> <button class="pauseBtn button-80" onclick="pauseSong(${i})">⏸️ PAUSE</button></td>`;
    Mylist.appendChild(songList);


}

function activateButtons(argument) {
    playBtns = document.querySelectorAll(".playBtn");
    pauseBtns = document.querySelectorAll(".pauseBtn");

    statusDisplay.style.display = "none";
    for (var i = 0; i < playBtns.length; i++) {
        playBtns[i].addEventListener("click", function(e) {
            playSong(finalData[e.target.id], e.target.id);


        })
        pauseBtns[i].style.display = "none"
    }
}



function playSong(songSrcID, ID) {

    if (isPlaying) {
        audio.pause();
        audio = new Audio("" + songSrcID.src + "");
        audio.play();
        display.textContent = `🎧: ${songSrcID.title}`;
    } else {
        audio = new Audio("" + songSrcID.src + "");
        audio.play();
        display.textContent = `🎧: ${songSrcID.title}`;
        isPlaying = true;
    }
    for (let i = 0; i < playBtns.length; i++) {
        if (playBtns[i].style.display == "none" && i != ID) {
            playBtns[i].style.display = "";
            pauseBtns[i].style.display = "none";
        } else if (i == ID) {
            playBtns[i].style.display = "none";
            pauseBtns[i].style.display = "";

        }
    }

}

function pauseSong(btnID) {
    if (!audio.paused) {
        audio.pause();
        pauseBtns[btnID].textContent = "⏯️ CONTINUE";
    } else {
        audio.play();
        pauseBtns[btnID].textContent = "⏸️ PAUSE";
    }
}