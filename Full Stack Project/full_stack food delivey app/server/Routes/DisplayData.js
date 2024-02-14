const express = require("express"); 
const router = express.Router();

router.post("/foodData",(req,res)=>{
    try { 
        console.log(global.food_itoms)
        res.send([ global.food_itoms,global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("server error");
        
    }
})


module.exports = router;