const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.5oaq6gb.mongodb.net/registrationFormDB`
);

//Registration Schema
const registerationSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//Model Of Registration Schema
const Registration = mongoose.model("Regisration", registerationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/register/registration.html");
});

app.post("/submit", async (req, res) => {
    //check for existing user
    try {
        const { name, email, password } = req.body;

        const existingUser = await Registration.findOne({ email: email });
        if (!existingUser) {
            const registrationData = new Registration({
                name,
                email,
            });

            await registrationData.save();
            res.redirect("/success");
        } else {
            console.log("User Already Exist");
            res.redirect("/error");
        }
    } catch (error) {
        console.log(error);
        res.redirect("error");
    }
});

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/register/success.html");
});
app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/register/error.html");
});

app.post("/register");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
