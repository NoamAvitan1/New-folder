const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
     "mongodburi"
    );
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

module.exports = {
  connectDB,
};
