import { Schema, model, trusted } from "mongoose";

const bookingSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    }

});

export default model ("Booking", bookingSchema)