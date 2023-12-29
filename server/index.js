const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const UserModel = require("./models/Users");

const app = express();
dotenv.config();
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const connect = async () =>{
    await mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to DB!");
    }).catch((err)=>{
        throw err;
    });
};

app.get('/',(req,res) => {
    UserModel.find({})
    .then(users =>res.json(users))
    .catch(err =>res.json(err))
})

app.get('/getUser/:id', (req,res) =>{
    const id = req.params.id;
    console.log(id);
    UserModel.findById({_id : id})
    .then(users =>res.json(users))
    .catch(err =>res.json(err))
})

app.post("/createUser", (req,res) =>{
    // console.log(req.body.age)
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name:req.body.name,
        email: req.body.email,
        age : req.body.age

    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.listen(3001,() =>{
    connect();
    console.log("server is running");
})