/**
 * This array of leaderboard users will be used to store initial data into our mongodb
 */
var leaderboard = [
  {
    nickname: 'Serg',
    score: '1000',
  },
  {
    nickname: 'Den',
    score: '800',
  },
  {
    nickname: 'Ron',
    score: '600',
  },
  {
    nickname: 'Alex',
    score: '400',
  },
  {
    nickname: 'Jack',
    score: '200',
  },
  {
    nickname: 'Tom',
    score: '100',
  }
];

var mongodb = require('mongodb');
// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://mongo:27017/leaderboard';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);

    // do some work here with the database.
    collection = db.collection('leaderboard');
    collection.insert(leaderboard, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "leaderboard" collection. The documents inserted with "_id" are:', result.length, result);
      }

      // Close connection
      db.close();
    })
  }
});

var http = require('http');
var url = require('url');
var fs = require('fs');
var ROOT_DIR = "src/";
var port = 4000;

function getLeaderboardFromDb (donOnSuccess) {
  MongoClient.connect(dbUrl, function (err, db) {

    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {

      // Get the documents collection
      var collection = db.collection('leaderboard');

      // Get all leaderboard from mongodb
      collection.find({}).toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
          donOnSuccess(result)
        } else {
          console.log('No document(s) found with defined "find" criteria!');
        }
        // Close connection
        db.close();
      });
    }
  });
}

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);

  if (urlObj.pathname === '/leaderboard') {

    /**
     * TODO: return leaderboard data stored in mongodb
     */

    getLeaderboardFromDb(function (data) {
      res.writeHead(200)
      res.end(JSON.stringify(data))
    })

  } else {

    /**
     * Here is where we return all requests for files in our 'src' directory
     */
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }

}).listen(port);

console.log('app is now running on port: ' + port)

