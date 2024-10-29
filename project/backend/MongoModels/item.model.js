
import mongoose from 'mongoose'

const termek = new mongoose.Schema({
    megnevezes:{
        type: String,
        required: true,
    },
    leiras:{
        type: String,
        required: true,
    },
    ar:{
        type: Number,
        required: true,
    },
    img:{
        type: Image,
        required: true,
    },
    elado:{
        type: String,
        required: true,
    },
    kategoria:{
        type: String,
        required: true,
    },
    statusz:{
        type: String,
    }

}) 

const  hirdetes = mongoose.Model("hirdetesek", termek);

export default hirdetes