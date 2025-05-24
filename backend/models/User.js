import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {

      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      
    },
    image: {
        type: String, // URL or file path
        required:true
    },
    role:{
      type:String,
      enum:["user" , "hotelOwner"],
      default:"user"
    },
    recentSearchedCities:[{type:String , required:true}],

    },{timestamps:true}
);

const User = mongoose.models.user || mongoose.model('User', userSchema);


export default User;