exports.validateName=function(name){
    if(name.trim().length>=3 && name.trim().length<=50){
        return true;
    }
    return false;
};
exports.validatePassword=function(password){
    if(password.trim().length>=5 && password.trim().length<=10){
        return true;
    }
    return false;
};
exports.validateAge=function(date){
    var dt=new Date();
    var diff=dt.getTime()-new Date(date).getTime();
    var age=Math.floor(diff/(1000*60*60*24*365.25));
    if(age>=20 && age <=100){
        return true;
    }
    return false;

};
exports.validateGender=function(gender){
    if(gender==='F'||gender==='M'){
        return true;
    }
    return false;
};
exports.validateNumber=function(phone){
    var regex=/^\d{10}$/;
    if(phone.match(regex)){
        return true;
    }
    return false;
};
exports.validateEmail=function(mailId){
    var regex=/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if(mailId.match(regex)){
        return true;
    }
    return false;
};
exports.validatePin=function(pin){
    var regex=/^\d{6}$/;
    if(pin.match(regex)){
        return true;
    }
    return false;
};
exports.validateCity=function(arg){
    if(arg.trim().length>=3 && arg.trim().length<=20){
        return true;
    }
    return false;
};
exports.validateState=function(arg){
    if(arg.trim().length>=3 && arg.trim().length<=20){
        return true;
    }
    return false;
};
exports.validateCountry=function(arg){
    if(arg.trim().length>=3 && arg.trim().length<=20){
        return true;
    }
    return false;
};
