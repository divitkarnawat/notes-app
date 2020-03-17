const validator = require('validator')
const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')
const log = console.log
const notesUtils = require('./notes.js')
// fs.writeFileSync('name of file', 'data')
//console.log(validator.isEmail('divdddit@iitr.ac.in'))

// Create command to add note
yargs.command({
    command:    'add',
    describe:   'add a note',
    builder:    {
        title:  {   type:   'string',
                    demandOption:   true
        },
        body:   {   type:   'string',
                    demandOption:   true
        }
    },
    handler:    function(argv){
        notesUtils.addNote(argv.title,argv.body)
    }
})

// Create command to remove note
yargs.command({
    command:    'remove',
    describe:   'remove note',
    builder:    {
        title:  { type: 'string',
                  demandOption: true  
        }
    },
    handler:    function(argv){
        notesUtils.removeNote(argv.title)
    }
})

// create command to read note
yargs.command({
    command:    'read',
    describe:   'read a note',
    builder:    {
        title:  {
                    type:   'string',
                    demandOption: true
        }
    },
    handler:    function(argv){
        notesUtils.readNote(argv.title)
    }
})

// create command to list all the notes
yargs.command({
    command:    'list',
    describe:   'list all notes',
    handler:    function(){
        notesUtils.listNotes()
    }
})

yargs.parse()