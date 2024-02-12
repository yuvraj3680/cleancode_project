const express = require ("express");
const { connect } = require("mongoose");
const connectDb = require("./db");
const app=express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


connectDb();

const port = 5000;

app.get("/",(req,res)=>{
    res.send("Hellow word");
})
app.use(express.json());
app.use("/api",require("./Routes/CreateUser"));
app.use("/api",require("./Routes/DisplayData"));
app.use("/api",require("./Routes/OrderData"));

app.listen(port,()=>{
    console.log(`lisning in ${port} no`)
})