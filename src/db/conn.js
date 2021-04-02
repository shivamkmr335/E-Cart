const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/FormRegister",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('connection to mongoDB successfull');
}).catch((e)=>{
    console.log(`no connection`);
})