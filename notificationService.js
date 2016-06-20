/**
 * Created by Assad zakir on 6/20/2016.
 */
var firebase = require("firebase");

module.exports = {
    register: function(req,res) {
        firebase.database().ref('users').on('value', function(snapshot) {
            console.log(snapshot.val());
            res.send('send')

        });

    },

    unRegister: function(req,res) {
        res.send('unRegister')
    },
    sendPushNotification: function (req,res) {
        res.send('sendPushNotification')
    }
};
