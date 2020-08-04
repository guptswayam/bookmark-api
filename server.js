let dotenv= require("dotenv");
dotenv.config({
    path: "./config.env"
});
let mongoose= require("mongoose");

const DB= process.env.DATABASE_URL.replace("<password>",process.env.DATABASE_PASSWORD).replace("<dbname>",process.env.DATABASE_NAME);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Established");
})
.catch((err)=>{
    console.log(err);
})


let app= require("./app");


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("server started at port 5000");
})