const mongoose = require('./connection')

///////////////////////////
//Customer Model
///////////////////////////
const {Schema, model} = mongoose


const CharacterSchema = new mongoose.Schema({
    name: String,
    image: String,
    isFunny: Boolean,
    creator: String,
})

const Character = mongoose.model("character", CharacterSchema)

module.exports = Character