const MainModel=require('../Model/Schema');
const validators=require('../Utilities/validator');
const id=require('../Utilities/helper');
exports.postUsers=async(req,res)=>{
    try{
        const userId=await id.generateUserId();
        if(validators.validateName(req.body.Name)){
            const users=await MainModel.UserModel.create({
                UserId:userId,
                Name:req.body.Name,
                Password:req.body.Password,
                Gender:req.body.Gender,
                DateOfBirth:req.body.DateOfBirth,
                Email:req.body.Email,
                MobileNumber:req.body.MobileNumber,
                PinCode:req.body.PinCode,
                City:req.body.City,
                State:req.body.State,
                Country:req.body.Country

            });
        res.status(201).json({
            status:"success",
            message:"UI0000",
        }) 

        }
        else{
            res.status(400).json({
                message:"Name should have minimum three and maximum fifty characters"
            })
        }
        

    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.errmsg,
        })

    }
};
exports.postCoaches=async(req,res)=>{
    try{
        console.log(req.body);
        const coachId=await id.generateCoachId();
        if(validators.validateName(req.body.Name)){
            const users=await MainModel.CoachModel.create({
                CoachId:coachId,
                Name:req.body.Name,
                Password:req.body.Password,
                Gender:req.body.Gender,
                DateOfBirth:req.body.DateOfBirth,
                MobileNumber:req.body.MobileNumber,
                Speciality:req.body.Speciality

            });
        res.status(201).json({
            status:"success",
            message:"CI0000",
        }) 

        }
        else{
            res.status(400).json({
                message:"Name should have minimum three and maximum fifty characters"
            })
        }
        

    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.errmsg,
        })

    }
};
exports.postLogin=async (req,res)=>{
    try {
        const notes = await MainModel.UserModel.findOne(
          {  $and: [
            { 'UserId' : req.body.UserId },
            { 'Password':  req.body.Password }
          ] },
        );
        if (notes != null) {
          res.status(200).json({
            status: 'success',
          });
        } else {
          res.status(400).json({
              message:"Incorrect UserId or Password",
            
          });
        }
      } catch (err) {
        res.status(404).json({
          status: 'fail',
          message: err,
        });
      }
    
};
exports.postCoachLogin=async (req,res)=>{
    try {
        const notes = await MainModel.CoachModel.findOne(
          {  $and: [
            { 'CoachId' : req.body.CoachId },
            { 'Password':  req.body.Password }
          ] },
        );
        if (notes != null) {
          res.status(200).json({
            status: 'success',
          });
        } else {
          res.status(400).json({
              message:"Incorrect CoachId or Password",
            
          });
        }
      } catch (err) {
        res.status(404).json({
          status: 'fail',
          message: err,
        });
      }
    
};
exports.getAll=async(req,res)=>{
    try{
        const coaches = await MainModel.CoachModel.find({}, { _id: 0, __v: 0 });
        if(coaches.length>0){
            res.status(200).send(coaches);
        }

    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err,
        })
    }
}
exports.getCoaches=async(req,res)=>{
    try{
        const coach = await MainModel.CoachModel.findOne(
            { 
              'CoachId' : req.params.coachId
             },
          );
          if (coach != null) {
            res.status(201).send(coach);
          } else {
            res.status(400).json({
                message:"CoachId doesnot exist",
              
            });
          }


    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err,
        })
    }

};
exports.getUsers=async(req,res)=>{
    try{
        const user = await MainModel.UserModel.findOne(
            { 
              'UserId' : req.params.userId
             },
          );
          if (user != null) {
            res.status(201).send(user);
          } else {
            res.status(400).json({
                message:"Userid doesnot exist",
              
            });
          }


    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err,
        })
    }

};
exports.postAll=async(req,res)=>{
    try{
        req.body.UserId=req.params.userId;
        req.body.CoachId=req.params.coachId;
        console.log(req.body);
        const user = await MainModel.UserModel.findOne(
            { 
              'UserId' : req.params.userId
             },
          );
          if (user != null) {
            const coach = await MainModel.CoachModel.findOne(
                { 
                  'CoachId' : req.params.coachId
                 },
              );
              if(coach!=null){
                const booking=await MainModel.BookingModel.create(req.body);
                res.status(201).json({
                    status:"success",
                    message:"successfully persisted"
                })
                  
              }
              else{
                  res.status(400).json({
                      message:"coachId didn't exist"
                  })
              }
            }
           else {
            res.status(400).json({
                message:"Userid doesnot exist",
              
            });
          }
        }catch(err){
            res.status(404).json({
                status:"fail",
                message:err,
            })

        }
    };
    exports.confirmBooking=async(req,res)=>{
        try{
            const booking=await MainModel.BookingModel.findOneAndUpdate(
                {BookingId:req.params.bookingId},
                req.body,
                {
                    new:true,
                    runValidators:true
                }
            );
            console.log(booking)
            if(booking!=null){
                res.status(200).send("true");
            }
            else{
                res.status(400).json({
                    message:"BookingID doesn't exist"
                })
            }

        }catch(err){
            res.status(404).json({
                status:"fail",
                message:err
            })
        }

    }
    exports.deleteBooking=async(req,res)=>{
        try{
            const del=await MainModel.BookingModel.deleteOne({BookingId:req.params.bookingId});
            if(del.deletedCount===0){
                res.status(400).json({
                    message:"could not delete this appointment",
                })
            }
            else{
                res.status(200).send("true");
            }

        }catch(err){
            res.status(404).json({
                status:"fail",
                message:err
            })
        }
    };
    exports.getCoach=async(req,res)=>{
        try{
            const user = await MainModel.BookingModel.findOne(
                { 
                  'CoachId' : req.params.coachId
                 },
              );
              if (user != null) {
                res.status(201).send(user);
              } else {
                res.status(400).json({
                    message:"CoachId doesnot exist",
                  
                });
              }
    
    
        }catch(err){
            res.status(404).json({
                status:"fail",
                message:err,
            })
        }
    

    };
    exports.getUser=async(req,res)=>{
        try{
            const user = await MainModel.BookingModel.findOne(
                { 
                  'UserId' : req.params.userId
                 },
              );
              if (user != null) {
                res.status(201).send(user);
              } else {
                res.status(400).json({
                    message:"UserId doesnot exist",
                  
                });
              }
    
    
        }catch(err){
            res.status(404).json({
                status:"fail",
                message:err,
            })
        }
    

    };
    exports.invalid = async (req, res) => {
        res.status(404).json({
          status: 'fail',
          message: 'Invalid path',
        });
      };
exports.default=async(req,res,next)=>{
    let err=new Error();
    err.message="Invalid"

}
