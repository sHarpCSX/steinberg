const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(3000);
