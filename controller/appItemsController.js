/**
 * Created by geek on 16-8-29.
 */
app.controller('appItemsController',function($scope,exchangeLeancloud,promptBox,Permission,$http,$location) {
    var app_Id = localStorage.getItem('AppId');

    var api_Json = new AV.Query('Api');
    api_Json.get('57d65bb3a22b9d006c620db8').then(function (data) {
        $scope.api_Json = data.attributes.api_json;
    }, function (error) {
       console.log("err:"+error);
    });


    var token = new AV.Query('App');
    token.get(app_Id).then(function (data) {
        $scope.app_name = data.attributes.app_name;
        $scope.token = data.attributes.app_key;
    }, function (error) {
        console.log("err:"+error);
    })

    $scope.fangwen = function() {
        var paramsJson = {
            token: $scope.token
        };
        exchangeLeancloud.call('access_api',paramsJson,function(data) {
            console.log('daadad')
            var result = JSON.parse(data)
            console.log(data)

            if(result.error == "Quota exceeded") {
                console.log('********dd********')
                console.log(result.error)
                promptBox.prompt(result.error);
                $scope.aaa = function () {
                    return true;
                }
            }else {
                $scope.data_api = result;
            }
        })
    }

    $scope.download = function () {
        //$http.get('http://192.168.1.30:3000/download')
        //    .success(function (data) {
        //        console.log(data)
        //    })
        //    .error(function (data) {
        //        console.log('err:'+data)
        //    });
        location.href = 'http://192.168.1.30:3000/download/'+'file.txt'

    }

    $scope.show_relation = function() {
        var paramsJson = {
            appID: app_Id
        };
        exchangeLeancloud.call('show_relation_user',paramsJson,function(data) {
            $scope.actors = data;
        });
    }


    $scope.restriction = function (userId,ev) {
        Permission.user_permission(userId,ev,app_Id)
    }


    $scope.addCoagent = function() {
        if($scope.coagent) {
            var paramsJson = {
                username: $scope.coagent,
                appID: app_Id
            };
            exchangeLeancloud.call('relation_user',paramsJson,function(data) {
                promptBox.prompt(data);
                $scope.coagent = '';
            });
        }
    }
})