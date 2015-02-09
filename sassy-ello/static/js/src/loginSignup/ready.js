(function () {
    
    
    "use strict";


    FB.init({
        appId:    '211372249016511',
        version:  'v2.1'
    });


    $('.button--facebook').on('click', Yellow.login.facebook);

    $('.button--google').on('click', Yellow.login.google);


}).call(this);
