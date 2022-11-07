const mongoose= require("mongoose")

const notesScheme= new mongoose.Schema({
    
    heading: String,
    note: String,
    tag: String,
    userId: String
})

const NotesModel= mongoose.model("note",notesScheme)

module.exports= {
    NotesModel
}