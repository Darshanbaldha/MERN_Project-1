const mongoose = require("mongoose")
const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log("Database connecter");
})
.catch((err) => {
    console.log("ERROR",err);
})