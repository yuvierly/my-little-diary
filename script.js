let entries = JSON.parse(
localStorage.getItem("journalEntries")
) || [];

let currentIndex = 0;

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

const date =
new Date().toLocaleDateString();

const entry = {

title,
mood,
text,
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

document.getElementById(
"textDisplay"
).innerText =
entry.text;

}

displayEntry();
