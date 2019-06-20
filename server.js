const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;
const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/assets',express.static('assets'));
app.set('view engine', 'ejs');


/*app.use('/assets/css', function(req, res, next){
    console.log(req.url);
    next();
});*/

app.use('/upload', router);
app.get('/profil', router);

app.listen(port, function() {
    console.log("Server running on port", port);
});




// Connect to mongo
/*mongo.connect('mongodb://127.0.0.1/chatdb', function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function(socket){
        let chat = db.collection('chats');
        let user = db.collection('users');

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({name: name, message: message}, function(){
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
});*/