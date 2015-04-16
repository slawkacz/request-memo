var Request = (function() {
    var requestOnWay = {};
    var serialize = function serialize(obj) {
        return Object.keys(obj).map(function(key) {
            return key + '=' + obj[key];
        }).join('&');
    };
    var getRequestKey = function getRequestKey(params, url) {
        return JSON.stringify(params) + url;
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