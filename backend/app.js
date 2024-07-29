const express = require("express");
const { connectDB } = require("./src/config/config");
const routes = require("./src/routes/index");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = 3000;

connectDB();

//middlewares
app.use(express.json());
app.use(cors());
//add routes
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});
