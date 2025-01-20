const mongoose =  require("mongoose");

const schema = mongoose.Schema

const vehicleSchema = new schema({
    userLoginId : {type:mongoose.Types.ObjectId,ref:'login_tb'},
    carID : {type:mongoose.Types.ObjectId,ref:'all_vehicle_model_tb'},
    bikeID: {type:mongoose.Types.ObjectId,ref:'all_2wheel_model_tb'},
    autoID: {type:mongoose.Types.ObjectId,ref:'all_3wheel_model_tb'},
    vehicleNumber : {type:String}
})

const vehicleModel = mongoose.model('vehicle_tb',vehicleSchema)
module.exports=vehicleModel
