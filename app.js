const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
  app.post("/",function(req,res){
    //console.log(req.body.cityName);
    //console.log("post request received");
     const query=req.body.cityName;
     const apikey="35dac7d137c436a61d551485e170c53c";
     const unit="metric";
     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
      https.get(url,function(response){
      console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
       console.log(weatherdata);
       const temp=weatherdata.main.temp;
     const weatherdescription=weatherdata.weather[0].description;
       const icon=weatherdata.weather[0].icon;
       const imageURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
       res.write("<p>The weather is currently"+weatherdescription+"<p>");
       res.write("<h1>The temperature in "+query+" is"+ temp +"degree celcius</h1>");
       res.write("<img src="+imageURL+">");
       res.send();
       console.log(temp);
       console.log(weatherdescription);
  });
});
//  res.send("keep it up");
});
app.listen(3000,function(){
  //console.log("running");
});
