(function () {
    
    
    "use strict";

    /*

    Facebook and Google+ login

    You need to define the allowed URLs in fb and google application settings,
    and make sure the correct app id / client id is being used.

    */



    var GOOGLE_CLIENT_ID = "665107142255.apps.googleusercontent.com";



    /*

    Ajax social media login - can have either 'facebook' or 'google' mode, 
    which pass data obtained after authenticating with either service:
    
    Example params for facebook:

        {
            mode:           'facebook',    
            first_name:     "λλ",
            gender:         "male",
            id:             "100000852807509",
            last_name:      "λλ",
            link:           "http://www.facebook.com/100000852807509",
            locale:         "en_GB",
            name:           "λλ λλ",
            timezone:       13,
            updated_time:   "2014-08-21T08:02:08+0000",
            verified:       true
        }

    Example params for google:

        {  
           "mode": "google", 
           "kind":"plus#person",
           "etag":"\"Vea_b94Y77GDGgRK7gFNPnolKQw/MkfimS1F2WpupJ4PgaDdtCFz35I\"",
           "gender":"male",
           "objectType":"person",
           "id":"116199089821533362509",
           "displayName":"Tim F",
           "name":{  
              "familyName":"F",
              "givenName":"Tim"
           },
           "tagline":"△",
           "url":"https://plus.google.com/116199089821533362509",
           "image":{  
              "url":"https://lh5.googleusercontent.com/-yi8plR1GAbw/AAAAAAAAAAI/AAAAAAAAAIQ/__tNN5g9LMQ/photo.jpg?sz=50",
              "isDefault":false
           },
           "isPlusUser":true,
           "language":"en_GB",
           "ageRange":{  
              "min":21
           },
           "circledByCount":31,
           "verified":false,
           "cover":{  
              "layout":"banner",
              "coverPhoto":{  
                 "url":"https://lh5.googleusercontent.com/-y2SCw0a8ONU/T6DeSXdLaTI/AAAAAAAAAIU/fvjNyYTPSLA/s630/Poly_Evolver.JPG",
                 "height":182,
                 "width":940
              },
              "coverInfo":{  
                 "topImageOffset":0,
                 "leftImageOffset":0
              }
           }
        }

    */

    
    function siteLogin (params) {

        $.ajax({

            type:           'POST',
            url:            '/login/',
            contentType:    "application/json; charset=utf-8",
            data:           JSON.stringify(params),
            dataType:       'json',
            headers:        { 'X-CSRFToken': Yellow.csrf },

            success: function (data, textStatus, xhr) {
                if (xhr.status < 400) {
                    Yellow.notify('Logged in');
                    window.location = "/";
                }
            },
            error: function (xhr, textStatus, errMessage) {
                Yellow.notify(errMessage, 'error');
            }
        });
    }



    Yellow.login = {



        facebook: function (e) {

            if (e) e.preventDefault();

            function siteLoginWithFb (statusInfo) {

                FB.api('/me', function (response) {
                    response.mode = 'facebook';
                    response.status_info = statusInfo;
                    siteLogin(response);
                });
            }

            FB.getLoginStatus(function(response) {

                if (response.status !== 'connected') {
                    FB.login(function (response) {
                        if (response.status === 'connected') siteLoginWithFb(response); 
                    }, { scope: 'email' });

                } else {
                    siteLoginWithFb(response);
                }
            });
        },



        google: function (e) {

            if (e) e.preventDefault();

            var authenticated;

            gapi.auth.signIn({

                clientid:               GOOGLE_CLIENT_ID,
                scope:                  "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
                requestvisibleactions:  "http://schema.org/AddAction",
                cookiepolicy:           "single_host_origin",

                callback: function (authResult) { 

                    if (authResult.status.signed_in) {

                        gapi.client.load('plus', 'v1', function () {
                            gapi.client.plus.people.get({ userId: 'me' }).execute(function (resp) {

                                if (!authenticated) {
                                    delete resp.result;
                                    resp.status_info    = authResult;
                                    resp.mode           = 'google';
                                    authenticated       = true;
                                    siteLogin(resp);
                                }
                            });
                        });
                    }
                }
            });
        }
    };


}).call(this);