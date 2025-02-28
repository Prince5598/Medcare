const express = require('express');
const bodyParser = require('body-parser');
const loginDb = require('./Model/loginDb');
const AppointmentDb = require('./Model/AppointmentDb');
const doctor = require("./Model/doctor");
const multer = require('multer');
const { Readable } = require('stream');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash')
var methodOverride = require('method-override');


mongoose.connect('mongodb_url');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'Prince',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false
}));

app.use(flash());

const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect("/profile");
    }
}

app.get("/dashboard",requireLogin,(req, res) => {
    res.render("dashboard.ejs");
})
app.get("/login",(req,res)=>{
    res.render("login.ejs", { email: req.flash('email'), ExistEmail: req.flash('ExistEmail'), password: req.flash('password'), messages: req.flash() });
})
app.get("/profile", (req, res) => {
    res.redirect("/login");
});
app.get("/form", (req, res) => {
    res.render("form.ejs");
})

app.get("/doctors", async(req, res) => { 
    try {
        const result = await doctor.find();
        res.render("doctor.ejs",{content:result});
    } catch (error) {
        
    }
})
app.get("/appointment", async (req, res) => {
    try {
        const result = await AppointmentDb.find();
        // console.log(result);
        res.render("appointment.ejs", { content: result });
    } catch (error) {
        res.send("An error occurred.");
    }
})
//Handling user logout 
app.get("/logout", function (req, res) {
     
    res.redirect('/profile'); 
});



app.get("/Appointmenthistory/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await loginDb.findById(id);
        // console.log(result);
        res.render("tmp.ejs", { content: result });
    } catch (error) {
        res.send("An error occurred.");
    }
})



app.post("/form", upload.single('image'),async (req, res) => {
    try {
        const formdata = {
            fname: req.body.first_name,
            lname: req.body.last_name,
            email: req.body.email,
            Specialization: req.body.specialization,
            contact: req.body.contact,
            Gender: req.body.gender,
            url: {
                "image.data": req.file.buffer,
                "image.contentType": req.file.mimetype,
                linkedin:req.body.linkedin,
                facebook: req.body.facebook,
                insta: req.body.instagram,
                twitter: req.body.twitter
            }
        }
        console.log(req.file.buffer);
        const result = new doctor(formdata);
        await result.save();
        res.redirect("/form");
    } catch (error) {
        res.send("An error occurred.");
    }
})

app.get("/Allimage", async(req,res) => {
    try{
        const result = await doctor.find({});
        res.render("alldoctors.ejs",{result});
    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/image/:id', async (req, res) => {
    try {
        const image = await doctor.findById(req.params.id);
        const imageStream = new Readable();
        imageStream.push(image.url.image.data);
        imageStream.push(null);
        res.set('Content-Type', image.url.image.contentType);
        imageStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/Appointmentform/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result1 = await loginDb.findById(id);
        const result = await doctor.find({});
        const appointmentData = {
            name: req.body.fname + req.body.lname,
            Address: req.body.Address,
            contact: req.body.contact,
            Age: req.body.age,
            doctor: req.body.doctor,
            email: req.body.email,
            appointmentDate: req.body.date,
            appointmentTime: req.body.time,
            username: result1.username
        };
        console.log(appointmentData);
        result1.appointments.push(appointmentData);
        await result1.save();
        const NewAppointment = new AppointmentDb(appointmentData);
        await NewAppointment.save();
        res.render("home.ejs", { content: result1,result});

    } catch (error) {
        res.send("An error occurred.");
    }
})


app.post("/login/exist", async (req, res) => {
    try {
        const emailfind = await loginDb.findOne({ email: req.body.ExistEmail });

        if (emailfind == null) {
            req.flash('error', 'Email does not Exist! please sign up');
            res.redirect('/profile');
        } else {
            req.session.user = emailfind;
            const result = await doctor.find({});

            if (emailfind.password == req.body.Existpass) {
                if(req.body.ExistEmail == "prince123@gmail.com" && req.body.Existpass == "Prince"){
                    res.redirect("/dashboard");
                } else {
                    // Pass result to the view
                    res.render("home.ejs", { content: emailfind, result });
                }
            } else {
                req.flash('error', 'wrong password');
                req.flash('ExistEmail', req.body.ExistEmail);
                res.redirect("/profile");
            }
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred.");
    }
})


app.get("/editform/:id", async(req,res) => {
    try {
       const id = req.params.id; 
       const result = await doctor.findById(id);
       res.render("editform.ejs",{content : result});
    } catch (error) {
        res.send("An error occurred.");
    }
})

app.patch("/Updateform/:id", upload.single('image'),async (req, res) => {
    try {
        const id = req.params.id;

        // Check if a new image is uploaded
        let imageData = {};
        if (req.file) {
            // If a new image is uploaded, update the image data
            imageData = {
                "url.image.data": req.file.buffer,
                "url.image.contentType": req.file.mimetype
            };
        }

        // Construct the updates object including both image data and other fields
        const updates = {
            fname: req.body.first_name,
            lname: req.body.last_name,
            Specialization: req.body.specialization,
            contact: req.body.contact,
            email: req.body.email,
            ...imageData, // Include image data conditionally
            "url.insta": req.body.instagram,
            "url.facebook": req.body.facebook,
            "url.twitter": req.body.twitter,
            "url.linkedin": req.body.linkedin,
            Gender: req.body.gender
        };
        
        const result = await doctor.findByIdAndUpdate(id, updates, { runValidators: true, new: true });
        res.redirect("/doctors");
    } catch (error) {
        res.send("An error occurred.");
    }
});

app.get("/deleteform/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const result = await doctor.findByIdAndDelete(id);
        res.redirect("/doctors");
    } catch (error) {
        res.send("An error occurred.");
    }
})

app.post("/login/new", async (req, res) => {
    try {

        const emailfind = await loginDb.find({ email: req.body.email });
        const userfind = await loginDb.find({ username: req.body.username });
        if (emailfind.length !== 0) {
            req.flash('error', 'email already Exist!');
            res.redirect('/profile');
        }
        else if (userfind.length !== 0) {
            req.flash('error', 'UserName Already Taken!');
            req.flash('email', req.body.email);
            res.redirect('/profile');
        }
        else {

            const result = new loginDb(req.body);
            req.session.user = result;
            await result.save();
            req.flash('success', 'SuccessFully Sign Up');
            res.redirect('/profile')
        }
    }
    catch (error) {
        console.error(error);
        res.send("An error occurred.");
    }
})
 
app.listen(port, () => {
    console.log("Running on port 3000");
})
