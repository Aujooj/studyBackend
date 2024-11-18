import express from "express";

const app = express();
app.listen(3000, () => {
    console.log("Server Listening ...");
});

app.get("/", (req, res) => {
    res.status(200).send("Initial Route");
});