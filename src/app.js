const express= require("express");
const app=express();
const path=require("path");
const hbs= require("hbs");


const port=process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register")
});

app.get("/login",(req,res)=>{
    res.render("login") 
});

app.post("/login", async (req,res)=>{
    try {
        const email=req.body.email;
        const thispassword= req.body.password;

        const useremail=await Register.findOne({email});
        console.log(useremail);

        if(useremail.password === thispassword){
            res.status(201).render("index");
        }else{
            res.send("Password are not matching");
        }

    } catch (error) {
        res.status(400).send("This is a problem");
        console.log(error);
    }
});

app.post("/register", async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password === cpassword){
            const registreEmployee=new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                age: req.body.age,
                password: req.body.password, 
                confirmpassword: req.body.confirmpassword
            })
            const registered= await registreEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching");
        }
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});