

    // Login prompt 


    Yellow.promptLogin = function (message) {

    	"use strict";

    	var loginUrl = "/login/";

        window.location = loginUrl + "?next=" + window.location.pathname + "&message=" + (message || "");
    };

