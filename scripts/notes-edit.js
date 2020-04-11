'use strict'

const removeElement = document.querySelector('#remove-note')
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const timeElement = document.querySelector('#date')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('index.html')
}

timeElement.textContent = generateLastEdited(note.updatedAt)

titleElement.value = note.title
titleElement.addEventListener('input', (e) => {
    //console.log(e.target.value)
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    timeElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})
bodyElement.value = note.body
bodyElement.addEventListener('input',(e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    timeElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', () => {
    console.log(noteId)
    removeNote(noteId)
    saveNotes(notes)
    location.assign('index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)

        note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign('index.html')
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
    }
})
