import mongoose from 'mongoose';

const artistProfileScheme = mongoose.Schema({
    _id: {
        type : String,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    firstName:{
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    stageName: {
        type : String,
        required : true
    },
    career: {
        type : String,
        required : true
    },
    genre: {
        type : String,
        required : true
    },
    birthday: {
        type : String,
        required : true
    },
    music: {
        type : String,
        required : true
    },
    about: {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
})


export const ArtistProfileModel = mongoose.model('ArtistProfile', artistProfileScheme)