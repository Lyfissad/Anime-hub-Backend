import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import signUpRoute from "./Routes/SignUp.js";
import loginRoute from "./Routes/Login.js";
import anilistRoute from "./Api/Anilist.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is working, mate!");
});

app.use("/api", signUpRoute);
app.use("/api", loginRoute);
app.use("/api", anilistRoute);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
