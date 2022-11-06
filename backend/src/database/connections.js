const mongoose = require("mongoose");

const { BLOG_APP_HOST, BLOG_APP_DATABASE } = process.env;
// const PORT = process.env.PORT || 27017;
const MONGODB = `mongodb://${BLOG_APP_HOST}/${BLOG_APP_DATABASE}`;

const connection = async () => {
  try {
    await mongoose.connect(MONGODB);
    console.log(`Connected to DataBase ${BLOG_APP_DATABASE}`);
  } catch (error) {
    console.error(error);
    throw new Error("No connection to MongoDB server");
  }
};

module.exports = {
  connection,
};
