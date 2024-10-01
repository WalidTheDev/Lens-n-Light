const express = require("express");
const multer = require("multer");
const Cameraman = require("../models/cameraMan");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  
    }
});
const upload = multer({ storage: storage });


router.post("/signup", upload.single('profilePicture'), async (req, res) => {
    const { Name, address, email, phone, password, pricingPerDay } = req.body;

    try {
        // Check if the email is already registered
        const existingCameraman = await Cameraman.findOne({ "contactDetails.email": email });
        if (existingCameraman) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Store profile picture if uploaded
        let profilePictureUrl = "https://via.placeholder.com/150";  // Default placeholder
        if (req.file) {
            profilePictureUrl = req.file.path;  
        }

        // Create a new Cameraman
        const newCameraman = new Cameraman({
            Name,
            address,
            contactDetails: { email, phone },
            password,  // Store plain text password
            pricingPerDay,
            profilePicture: profilePictureUrl  
        });

        // Save the cameraman to the database
        await newCameraman.save();

        res.status(201).json({ message: "Cameraman registered successfully!" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Error in signup", error: error.message });
    }
});

module.exports = router;
