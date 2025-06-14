const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv=require("dotenv");


dotenv.config()
app.use(cors());
app.use(express.json()); 
const mongouri="mongodb+srv://Vikramdb:Vikram1636@cluster0.unuid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  email:String,
  password:String
});

const User = mongoose.model("User", UserSchema);

app.post("/api/saveData", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving data" });
  }
});
app.get("/api/getData",async (req,res)=>{
  try{
  const user= await User.find()
  res.json(user);
  }catch(error){
    res.status(400).json({message:"Error Fetching data"});
  }
})
app.listen(5000, () => console.log("Server running on port 5000"));