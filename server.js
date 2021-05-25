const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const { response } = require("express");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
    
    
})
app.post("/",function(req,res){
    const query=req.body.city;
    const key="a92b99e9f29b7ba36b08f5a0dcbe65d5";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?"+
    "q="+query+"&appid="+key+"&units="+units;
    https.get(url,function(response){
            console.log(response.statusCode);
            response.on("data",function(data){
                    const wd=JSON.parse(data);
                    const temp=wd.main.temp;
                    const wdes=wd.weather[0].description;
                    const icon=wd.weather[0].icon;
                    const imageURL='http://openweathermap.org/img/wn/' + icon + '@2x.png';
                    res.write("<h1>City Name:"+query+"</h1>");
                    res.write("<p>Tempreature:"+temp+"<p>");
                    res.write("<p>Weather description:"+wdes+"<p>");
                    res.write("<img src="+imageURL+">");
                    res.send();
                  
            })
    })

   
})
app.listen(3000,function(){
   console.log("Server Started");
});