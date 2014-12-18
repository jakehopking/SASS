$(function () { 


    "use strict";


    // Login prompt 

    var loginUrl = "/login/";


    Yellow.promptLogin = function (message) {
        window.location = loginUrl + "?next=" + window.location.pathname + "&message=" + (message || "");
    };


});