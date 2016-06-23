/**
 * Created by Assad zakir on 6/20/2016.
 */
var firebase = require("firebase");

module.exports = {
    register: function(req,res) {

        /*function registerDevice( req, res ) {
            var payload, isPayloadInvalid;

            payload = req.body;

            /!* //check if userID, token is missing or contains an invalid value
             isPayloadInvalid = util.isMissingStrings( res, payload, ['userID', 'token']);
             if ( isPayloadInvalid ) {
             return;
             }*!/

            /!*  //check if device exists in payload as an object
             if ( typeof payload.devices !== 'object' ) {
             res.send({
             statusCode: 0,
             statusDesc: "device property is not an object."
             });

             return;
             }*!/

            //find user with userID
            User.findOne({
                userID: payload.userID,
                token: payload.token
            }, function( err, user ) {
                if ( err ) {
                    res.send({
                        statusCode: 0,
                        statusDesc: "error occurred."
                    });

                } else if ( user ) {

                    //HACK - only new users has devices object in database.
                    user.devices = user.devices || {
                            android : [],
                            iphone : [],
                            windowsPhone : []
                        };

                    //to register an android device
                    if ( typeof payload.devices.android === 'string' ) {

                        addUserDevice('android', payload.devices.android, user, res );

                    }  else {
                        res.send({
                            statusCode: 0,
                            statusDesc: "missing or invalid device."
                        });
                    }
                } else {
                    res.send({
                        statusCode: 0,
                        statusDesc: "invalid credentials."
                    });
                }
            });
        }*/
        //firebase.database().ref('users').on('value', function(snapshot) {
        //    console.log(snapshot.val());
        //    res.send('send')
        //
        //});

    },

    unRegister: function(req,res) {
        res.send('unRegister')
    },
    sendPushNotification: function (req,res) {
        res.send('sendPushNotification')
    }
};
