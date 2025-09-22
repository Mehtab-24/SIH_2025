
require('dotenv').config();
const express = require('express');
const cron = require('./cron/remainder');
const mongoose = require('mongoose');
const cors = require('cors');
const reminderJob = require('./cron/remainder');
const port = 8000; 
const mongo_Url = "mongodb+srv://krtyaka14_db_user:6BtmwcwlvKf6uylv@cluster0.00zy9rp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
//Middle ware
app.use(cors());
app.use(express.json());
//DataBase
mongoose.connect(mongo_Url).then(()=>{
    console.log("DataBase connected sucessfully");
}).catch(err=>{
    console.log(err);
})

reminderJob();

//Routes
app.use('/user',require('./routes/userAuth'));
app.use('/health',require('./routes/healthRecord'));
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

