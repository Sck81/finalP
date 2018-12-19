//dependencies-core modules
var express=require('express');
var app= express();

var http=require('http');
const mysql=require('mysql');

//process.env.PORT || 5000
const port = process.env.PORT || 5000;
var server= app.listen(port,function(){
    console.log("Server started on heuroku")
});


//setup sql connection
const con = mysql.createConnection({
    host:"us-cdbr-iron-east-01.cleardb.net",
    user:"b0f34851335f6f",
    password: "6917348c",
    database: "heroku_2d03868d61ad242"
});

//run our engine
app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));

var obj = {};
app.get('/',function(req,res){   
    con.query("SELECT * FROM classes WHERE ClassID !=''", function(err,result){
        if (err){
            console.log("ERROR");
            return;
        }
        res.render("final",{items:result});
        //console.log(result[0].ClassID);
        
    });
   
});
app.get('/final2',function(req,res){   
    con.query("SELECT * FROM classes", function(err,result){
        if (err){
            console.log("ERROR");
            return;
        }
        res.render("final2",{items:result});
    });
    
});
//write review
app.get('/review',function(req,res){   
    con.query("SELECT * FROM classes", function(err,result){
        if (err){
            console.log("ERROR");
            return;
        }
        res.render("final5");
    });
    
});

//comments page
app.get('/final4/:ligma',function(req,res){  
    var urlarr= req.params.ligma;
    //console.log(urlarr); 

    var sql = "SELECT * FROM comments WHERE ProfessorID=?";
    con.query(sql,urlarr, function(err,result){
        if (err){
            console.log("ERROR");
            return;
        }
        res.render("final4",{items:result});
    });
    
});

///<%= item.ClassID %>
app.get('/:ligma',function(req,res){  
    var urlarr= req.params.ligma;

    var sql = "SELECT * FROM prof WHERE ClassID =?";
    con.query(sql,urlarr, function(err,result){
        if (err){
            console.log("ERROR");
            return;
        }
        res.render("final3",{items:result});
    });
    
});



