const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        FNAME: fname,
        LNAME: lname,
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/bf444f19bf";
  const options = {
    method: "POST",
    auth: "pruthvi:4b4f3d6dd0d7aed9f9f2e8b4c929e7ed-us12",
  };

  const apiRequest = https.request(url, options, (response) => {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  apiRequest.write(jsonData);
  apiRequest.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.post("/success", (req, res) => {
  res.redirect("/");
});


app.listen(3000, ()=>{
  console.log("Server Listening on Port 3000");
})

// 4b4f3d6dd0d7aed9f9f2e8b4c929e7ed-us12