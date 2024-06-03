// This is the STARTING FILE, START READING FROM HERE

// Here we will make an API which performs user authentication and stores data on MongoDB
// What This API Does : Firstly you will have to do "sign-up" (if you are a first time user) or "sign-in" if u already
// have an account.
// We have a "Collection" that stores a list of "Users" (with their email, username and password)
// During sign-up you are asked for "username", "email", "password" , then we check if user with this email is already
// present in database or not, if already present we throw error.. 
// else we create a new user in our database's "User" collection..
// And generate a "token" which will store data of "email" and " _id " of this user (You will know what " _id " is later..)

// In case of "sign-in" we ask for "email" and "password" only ... we check in DB if someone with same email is there in our DB or not..
// If no one there... then error user not found..
// else We check whether the password provided is correct or not, if password is correct we again generate a "token"
// AND NOW! This new "token" will be the actual "token"

// If you sign-in multiple times with the same credentials... new token is generated each time....
// In real life apps, these tokens are changed every 1 hr for security reasons... The user doesn't even know and internally
// these tokens are changed... otherwise someone else will get hold of your token and all your access XD

// Now, all the things I explained above is handled by a router..  "localhost:5000/user/bla-bla" , by doing "/user" you will be
// routed to that router file   "  const userRouter= require("./Routes/userRoutes")  "          // This code is written
// below to route to that folder..

// (Go through the code of userRouter and userController)
// After token generation is completed  ...
// we use the "localhost:5000/note" to access notes... "See the Model folder, where we have notes.js"  it has the notes schema,
// u will get a better idea what each note comprise of
// So after we got the "token" we will insert that token in the header... open "postman", select "header" , enter key: "Authorization",
// and value as  "Bearer YOUR_TOKEN"            
// and then do a "get" Request at "localhost:5000/note"  ... It will show you all the notes of the person having token -> YOUR_TOKEN
// Now go through code of "noteRouter" and "noteController"


// Both "sign-up" and "sign-in" is handled via "router" ....  If u type "localhost:5000/user" u will be routed to
// the page where signin and signup function is present 


const express = require("express")                  // to import express
const app= express()

const userRouter= require("./src/Routes/userRoutes")        // In "Routes/userRoutes" file we are exporting "userRouter"...
                                                        // and we are importing it here in this file to use :)
const notesRouter= require("./src/Routes/notesRoutes")
const mongoose = require("mongoose")        // importing "Mongo-DB"

const cors = require("cors")


// For making and using "environment-variables"         // We made a ".env" file to set environment-variables
const dotenv= require("dotenv")             // Just like BUILD-variant!!!! We want our app to hit different
dotenv.config()                         // API's and different databases for "production code" and "development code"
                                        // to do so we create ".env" file... and we will have different variants of each
                                        // variable for production and development code  there...



app.use(express.json())             // When a client (e.g., a web browser or a 
                                    // mobile app) sends data to an Express server using a POST or PUT request, the data
                                    // is typically included in the request body as JSON. By using express.json(), the server
                                    // can automatically parse this JSON data and make it available in the req.body object for further processing.

app.use(cors())

// For understanding purpose : LETS ASSUME SERVER IS LISTENING ON PORT_NUMBER : 5000

app.use("/", (req, res)=>{                              // When user enters just  :  "localhost:5000"   he will get this msg :)
    res.json({message: "Hello, CIAO ADIOS!!!"})
})


app.get("/quote", (req,res) =>{              // When user enters just  :  "localhost:5000/quote"   he will get this msg :)
    res.send("This is quotes endpoint :)")
})


app.use("/user", userRouter)            // When user enters : "localhost:5000/user/bla_bla_bla" ..
                                        //  he will be redirected to "userRoutes" folder.. Go and see it ... all cases where
                                        // user types 5000/user/... are handled there... Its a router :) we can't handle the case of
                                        // user typing everything in this one folder right? so to make it easy we are using routers :)
app.use("/note", notesRouter)           // same as above...




const PORT = process.env.PORT || 5000           // For Port number on which our server will "listen"... if port Number is
                                                // "null" it will take "5000" by default..
const HOST= process.env.HOST || '0.0.0.0'

const password = encodeURIComponent(process.env.PASSWORD);

const mongoUrl = process.env.MONGO_DB_URL;
console.log('MongoDB URL:', mongoUrl);

console.log(process.env.MONGO_DB_URL)

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
  app.listen(PORT, HOST, () => {
    console.log("Server is running on port and host " + PORT + " " + HOST);
  }) 
})
.catch((err) => {
  console.log(err);
})


