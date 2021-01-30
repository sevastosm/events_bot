const database  = require('../firebase')


const addUser = ()=>{
 return   database.ref('users/').push({
        username: "user_nam544445",
        email: "email",
        profile_picture : "imageUrl"
      }, function(error) {
        if (error) {
          // The write failed...
        } else {
          // Data saved successfully!
          console.log("Data saved successfully!")
        }
      });

}

module.exports = addUser