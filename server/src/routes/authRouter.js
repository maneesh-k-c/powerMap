const express = require('express');
const userModel = require('../models/userModel');
const loginModel = require('../models/loginModel');
const ownerModel = require('../models/ownerModel');
const stationModel = require('../models/stationModel');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "maneesh.maitexa@gmail.com",
      pass: "ykqo knrf pcsh wrkp",
    },
  });

const authRouter = express.Router();

authRouter.post("/send-otp", async (req, res) => {
    try {
      const { email } = req.body; // Get recipient email from request body
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }
  
      // Generate a random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000);
  
      // Email configuration
      const mailOptions = {
        from: "powermap@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code for rest-password is: ${otp}`,
      };
  
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
          return res.status(500).json({
            success: false,
            message: "Failed to send OTP",
          });
        } else {
          console.log("Email sent: ", info.response);
          return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp, // For debugging, remove in production
          });
        }
      });
    } catch (error) {
      console.error("Internal Server Error: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  authRouter.post("/changePassword", async (req, res) => {
    try {
      const { email,password } = req.body; // Get recipient email from request body
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }
  
     const userEmailFound =  await userModel.findOne({email:email})
     const ownerEmailFound =  await ownerModel.findOne({email:email})

     if(userEmailFound){
        const log = userEmailFound.login_id
        const update = await loginModel.updateOne({_id:log},{$set:{password:password}}) 
        if(update.modifiedCount==1){
            return res.status(200).json({
                success: true,
                message: "password changed",
              });
        }else{
            return res.status(400).json({
                success: false,
                message: "Error ",
              });
        }
     }
     if(ownerEmailFound){
        const log = ownerEmailFound.login_id
        const update = await loginModel.updateOne({_id:log},{$set:{password:password}}) 
        if(update.modifiedCount==1){
            return res.status(200).json({
                success: true,
                message: "password changed",
              });
        }else{
            return res.status(400).json({
                success: false,
                message: "Error ",
              });
        }
     }
  
      
    
      
    } catch (error) {
      console.error("Internal Server Error: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });  

authRouter.post('/userregistration', async (req, res) => {
    try {
        console.log(req.body);

        const oldEmail = await userModel.findOne({ Email: req.body.Email })
        if (oldEmail) return res.status(400).json({ success: false, error: true, message: 'Email id already exists' });

        const oldMobile = await userModel.findOne({ PhoneNumber: req.body.PhoneNumber })
        if (oldMobile) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'mobile number already exists'
            });
        }
        const oldUser = await loginModel.findOne({ username: req.body.Username })
        if (oldUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'User already exists'
            });
        }


        const loginData = {
            username: req.body.Username,
            password: req.body.Password,
            role: 'user',
            status: 'approved'
        }

        const saveLogin = await loginModel(loginData).save()




        const userregisterdata = {
            login_id: saveLogin._id,
            name: req.body.Name,
            email: req.body.Email,
            phoneNumber: req.body.PhoneNumber,
            state: req.body.State,
            district: req.body.District
        };

        const saveUser = await userModel(userregisterdata).save()

        if (saveUser) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Registration Completed',
                data: saveUser
            });
        }
        else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Registration Failed',
                data: error
            });
        }


    } catch (error) {

    }
});

authRouter.post('/deleteuser/:login_id', async (req, res) => {
    try {
        const id = req.params.login_id;

        const userDeleted = await userModel.deleteOne({ login_id: id });
        const loginDeleted = await loginModel.deleteOne({ _id: id });

        if (userDeleted.deletedCount === 1 && loginDeleted.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'User deleted successfully',
            });
        }

        return res.status(400).json({
            success: false,
            error: true,
            message: 'Deletion failed',
        });
    } catch (error) {
        console.error('Error during user deletion:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Something went wrong',
        });
    }
});


