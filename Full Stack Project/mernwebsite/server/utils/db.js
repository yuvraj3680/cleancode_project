const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017//mern_admin";

const URI = 
"mongodb+srv://yuvraj123:yuvraj123@cluster0.47m61o9.mongodb.net/find-recipe?retryWrites=true&w=majority";
//const URI = 
       // "mongodb+srv://yuvrajkhilari7625:khilari@123@cluster0.thfg4qy.mongodb.net/mern_admin?retryWrites=true&w=majority";

mongoose.connect(URI);

const connectDb=async()=>{
try{
    await mongoose.connect(URI);
    console.log("database connection sucssesfull")

}catch(error){
    console.error("database connection failed");
    process.exit(0);
}
};

    module.exports=connectDb; 