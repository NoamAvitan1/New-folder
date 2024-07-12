const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Noam:Noam159753852@cluster0.1juvzwi.mongodb.net/maoz"
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
