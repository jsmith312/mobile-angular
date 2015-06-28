angular.module('starter.controllers', [])
 
.controller('AppCtrl', function() {})
 
.controller('DeviceCtrl', function($ionicPlatform, $scope, $cordovaDevice) {
    $ionicPlatform.ready(function() {
        $scope.$apply(function() {
            // sometimes binding does not work! :/
 
            // getting device infor from $cordovaDevice
            var device = $cordovaDevice.getDevice();
 
            $scope.manufacturer = device.manufacturer;
            $scope.model = device.model;
            $scope.platform = device.platform;
            $scope.uuid = device.uuid;
 
        });
 
    });
})

.controller('BatteryCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaBatteryStatus) {
 
    $ionicPlatform.ready(function() {
 
        // This code never worked on my Samsung Note III
        /*$rootScope.$on('$cordovaBatteryStatus:status', function(result) {
            $scope.$apply(function() {
                // sometimes binding does not work! :/
 
                $scope.batteryLevel = result.level; // (0 - 100)
                $scope.isPluggedIn = result.isPlugged; // bool
            });
        });*/
 
        // But this code works!!
        $scope.onBatteryStatus = function(result) {
             $scope.batteryLevel = result.level; // (0 - 100)
             $scope.isPluggedIn = result.isPlugged; // bool
        }
 
        if (!$rootScope.batteryEvtAttached) {
        //     // prevent from registering multiple times
        //     // Ideally needs to be added in .run()
        //     // This is for the sake of example
 
            window.addEventListener('batterystatus', $scope.onBatteryStatus, false);
            $rootScope.batteryEvtAttached = true;
        }
    });
})

.controller('CameraCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaCamera) {
    $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $scope.takePicture = function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log(err);
            });
        }
 
    });
})

.controller('NotificationsCtrl', function($ionicPlatform, $scope, $cordovaLocalNotification) {
    $ionicPlatform.ready(function() {
 
        $scope.notify = function() {
            $cordovaLocalNotification.add({
                id: 'welcome_notif',
                title: "This is a local notification",
                text: 'Notification text'
            }).then(function() {
                console.log('notification fired');
            });
        };
 
 
    });
})

.controller('NetworkCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaNetwork) {
    $ionicPlatform.ready(function() {
 
        $scope.type = $cordovaNetwork.getNetwork()
        $scope.isOnline = $cordovaNetwork.isOnline()
        $scope.isOffline = $cordovaNetwork.isOffline()
 
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
            console.log('The device has come online!', networkState);
            // Sync local data to your server here
        });
 
        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
            console.log('The device has gone offline!', networkState);
            // the device is offline, we need to store the data locally
        });
 
    });
})

.controller('ShareCtrl', function($ionicPlatform, $scope, $cordovaSocialSharing) {
    $ionicPlatform.ready(function() {
 
        var message = 'This is a demo message';
        var subject = 'This is a demo message';
        var link = 'http://somerandom.link/image.png'; // fake image
 
        $scope.nativeShare = function() {
            $cordovaSocialSharing
                .share(message, subject, link); // Share via native share sheet
        };
 
        //checkout http://ngcordova.com/docs/plugins/socialSharing/
        // for other sharing options
    });
})