var Request = (function() {
    var requestOnWay = {};
    var serialize = function serialize(obj) {
        return Object.keys(obj).map(function(key) {
            return key + '=' + obj[key];
        }).join('&');
    };
    var hashOfString = function hashOfString(str) {
        if (Array.prototype.reduce) {
            return str.split("").reduce(function(a, b) {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a
            }, 0);
        }
        var hash = 0;
        if (str.length === 0) return hash;
        for (var i = 0; i < str.length; i++) {
            var character = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    var getRequestKey = function getRequestKey(params, url) {
    	var str = JSON.stringify(params) + url;
        return hashOfString(str);
    }
    var fetchData = function fetchData(params, url) {
        var requestKey = getRequestKey(params, url);
        if (typeof requestOnWay[requestKey] === 'undefined') {
            requestOnWay[requestKey] = new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(args) {
                    if (this.readyState == 4) {
                        if (this.status === 200) {
                            resolve(JSON.parse(this.responseText));
                        } else {
                            delete requestOnWay[requestKey];
                            reject(this.status);
                        }
                    }
                };
                xhr.open("GET", url + "?" + serialize(params));
                xhr.send(true);
            });
        }
        return requestOnWay[requestKey];
    };
    var clearCache = function clearCache() {
        requestOnWay = {};
    };
    return {
        fetchData: fetchData,
        serialize: serialize,
        clearCache: clearCache
    };
})();