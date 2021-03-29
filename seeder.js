const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({path: './config/config.env'});

//Load models
const Member = require('./models/Member');

//Conect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
 });

 //Read JSON files
 const members = JSON.parse(fs.readFileSync(`${__dirname}/_data/members.json`, 'utf8'));

 //Import into DB
 const importData = async () => {
   try {
       await Member.create(members);
       console.log('Data imported...');
       process.exit();
   } catch (err) {
       console.log(err);
   }  
 }

 //Delete data
 const deleteData = async () => {
    try {
        await Member.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.log(err);
    }  
  }

  if(process.argv[2] === '-i') {
    importData();
  } else if(process.argv[2] === '-d') {
    deleteData();
  }
 