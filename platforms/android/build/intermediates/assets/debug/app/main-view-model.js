var observable = require("data/observable");
var pushPlugin = require("nativescript-push-notifications");

var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");


var tasks = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;


var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    
    function HelloWorldModel() {

        _super.call(this);

        var self = this;
        var registration_id = "";

        var settings = {
            // Android settings
            senderID: '136610234791', // Android: Required setting with the sender/project number 
            notificationCallbackAndroid: function(message) { // Android: Callback to invoke when a new push is received. 
                //alert(JSON.stringify(message));
                tasks.push({ name: "" + JSON.stringify(message) });
            },
     
            // iOS settings 
            badge: true, // Enable setting badge through Push Notification 
            sound: true, // Enable playing a sound 
            alert: true, // Enable creating a alert 
     
            // Callback to invoke, when a push is received on iOS 
            notificationCallbackIOS: function(message) {
                //alert(JSON.stringify(message));
                tasks.push({ name: "" + JSON.stringify(message) });
            }
        };

        pushPlugin.register(settings,
            // Success callback 
            function(token) {
                // if we're on android device we have the onMessageReceived function to subscribe 
                // for push notifications 
                if(pushPlugin.onMessageReceived) {
                    pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
                }
                registration_id = token;
                console.log('Device registered successfully : ' + token);
            },
            // Error Callback 
            function(error){
                alert(error.message);
            }
        );

        pushPlugin.onMessageReceived(function callback(data) {  
            //self.set("message", "" + JSON.stringify(data));
            tasks.push({ name: "" + JSON.stringify(data) });
            //viewModule.getViewById( page, "task" ).dismissSoftInput();
        });


    }
    
    //HelloWorldModel.prototype.tapAction = function () {
    //    console.log('Device registered successfully : ' + this.registration_id);
    //};

    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();