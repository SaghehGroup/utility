var moment = require('moment-jalaali');

/**
 *  * get query string
 * @param name the parameter for this method
*/
var getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var convert = {

    stringTojMoment: function (val) {
        return val && val.length > 6 ? moment(val, 'jYYYY/jM/jD') : null;
    },

    jMomentToString: function (val) {
        if (val != null && val != "")
            return typeof (val) == "object" ? val.format('jYYYY/jM/jD') : val;
        else return "";
    },

    toSafeLocaleString: function (val) {
        let num = parseInt(val);
        if (isNaN(num))
            return val
        return num.toLocaleString();
    }

}

var isValidIranianNationalCode = function (_national_code) {
    var allDigitEqual = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
    codeMelliPattern = /^([0-9]{10})+$/;
    if (allDigitEqual.indexOf(_national_code) != -1 || !codeMelliPattern.test(_national_code)) {
        return false;
    }
    var chArray = Array.from(_national_code);
    var num0 = parseInt(chArray[0]) * 10;
    var num2 = parseInt(chArray[1]) * 9;
    var num3 = parseInt(chArray[2]) * 8;
    var num4 = parseInt(chArray[3]) * 7;
    var num5 = parseInt(chArray[4]) * 6;
    var num6 = parseInt(chArray[5]) * 5;
    var num7 = parseInt(chArray[6]) * 4;
    var num8 = parseInt(chArray[7]) * 3;
    var num9 = parseInt(chArray[8]) * 2;
    var a = parseInt(chArray[9]);
    var b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9;
    var c = b % 11;
    var res = (((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)));
    return res;
}

var isValidEmail = function (input) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
}

var isFunction = function (functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

var updateQueryStringParameter = function (key, value) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + key + '=' + value;
    window.history.pushState({ path: newurl }, '', newurl);
}

const helper = { getParameterByName, convert, isFunction, updateQueryStringParameter, isValidIranianNationalCode, isValidEmail };
export default helper;
export { getParameterByName, convert, isFunction, updateQueryStringParameter, isValidIranianNationalCode, isValidEmail };
