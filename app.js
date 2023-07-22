const express =require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members:[
            {email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
        ]
    };

    // console.log(firstName,lastName,email);

// });

var jsonData = JSON.stringify(data);

var option = {
    url:"https://us21.api.mailchimp.com/3.0/lists/5619798e2d",
    method:"POST",
    headers:{
        "Authorization":"annu 7ce187d46df7a982700ffc26ba4f83f9-us21"

    },
     body:jsonData
};

request(option,function(error,response,body){
    if(error){
        res.sendFile(__dirname + "/failure.html");
    }
    else{
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html");

        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    }
});

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen( process.env.PORT || 3000,function(){
    console.log("Server Started to port 3000");
});








// 7ce187d46df7a982700ffc26ba4f83f9-us21
// 5619798e2d