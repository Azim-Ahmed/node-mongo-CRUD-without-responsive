const express = require('express')
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const password = "iUc2GrCIl16KUO4R"
const uri = "mongodb+srv://AzimUser:iUc2GrCIl16KUO4R@cluster0.02jxk.mongodb.net/azimuser?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

 
client.connect(err => {
  const userCollection = client.db("azimuser").collection("users");

app.get('/users', (req,res) => {
  userCollection.find({})
  .toArray( (err, documents) => {
    res.send(documents)
  })
})

app.get('/user/:id', (req,res) => {
  userCollection.find({_id : ObjectId(req.params.id)})
  .toArray((err, documents) => {
    res.send(documents[0])
  })
})

  // perform actions on the collection object
  app.post("/addUser", (req, res) => {
    const user = req.body;
userCollection.insertOne(user)
.then(result => {
  console.log("data added successfully");
  res.send("data added")
})
   // console.log(user);
  })
  // const user = {name: "razib", Salary: 2000, quantity : 12}
  // collection.insertOne(user)
  // .then(result => {
  //   console.log("added a user");
  // })
  // console.log("database receieved/Connected");

app.patch('/update/:id', (req,res) => {
  userCollection.updateOne({_id : ObjectId(req.params.id)},
  {
    $set : {price: req.body.price, quantity : req.body.quantity}
  })
  .then(result => {
    console.log(result);
  })
})


app.delete('/delete/:id', (req, res) => {
  userCollection.deleteOne({_id : ObjectId(req.params.id)})
  .then( result =>{
    console.log(result);
  })
})
  
 });

app.listen(3000)