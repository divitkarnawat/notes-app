const fs = require('fs')
const chalk = require('chalk')

//Adding a note
const addNote = function(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) => note.title === title)
    if(!duplicateNotes){
        notes.push({
            title:  title,
            body:   body
        })
        saveNote(notes)
        console.log(chalk.green('New note added'))
    }
    else{
        console.log(chalk.red('note with title exists'))
    }

    
}

//Removing a note
const removeNote = function(title){
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)
    if(notes.length > newNotes.length)
    {
        saveNote(newNotes)
        console.log(chalk.yellow('Note removed: ' + title))
    }
    else{
        console.log(chalk.bgRed.white('No note found'))
    }
    
    
}

//List all notes
const listNotes = function(){
    console.log(chalk.bold.greenBright.bgWhite('Your Notes:'))
    const notes = loadNotes()
    if(notes.length !== 0){
    notes.forEach((note) => {
        console.log('Title: ' + note.title)     
    })
    }
    else{
        console.log('No notes found')
    }

}
// Read a note
const readNote = function(title){
    const notes = loadNotes()
    const readNotes = notes.find((note) => note.title === title)
    if(!readNotes)
    {
        console.log('no such note found')
    }
    else
    {
        console.log('Title: ' + title + '\nBody: ' + readNotes.body)
    }
}



const saveNote = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesJSON)
}

const loadNotes = () => {
    try{
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON = notesBuffer.toString()
        const notes = JSON.parse(notesJSON)
        return notes
    }
    catch(err)
    {
        return []
    }
}
module.exports = {
    addNote:    addNote, 
    removeNote: removeNote,
    listNotes:  listNotes,
    readNote:   readNote
}