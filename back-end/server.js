// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const Routes = require("./routes/employeeRoutes");

// const app = express();

// app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// app.use("/api/employees", Routes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log("Connected to db, listening to PORT:", process.env.PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });


require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/employees", employeeRoutes);

const url = process.env.MONGO_URI;
const port = process.env.PORT;

const client = new MongoClient(url);

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port:", port);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
