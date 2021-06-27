const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/New',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
}).then(()=>console.log("DB connection successful !!"));
const usersSchema=new mongoose.Schema({
    UserId:{
        type:String,
    },
    Name:{
        type:String,
        
    },
    Password:{
        type:String,
    },
    Gender:{
        type:String,
    },
    DateOfBirth:{
        type:Date,
    },
    Email:{
        type:String,
    },
    MobileNumber:{
        type:Number,
    },
    PinCode:{
        type:Number,
    },
    City:{
        type:String,
    },
    State:{
        type:String,
    },
    Country:{
        type:String
    },

});
const coachesSchema=new mongoose.Schema({
    CoachId:{
        type:String,
    },
    Name:{
        type:String,
    },
    Password:{
        type:String,
    },
    Gender:{
        type:String,
    },
    DateOfBirth:{
        type:Date,
    },
    MobileNumber:{
        type:Number,
    },
    Speciality:{
        type:String,
    },

});
const bookingsSchema=new mongoose.Schema({
    BookingId:{
        type:String,
    },
    UserId:{
        type:String,
    },
    CoachId:{
        type:String,
    },
    AppointmentDate:{
        type:Date,
    },
    Slot:{
        type:String
        
    }
});
const allModels={};

allModels.UserModel=mongoose.model("users",usersSchema);
allModels.CoachModel=mongoose.model("coaches",coachesSchema);
allModels.BookingModel=mongoose.model("booking",bookingsSchema);

module.exports=allModels;