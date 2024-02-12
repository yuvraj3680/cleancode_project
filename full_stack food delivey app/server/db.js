
const mongoose = require("mongoose");
const URI = "mongodb+srv://yuvraj123:yuvraj123@cluster0.47m61o9.mongodb.net/go-food?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connection successful");

        // Fetch data from the "food_itoms" collection
        const fetched_data = await mongoose.connection.db.collection("food_itoms").find({}).toArray();
       // console.log("Fetched data:", fetched_data);

       const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

       //console.log(foodCategory);

        global.food_itoms=fetched_data;
        global.foodCategory=catData;
        //console.log(global.food_itoms)
        


    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit the process with a non-zero exit code to indicate failure
    }
};

module.exports = connectDb;

























   
// try{
//     await mongoose.connect(URI);

//     console.log("database connection sucssesfull")
//     const collection = mongoose.connection.db.collection("food_itoms");
// collection.find({}).toArray(function(err, data) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
//     // Close the connection after fetching data
//     mongoose.connection.close();
// });
// }catch(error){
//     console.error("database connection failed");
//     process.exit(0);
// }
 










//  // const mongoose = require("mongoose");
// // const mongoURI=  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1/Go-good"


// // const mongoDB=()=>{
// //     mongoose.connect(mongoURI,()=>{
// //         console.log("db connected sucssesfully");
// //     });
// // }

// // module.exports= mongoDB;
    

    



     //module.exports=connectDb; 