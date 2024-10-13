class Errorhandler extends Error{
     constructor(message,statuscode){
         super(message);
         this.statuscode=statuscode;
     }
}

export const errormiddleware=(err,req,res,next)=>{
      err.message=err.message || "Internal Server Error !";
      err.statuscode=err.statuscode ||500;
      
       return res.status(400).json({
            success:false,
            message:err.message,
       });
} 
export default Errorhandler; 