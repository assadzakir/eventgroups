var express = require('express'),
    app = express();
var firebase = require("firebase");
var notification = require('./notificationService');
var credentials = require('./credentials.js');


app.use(express.static('public/www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

firebase.initializeApp({
    serviceAccount: {
        projectId: credentials.firebaseJson.project_id,
        clientEmail: credentials.firebaseJson.client_email,
        privateKey: credentials.firebaseJson.private_key
    },
    databaseURL: credentials.firebase.databaseURL
});

// API Routes
app.get('/register', function(req, res){
    notification.register(req,res)
});
app.get('/unRegister', function(req, res){
    notification.unRegister(req,res)
});
app.get('/sendPushNotification', function(req, res){
    notification.sendPushNotification(req,res)
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
