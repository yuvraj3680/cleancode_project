const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,     
      },
      email: {
        type: String,
        require: true,

      },
      phone: {
        type: String,
        require: true,

      },password: {
        type: String,
        require: true,

      },

      isAdmin:{
            type: Boolean,
            default:false,
      },

});


    // secure the password
     userSchema.pre("save", async function(next){
        // console.log("pre method",this);
        const user=this;

        if(!user.isModified("password"))
        {
          next();
        }
        try {
        const saltRound=await bcrypt.genSalt(10);
        const hash_passworld = await bcrypt.hash(user.password,saltRound);
        user.password=hash_passworld;
          
        } catch (error) {
          next(error);
        }
    });

    // Compare the password

    userSchema.methods.comparePassword= async function(password){
      return  bcrypt.compare(password,this.password)
    }


      // json web Token
      //jwt is an open standerd that defins a compact and self contained way form securly trancefering the 
      //information beetween parties and json object
      //jwt are towo mainly used foe authantication and authorization
      //  authantication mens verifying the identity user and clint
      //  authorization mens what action a user or clint is allowed to perform

      // such as JWTs(json web token),tipycally not store in database along with other users details. insted
      // they are issued by the server during authuntication process and then store the clint side 
      // (eg.coockies and local storage)

      userSchema.methods.generateToken = async function(){

        try {
          return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin: this.isAdmin,
          },
            process.env.JWT_SECRET_KEY,{

              expiresIn: "30",
            }

          )

        } catch (error) {
          console.error(error);
        }

      };





    const User = new mongoose.model("User", userSchema);
    module.exports= User;










// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     require: true,
//   },
//   email: {
//     type: String,
//     require: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
// });

// //? secure the password with the bcrypt
// userSchema.pre("save", async function (next) {
//   // console.log("pre method", this);
//   const user = this;

//   if (!user.isModified("password")) {
//     next();
//   }

//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(user.password, saltRound);
//     user.password = hash_password;
//   } catch (error) {
//     next(error);
//   }
// });

// // compare the password
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// // json web token
// userSchema.methods.generateToken = async function () {
//   try {
//     return jwt.sign(
//       {
//         userId: this._id.toString(),
//         email: this.email,
//         isAdmin: this.isAdmin,
//       },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "30d",
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// // define the model or the collection name
// const User = new mongoose.model("User", userSchema);
// module.exports = User;
