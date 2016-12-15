angular.module('app.controllers', [])
  /*.constant('ApiEndpoint',{
   url: 'http://localhost:8100/api/'
   })*/

  .controller('pageCtrl', function ($scope, $ionicPopup, $cordovaGeolocation, $ionicModal, $location, $stateParams, $timeout, $ionicLoading, $http, ionicMaterialInk, ionicMaterialMotion) {
    $scope.data = {};

    ionicMaterialInk.displayEffect();


    $scope.getData = function () {
      $http({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/login/',
        data: {
          'username': $scope.data.name,
          'password': $scope.data.pass
        }
      }).then(function successCallback(response) {
        if (response.data.includes("username")) {
          alert("error");

        }

        else alert("success");
        console.log(response);
        //checkuser
        $scope.openModal(1);
        // Set Header
        $scope.isExpanded = false;

        // Set Motion
        $timeout(function () {
          ionicMaterialMotion.slideUp({
            selector: '.slide-up'
          });
        }, 300);

        $timeout(function () {
          ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
          });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
      }, function (response) {

        alert("error" + $scope.data.name);
      });
    }

    $scope.get = function () {
      /*$http({
       method:'get',
       url: ApiEndpoint.url='index/api/welcome',
       }).then(function successCallback(response){
       console.log(response.data);

       });*/
      $http({
        method: 'get',
        url: 'http://127.0.0.1:8000/index/api/welcome',
      }).then(function successCallback(response) {
        console.log(response.data);
      });

    }
    $ionicModal.fromTemplateUrl('my-modal.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.oModal1 = modal;
    });
    $ionicModal.fromTemplateUrl('my-modal2.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.oModal2 = modal;
    });
    $ionicModal.fromTemplateUrl('my-modal3.html', {
      id: '3', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function (modal) {

      $scope.oModal3 = modal;
    });
    $ionicModal.fromTemplateUrl('my-modal4.html', {
      id: '4', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function (modal) {

      $scope.oModal4 = modal;
    });
    $ionicModal.fromTemplateUrl('my-modal5.html', {
      id: '5', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function (modal) {

      $scope.oModal5 = modal;
    });
    $ionicModal.fromTemplateUrl('my-modal6.html', {
      id: '6', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function (modal) {

      $scope.oModal6 = modal;
    });

    $scope.openModal = function (index) {
      if (index == 1) {
        $scope.oModal1.show();
      }
      else {
        if (index == 2) {
          $scope.oModal2.show();
        }
        else {
          if (index == 3) {
            $scope.oModal3.show();
          }
          else {
            if (index == 4) {
              $scope.oModal4.show();
            }
            else {
              if (index == 5) {
                $scope.oModal5.show();
              }
              else {
                if (index == 6) {

                  $scope.oModal6.show();
                }
                }
              }
            }
          }
        }
      }
      $scope.closeModal = function (index) {
        if (index == 1) $scope.oModal1.hide();
        else {
          if (index == 2) {
            $scope.oModal2.hide();
          }

          else {
            if (index == 3) {
              $scope.oModal3.hide();
            }
            else {
              if (index == 4) {
                $scope.oModal4.hide();
              }
              else {
                if (index == 5) {
                  $scope.oModal5.hide();
                }
                else {
                  if (index == 6) {

                    $scope.oModal6.hide();
                  }
                }
              }
            }
          }
        }
      }
      //LogIn with Django
      $scope.logIn = function () {

        $scope.getData();

      }
      $scope.go = function (path) {
        $ionicLoading.show({
          template: '<div class="icon ion-loading-a"></div> Please wait while we load the map'

        });
        $timeout(function () {
          $scope.closeModal(1);
          $location.path(path);
          $ionicLoading.hide();

        }, 2000);

      };


      /*$scope.createGroup=function(){
       createGroups.AddGroupToDB($scope.group);
       }*/

      $scope.displayMap = function () {

        $ionicLoading.show({
          template: '<div class="icon ion-loading-a"></div> Please wait while we load the map'
        });
        $timeout(function () {
          $ionicLoading.hide();

        }, 2000);

        $scope.openModal(5);
        $scope.ShowMap();
      }


      var ref = new Firebase("https://locator-b8762.firebaseio.com/users");
      var grp = new Firebase("https://locator-b8762.firebaseio.com/Groups");
      var members = new Firebase("https://locator-b8762.firebaseio.com/Groups/users");
      $scope.signUp = function () {
        firebase.auth().createUserWithEmailAndPassword($scope.data.email, $scope.data.password).catch(function (error) {
          // Handle Errors here.
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                alert("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                alert("The specified email is not a valid email.");
                break;
              default:
                alert("Error creating user:", error);
            }
          }
        }).then(function (result) {
          if (result) {
            $scope.closeModal(2);
            var options = {
              maximumAge: 3600000,
              enableHighAccuracy: true
            }

            var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            function onSuccess(position) {
              ref.child(result.uid).set({
                userId: result.uid,
                email: $scope.data.email,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude

              })
            }

            function onError(error) {
              alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }

          }
        });
      }
//Sign In with Firebase
      $scope.signIn = function () {
        $scope.connected = false;
        firebase.auth().signInWithEmailAndPassword($scope.data.email, $scope.data.pass).catch(function (error) {
          if (error) {
            switch (error.code) {
              case "auth/user-not-found":
                alert("sign up to create an account");
                break;

              case "auth/wrong-password":
                var myPopup = $ionicPopup.show({
                  title: 'invalid password ',
                  subTitle: 'forget your password ?',
                  scope: $scope,
                  buttons: [
                    {
                      text: 'Reset',
                      type: 'button-assertive',
                      onTap: function (e) {
                        var auth = firebase.auth();
                        var emailAddress = $scope.data.email;

                        auth.sendPasswordResetEmail(emailAddress).then(function () {
                          alert("reset email sent , check your mailBox");
                        }, function (error) {
                        });
                      }
                    },
                    {
                      text: '<b>retry</b>',
                    }
                  ]
                });

                myPopup.then(function (res) {
                  console.log('Tapped!', res);
                })

                break;
              case "auth/invalid-email":
                alert("invalid email");
                break;
              default:
                alert("Error signing in user:", error);
            }
          }
        }).then(function (success) {
          if (success) {
            $scope.connected = true;
            //$scope.watchPosition(success.uid);
            //$scope.ListGroup();
            $scope.openModal(1);
            $timeout(function () {
              $scope.isExpanded = true;
            }, 300);

            // Set Motion
            ionicMaterialMotion.fadeSlideInRight();

            // Set Ink
            ionicMaterialInk.displayEffect();
          }
        });

      }

      var options = {
        timeout: 10000, enableHighAccuracy: true, maximumAge: 3600000
      };

      $scope.checkUser = function () {
        var user = firebase.auth().currentUser;
        if (user != null) {
          email = user.email;
          id = user.uid;
        }
        return (id);
      }

     // var mem = new Firebase("https://locator-b8762.firebaseio.com/Groups" + grpId);
      var ownerId = null;

      $scope.addMembers = function (grpId, email) {

        /*//var id = $scope.checkUser();
         ref.once("value", function (snapshot) {


         var i = 0;
         snapshot.forEach(function (childSnapshot) {
         snapshot.forEach
         childSnapshot.set({
         users: {
         userI
         }
         });
         }
         });*/


      }
      $scope.addGroup = function () {

        var id = $scope.checkUser();
        var grps = grp.push();
        grps.set({
          Owner: id,
          name: $scope.data.groupName,
          users: {
            userId: id,
          }
        })
        $scope.closeModal(1);
        window.location.reload(true);
        $scope.openModal(1);

      }

      grp.once("value", function (snapshot) {
        $scope.Groups = [];
        var i = 0;
        snapshot.forEach(function (childSnapshot) {
          var id = $scope.checkUser();
          if ((childSnapshot.val().Owner) == id) {
            $scope.Groups.push({
              name: childSnapshot.val().name,
              owner: childSnapshot.val().Owner,
              grpId: Object.keys(snapshot.val())[i++]
            })
          }

        });


      });


      ref.once("value", function (snapshot) {
        $scope.users = [];
        var i = 0;
        snapshot.forEach(function (childSnapshot) {
          $scope.users.push({
            email: childSnapshot.val().email,
            userId: childSnapshot.val().userId
          })
        });

      });


      $scope.watchPosition = function (userId) {
        var pos = new Firebase("https://locator-b8762.firebaseio.com/users");
        var options = {
          maximumAge: 3600000,
          timeout: 3000,
          enableHighAccuracy: true
        }

        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

        function onSuccess(position) {
          pos.once("value", function (snapshot) {
            var i = 0;
            snapshot.forEach(function (childSnapshot) {
              if (childSnapshot.val().userId == userId) {
                childSnapshot.update({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                });
              }
            });
          });
          console.log(pos.child(userId));
          console.log(pos.child(userId));

        }

        function onError(error) {
          alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }


      }

      $scope.ShowMap = function () {
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var mapOptions = {
            center: latLng,
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = new google.maps.Map(document.getElementById("ggmap"), mapOptions);
          //To add a marker
          var myImage = 'img/gps.png';
          google.maps.event.addListenerOnce($scope.map, 'idle', function () {
            var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng,
              icon: myImage,
            });
            //on click zoom
            google.maps.event.addListener(marker, 'click', function () {
              $scope.map.setZoom(14);
              $scope.map.setCenter(marker.getPosition());
            });
          });

//addMarker
          var latln = new google.maps.LatLng(34.7452, 10.7613);
          google.maps.event.addListenerOnce($scope.map, 'idle', function () {
            var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latln
            });

          })
        })
      }

    }
    )

