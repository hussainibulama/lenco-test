const mongoose = require("mongoose");
const app = require("./src/server");
// const rabbitConnect = require("./src/connection/amqp");
const User = require("./src/services/customer/user.model");
const { hashPassword } = require("./src/helpers/password");

mongoose.connect('mongodb://localhost:27017/test', {    
autoIndex: true,
}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {    
    console.log(`Server has started!... and running on port ${PORT}`);
    // rabbitConnect();
  }); },
  err => { 
    /** handle initial connection error */ 
    console.log("error",err);
  }
);
const SeedUser = [
  {
    first_name:"Hussaini",
    last_name:"Bulama",
    email:"hussainibulama@gmail.com",
    username:"hussaini",
    wallet:500,
    password: hashPassword("123456")
  }
]
const SeedDb = async() =>{
  await User.deleteMany({});
  await User.insertMany(SeedUser);
}
SeedDb().then(()=>{
  console.log("seeded");
})