require("dotenv").config();
const app = require("./src/app.js")

app.listen(3001,(req,res)=>{
    console.log("SERVER HAS STARTED ON PORT 3001");
})