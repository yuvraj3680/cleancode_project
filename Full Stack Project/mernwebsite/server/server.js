require("dotenv").config();
const express = require("express");
const errormiddleware = require("./middlewares/error-middleware");
const authRoute=require("./router/auth-router");
const cors = require("cors")
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");

const app = express();

const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    Credentials:true,
};
app.use(cors(corsOptions));





//const app = express();
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);

app.use(errormiddleware);


connectDb().then(()=>{
    app.listen(5000,()=>{
        console.log("lisning the 5000");
    });
});





