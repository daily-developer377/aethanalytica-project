require("dotenv").config();
let express = require("express");
let app = express();
let path = require("path");
const routes = require("./routes/rout");

const db = require("./config/connection");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", routes);
// app.get("/",(req,res) =>{
//     res.render("modal.ejs");
// });

db.connectToDb((err) => {
  if (err) {
    console.log("DataBase error", err);
  } else {
    console.log("Database connected");
  }
});

app.listen("8080", () => {
  console.log("Started");
});