authRouter.post('/chargingstationregistration', (req, res) => {
    try {

        const chargingstationdata = {
            Owner_id: req.body.Owner_id,
            StationName: req.body.StationName,
            City: req.body.City,
            ChargingPortsNo: req.body.ChargingPortsNo,
            TypeofConnectors: req.body.TypeofConnectors,
            ChargingPower: req.body.ChargingPower,
            OperatingHours: req.body.OperatingHours,
            ChargingRate: req.body.ChargingRate,
            Address: req.body.Address,
            location_url: req.body.location_url,
            StationStatus: req.body.StationStatus,
        };
        console.log(chargingstationdata);
        stationModel(chargingstationdata).save().then((stationData) => {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Charging station added',
                data: stationData
            });
        }).catch((error) => {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Station addition Failed',
                data: error
            });
        });
    } catch (error) {

    }
});

authRouter.get('/deletestation/:stationid', async (req, res) => {
    try {
        const id = req.params.stationid;
        const deletestation = await stationModel.deleteOne({ _id: id });
        if (deletestation.deletedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'station deleted',
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'station not deleted',
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong',
        });
    }
});

authRouter.post('/updatestation/:stationid', async (req, res) => {
    try {
        console.log('query', req.body);

        const stationid = req.params.stationid
        const oldData = await stationModel.findOne({ _id: stationid })
        console.log(oldData)

        const updateData = {
            Owner_id: oldData.Owner_id,
            StationName: req.body.StationName ? req.body.StationName : oldData.StationName,
            City: req.body.City ? req.body.City : oldData.City,
            ChargingPortsNo: req.body.ChargingPortsNo ? req.body.ChargingPortsNo : oldData.ChargingPortsNo,
            TypeofConnectors: req.body.TypeofConnectors ? req.body.TypeofConnectors : oldData.TypeofConnectors,
            ChargingPower: req.body.ChargingPower ? req.body.ChargingPower : oldData.ChargingPower,
            OperatingHours: req.body.OperatingHours ? req.body.OperatingHours : oldData.OperatingHours,
            ChargingRate: req.body.ChargingRate ? req.body.ChargingRate : oldData.ChargingRate,
            StationStatus: req.body.StationStatus ? req.body.StationStatus : oldData.StationStatus,
            Address: req.body.Address ? req.body.Address : oldData.Address,
        }
        console.log(updateData);
        const saveToModel = await stationModel.updateOne({ _id: stationid }, { $set: updateData })
        console.log(saveToModel);

        if (saveToModel.modifiedCount == 1) {

            return res.status(200).json({
                success: true,
                error: false,
                message: 'station data updated',
                data: saveToModel
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'station data not updated',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Something went wrong',
        });

    }
})

authRouter.post('/ownerregistration', async (req, res) => {
    try {
        console.log(req.body);

        const oldEmail = await ownerModel.findOne({ Email: req.body.Email });
        if (oldEmail) {
            return res.status(400).json({ success: false, error: true, message: 'Email id already exists' });
        }

        const oldMobile = await ownerModel.findOne({ PhoneNumber: req.body.PhoneNumber });
        if (oldMobile) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Mobile number already exists'
            });
        }

        const oldUser = await loginModel.findOne({ username: req.body.Username });
        if (oldUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'User already exists'
            });
        }

        const loginData = {
            username: req.body.Username,
            password: req.body.Password,
            role: 'company',
            status: 'pending'
        };

        const saveLogin = await loginModel(loginData).save();

        const ownerRegisterData = {
            login_id: saveLogin._id,
            companyName: req.body.Name,
            email: req.body.Email,
            phoneNumber: req.body.PhoneNumber,
        };

        const saveOwner = await ownerModel(ownerRegisterData).save();

        if (saveOwner) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Registration Completed',
                data: saveOwner
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Registration Failed'
            });
        }
    } catch (error) {

    }
});


authRouter.post('/deleteowner/:login_id', async (req, res) => {
    try {
        const id = req.params.login_id;

        const ownerDeleted = await ownerModel.deleteOne({ login_id: id });
        const loginDeleted = await loginModel.deleteOne({ _id: id });

        if (ownerDeleted.deletedCount === 1 && loginDeleted.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Owner deleted successfully',
            });
        }

        return res.status(400).json({
            success: false,
            error: true,
            message: 'Deletion failed',
        });
    } catch (error) {
        console.error('Error during deletion:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Something went wrong',
        });
    }
});

