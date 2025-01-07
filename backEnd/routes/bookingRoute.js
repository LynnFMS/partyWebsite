import { json, Router } from "express";
import Booking from "../models/booking.js";

const router = Router();

router.get("/admin/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({
                response: "Availability Not Found"
            });
        }
        res.json({
            response: "Your date has been booked!",
            booking
        });
    } catch (error){
        console.log(error.message)
        res.status(400).json({
            response: error.message
        });
    }
});

//returns inventory
router.get("/admin", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json({
            response: "All Availability",
            bookings
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            response: "Bookings Not Found.",
            error: error.message
        });
    }
});

//Creates New Inventory Item
router.post("/booking", async (req, res) => {
    const { name, email, date, location, item } = req.body
    
    console.log("Received Booking: ", { name, email, date, location, item })
    try {
        const newBooking = new Booking ({
            name,
            email,
            date,
            location,
            item
        });
        const booking = await newBooking.save();
        res.json({
            response: "Your availability has been booked!",
            booking
        });
    } catch (error) { 
        console.log("Booking Error: ", error.message);
        res.status(400).json({
            response: "Booking Not Found.",
            error: error.message
        });
    }
});

//updates existing bookings
router.put("/admin/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, date, location, item } = req.body;
    try {
        const updateBooking = await Booking.findByIdAndUpdate(id, { name, email, date, location, item }, { new: true }); //finds a booking by Id, then updates and saves the new booking

        if(!updateBooking) {
            return res.status(404).json({
                response: "Booking was not found!"
            });
        }
        res.json({
            response: "Booking has been updated!",
            updateBooking
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            response: "Error updating the booking.",
            error: error.message
        });
    }
});

//deletes an Item
router.delete("/admin/:id", async (req, res) => {
    const { id } = req.params;

    try {
    const deleteBooking = await Booking.findByIdAndDelete(id);

    if (!deleteBooking) {
        return res.status(404).json({
            response: "Booking was not found!"
        });
    }
    res.json({
        response: "Booking has been deleted!"
    });
} catch(error) {
    console.log(error.message)
    res.status(400).json({
        response: "Error deleting the booking.",
        error: error.message
    });
}
});

export default router;
