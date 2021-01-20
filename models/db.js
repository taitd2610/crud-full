import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/employee_mng";

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
  },
  (error) => {
    if (!error) {
      console.log("MongoDB Connection Succeeded");
    } else {
      console.log("Error in DB connection :" + error);
    }
  }
);

require("./employees.model");
