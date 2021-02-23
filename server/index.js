const express = require("express");
const config = require("config");
const bodyParser= require ('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require ("./routes/postRoutes.js")
const PORT =process.env.PORT || config.get("serverPort");
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors());

app.use('/posts',postRoutes )

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useUnifiedTopology:true,
      useFindAndModify: false 
      
    });

    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();



