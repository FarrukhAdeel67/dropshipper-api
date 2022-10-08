const { Drivers , Parcels} = require("../models");

module.exports = {
  
  createDriver: async (req, res) => {
    try {
      const {user} = req;     
      const {fullName, registrationNumber,make,model,year,licenseImageFrontUrl,licenseImageBackUrl,licenseNumber, drivingMiles,clientsFeedback} = req.body;

      const checkDriver = await Drivers.findOne({
        where: 
        { full_name:fullName?fullName:user.name,
          id: user.id,
        }
      });
      if(checkDriver){
        throw {error: 400, message: "driver already exists."}
      }

      if(!fullName|| ! registrationNumber ||!make||!model||!year||!licenseImageBackUrl||!licenseImageBackUrl||!licenseNumber||!drivingMiles||!clientsFeedback)
      {
        throw {error: 400, message: "Required Fields can not be empty" }
      }    
      const driverProfile = await Drivers.create({
        full_name:fullName?fullName:user.name,
        registration_number:registrationNumber,
        make,
        model,
        year,
        lincense_image_front_url:licenseImageFrontUrl,
        lincense_image_back_url:licenseImageBackUrl,
        license_number:licenseNumber,
        driving_miles:drivingMiles,
        clients_feedback:clientsFeedback,
        fk_user_id:user.id,
        fk_client_id:1
      })
    //  return res.status(200).send({driverProfile});
      return res.status(307).render("driverProfile")
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  allPosts:async (req, res) => {
    try {
      let {user} = req;
      let driver = await Drivers.findOne({
        where:{
          fk_user_id:user.id,
        }});
        let parcels = await Parcels.findAll();
      //return  res.send(parcels)
        return res.status(307).render("driverHomePage",  {parcels} );
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  driverProfile:async (req, res) => {
    try {
      let {user} = req;
      const driver = await Drivers.findOne({
        where: 
        {
          fk_user_id: user.id}
      });
      if(!driver){
        throw {error: 400, message: "wrong profile i.e userId"}
      }
    return res.status(307).render("driverProfile",  {driver} );
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  profilePost:async (req, res) => {
    try {
      return res.send("post")
      } catch (err) {
        console.log(err);
        return res
          .status(err.status || 500)
          .message(err.message || "Something went wrong...");
      }
  },
  profileGet:async (req, res) => {
    try {
    return res.render("profile")
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
};
