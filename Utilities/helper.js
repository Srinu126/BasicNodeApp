const MainModel=require('../Model/Schema');
exports.generateUserId=async()=>{
    var ct="UI-000";
    var count=await  MainModel.UserModel.find();
    var len=count.length;
    var id=ct+len;
    return id;
};
exports.generateCoachId=async()=>{
    var ct="CI-000";
    var count=await  MainModel.CoachModel.find();
    var len=count.length;
    var id=ct+len;
    return id;
};
