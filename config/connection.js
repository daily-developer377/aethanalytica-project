const { MongoClient } = require("mongodb");

let dbConnection
let uri  = "mongodb+srv://nandhusunil:nandhucs377@projectmongo.rv6rt0y.mongodb.net/student?retryWrites=true&w=majority";
module.exports = {connectToDb:(cb) => {
    MongoClient.connect(uri).then((client) =>{
        dbConnection = client.db()
        return cb();
    })
    .catch (err => {
        console.log("error",err);
        return cb(err);
    })
},
getDb:()=> dbConnection
}