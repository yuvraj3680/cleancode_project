const errormiddleware = (err,req,res,next)=>{

    const status = err.status || 500;
    const message = err.message || "Backend error";
    const extraDetails = err.extraDetails || "error from Backend";

    return res.status(status).json({message , extraDetails})

};


module.exports = errormiddleware;