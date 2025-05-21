//GET/API/USER

export const getUserData = async (req, res) => {
  try {
    const { role , recentSearchedCities } = req.user;

    res.status(200).json({
      success: true,
      role,
      recentSearchedCities,
    });
  } catch (error) {
    console.error("Error in getUserData:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Store userRecentsearchcities//


export const storeRecentSearchcities=async(req,res)=>{
   try{
       const {recentSearchedCity}=req.body;
       const user= req.user;
       if(user.recentSearchedCities.length < 3){
         user.recentSearchedCities.push(recentSearchedCity)
       }else{
         user.recentSearchedCities.shift();
          user.recentSearchedCities.push(recentSearchedCity)
       }
      await user.save();
       res.status(200).json({
      success: true,
      message: "City added successfully",
      recentSearchedCities: user.recentSearchedCities,
    });
    }catch(error)
    {
    console.error("Error saving recent city:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

    }
}