authRouter.post('/checklogin', async (req, res) => {
    try {
        const oldUser = await loginModel.findOne({ username: req.body.username })
        if (!oldUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No user exists'
            });
        }
        if (oldUser.password == req.body.password) {
            if (oldUser.status == 'approved') {
                return res.status(200).json({
                    success: false,
                    error: true,
                    data: oldUser
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'waiting for admins approval'
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Wrong password'
            });
        }



    } catch (error) {

    }
});

authRouter.post('/reject_owner/:login_id', async (req, res) => {
    try {
        const { login_id } = req.params;

        const deleteData = await loginModel.deleteOne({ _id: login_id })
        if (deleteData.deletedCount == 1) {
            const deleteOwnerData = await ownerModel.deleteOne({ login_id: login_id })
            return res.status(200).json({ message: 'Data deleted' });
        } else {
            return res.status(400).json({ error: 'Failed' });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
})

authRouter.post('/approve/:login_id', async (req, res) => {
    try {
        const { login_id } = req.params;

        const updateData = await loginModel.updateOne({ _id: login_id }, { $set: { status: 'approved' } })
        if (updateData.modifiedCount == 1) {
            return res.status(200).json({ message: 'Success' });
        } else {
            return res.status(400).json({ error: 'Failed' });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
})

authRouter.get('/all-owners', async (req, res) => {
    try {
        const ownerList = await ownerModel.find().populate('login_id')
        if (ownerList[0]) {
            return res.status(200).json({
                success: true,
                data: ownerList,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No data found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

authRouter.get('/all-users', async (req, res) => {
    try {
        const userList = await userModel.find().populate('login_id')
        if (userList[0]) {
            return res.status(200).json({
                success: true,
                data: userList,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No data found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

authRouter.post('/reject_user/:login_id', async (req, res) => {
    try {
        const { login_id } = req.params;

        const deleteData = await loginModel.deleteOne({ _id: login_id })
        if (deleteData.deletedCount == 1) {
            const deleteOwnerData = await userModel.deleteOne({ login_id: login_id })
            return res.status(200).json({ message: 'Data deleted' });
        } else {
            return res.status(400).json({ error: 'Failed' });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
})

authRouter.get('/getProfile/:id/:role', async (req, res) => {
    try {
        const { id, role } = req.params
        if (role == 'company') {
            const ownerList = await ownerModel.findOne({ login_id: id }).populate('login_id')
            if (ownerList) {
                return res.status(200).json({
                    success: true,
                    data: ownerList,
                });
            }
        } else if (role == 'user') {
            const ownerList = await userModel.findOne({ login_id: id }).populate('login_id')
            if (ownerList) {
                return res.status(200).json({
                    success: true,
                    data: ownerList,
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

authRouter.put('/update_profile/:id', async (req, res) => {
    try {
        const objectId = req.params.id;
        const previousData = await userModel.findOne({ _id: objectId });

        if (!previousData) {
            return res.status(404).json({ Success: false, Message: 'User not found' });
        }

        const updateData = {
            login_id: previousData.login_id,
            name: req.body.Name || previousData.name,
            email: req.body.Email || previousData.email,
            phoneNumber: req.body.PhoneNumber || previousData.phoneNumber,
            state: req.body.State || previousData.state,
            district: req.body.District || previousData.district,
        };

        const Data = await userModel.updateOne({ _id: objectId }, { $set: updateData });

        const updateLogin = {
            username: req.body.Username || previousData.username,
            password: req.body.Password || previousData.password
        };

        await loginModel.updateOne({ _id: previousData.login_id }, { $set: updateLogin });

        if (Data.modifiedCount === 1) {
            return res.status(200).json({
                Success: true,
                Message: 'Profile updated successfully',
            });
        } else {
            return res.status(400).json({
                Success: false,
                Message: 'Failed while updating profile',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Success: false, Message: 'Something went wrong' });
    }
});


module.exports = authRouter;



