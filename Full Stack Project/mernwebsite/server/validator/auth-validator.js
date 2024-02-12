const { z } = require("zod");

// creating a object schema

const signupSchema = z.object({
    username:z
    .string({required_error:"Name is Required "})
    .trim()
    .min( 3 ,{message:"Nmae must have atlist tree charecter."})
    .max( 255 ,{message:"Nmae must not be more than 255 charecter."}),

    email:z
    .string({required_error:"email is Required "})
    .trim()
    .email({message:" Invaid email adress"})
    .min( 3 ,{message:"email must have atlist tree charecter."})
    .max( 255 ,{message:"email must not be more than 255 charecter."}),

    phone:z
    .string({required_error:"Phone is Required "})
    .trim()
    .min( 10 ,{message:"phone no must have atlist 10 digit."})
    .max( 20 ,{message:"phone  must not be more than 20 digit."}),

    password:z
    .string({required_error:"password is Required "})
    .trim()
    .min( 7 ,{message:"password must have atlist 7 charecter."})
    .max( 1024 ,{message:"password must not be more than 1024 charecter."}),


});

module.exports= signupSchema;