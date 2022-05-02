//instead of sending different html file for each weekend ...like, ...its a sunday, its a monday , its a tuesday ,etc.
//  we will have to create 7 copies of same html file .hence we use ejs


const express=require("express");
const bodyParser = require("body-parser") ;
const res = require("express/lib/response");

const app = express();

const date =require(__dirname+"/date.js");

// const ejs = require("ejs");
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let itemsArray = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.get("/",function(req,res){

   let day = date.getDate();

    res.render('list',{listTitle: day, todoJob:itemsArray});         //it goes to "views" folder directly and then searches for list file..views folder is mandatory name of the folder
});


app.post("/",function(req,res){
    let item=req.body.newItem;
    // console.log(req.body.button1);
    if(req.body.button1==="Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        itemsArray.push(item);
        res.redirect("/");
    }
    
})


app.get("/work",function(req,res){
    res.render('list',{listTitle: "Work List", todoJob:workItems});
})

app.get("/about", function(req,res){
    res.render("about");
})


app.listen(process.env.PORT || 3000  ,function(){
    console.log("server is running at port 3000.");
});
