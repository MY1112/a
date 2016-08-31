/**
 * Created by geek on 16-8-15.
 */

app.factory('regHeaders',function() {
    if(localStorage.getItem('userItems')!=null) {
        var useritems = JSON.parse(localStorage.getItem('userItems'));
        var session = useritems.sessionToken;
    }
    return {
        headers: {
            "X-LC-Id": "iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz",
            "X-LC-Key": "KqPheplNC2ctxTW4XJlaXoeJ",
            "X-LC-Session":session,
            'Content-Type': "application/json"
        }
    }
}).factory('httpUrl',function() {
    var getUrl = function (type) {
        switch (type) {
            case 'post':
                return 'https://api.leancloud.cn/1.1/users'
            case 'get':
                return 'https://api.leancloud.cn/1.1/login'
            case 'postobject':
                return 'https://api.leancloud.cn/1.1/classes/'
        }
    }
    return {getUrl: getUrl};

//    .factory('reqUrl',function($http,$location,httpUrl,regHeaders) {
//    var reqhttp = function(data) {
//        return $http.post(httpUrl.getUrl('post'), data, regHeaders)
//            .success(function (data) {
//                return $location.path("/login");
//            }).error(function (err) {
//                console.log('err'+err)
//            })
//    }
//    return {reqhttp:reqhttp};
//})
}).factory('uploadUrl',function(httpUrl,$http,$location,regHeaders) {
    var upUrl = function(username,password) {
        return $http.get(httpUrl.getUrl('get')+'?username='+username+'&password='+password,regHeaders)
            .success(function(result) {
                var userItems = JSON.stringify(result);
                localStorage.setItem('userItems',userItems);
                return $location.path("/userPage");
            }).error(function(err) {
            console.log('err'+err)
            })
        }
    return {upUrl:upUrl};
}).factory('setObject',function($http,regHeaders) {
    var Object = function(url,data) {
        return $http.post(url,data,regHeaders)
            .success(function(result) {
                console.log("addsuccess:"+result)
            }).error(function(err) {
                console.log('err:'+err)
            })
    }
    return {Object:Object};
}).factory('checkHttp',function() {
    var url = function(http,classname,checkname) {
        return http+classname+"?where="+encodeURIComponent(checkname);
    }
    return {url:url};
}).factory('getObject',function($http,regHeaders) {
    var Object = function(url,cb) {
        cb = cb||function() {}
        return $http.get(url,regHeaders)
            .success(function(result) {
                cb(result)
            }).error(function(err) {
                console.log("err:"+err)
            })
    }
    return {Object:Object};
}).factory('deleteObject',function($http,regHeaders) {
    var Object = function(url) {
        return $http.delete(url,regHeaders)
            .success(function(result) {
                console.log("deletesuccess:")
            }).error(function(err) {
                console.log("err:"+err)
            })
    }
    return {Object:Object};
}).factory('updateObject',function($http,regHeaders) {
    var Object = function (url,data) {
        return $http.put(url,data,regHeaders)
            .success(function(result) {
                console.log('updatesuccess:')
            }).error(function(err) {
                console.log('err:'+err)
            })
    }
    return {Object:Object};
})

