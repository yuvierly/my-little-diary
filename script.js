let entries =
JSON.parse(localStorage.getItem("journalEntries")) || [];

let currentIndex = 0;

let selectedCover = "pink";

/* COVER FUNCTIONS */

function selectCover(type) {

selectedCover = type;

document.body.className = type;

}

function openBook() {

document.getElementById("cover").style.display = "none";

document.getElementById("diary").style.display = "block";

}

/* MODAL */

const modal =
document.getElementById("entryModal");

document
.getElementById("newEntryBtn")
.onclick = () => {

modal.style.display = "block";

};

document
.getElementById("saveEntryBtn")
.onclick = () => {

const title =
document.getElementById("titleInput").value;

const mood =
document.getElementById("moodInput").value;

const text =
document.getElementById("textInput").value;

const font =
document.getElementById("fontSelect").value;

const color =
document.getElementById("colorSelect").value;

const date =
new Date().toLocaleDateString();

const entry = {

title,
mood,
text,
font,
color,
date

};

entries.push(entry);

localStorage.setItem(
"journalEntries",
JSON.stringify(entries)
);

modal.style.display = "none";

currentIndex =
entries.length - 1;

displayEntry();

};

/* DISPLAY ENTRY */

function displayEntry() {

if (entries.length === 0) return;

const entry =
entries[currentIndex];

document.getElementById(
"titleDisplay"
).innerText =
entry.title;

document.getElementById(
"dateDisplay"
).innerText =
entry.date;

document.getElementById(
"moodDisplay"
).innerText =
entry.mood;

const textEl =
document.getElementById("textDisplay");

textEl.innerText =
entry.text;

textEl.style.fontFamily =
entry.font;

textEl.style.color =
entry.color;

}

/* NAVIGATION */

document
.getElementById("prevBtn")
.onclick = () => {

if (currentIndex > 0) {

currentIndex--;

displayEntry();

}

};

document
.getElementById("nextBtn")
.onclick = () => {

if (currentIndex < entries.length - 1) {

currentIndex++;

displayEntry();

}

};

/* LOAD FIRST ENTRY */

displayEntry();
