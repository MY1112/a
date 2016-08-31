/**
 * Created by geek on 16-8-29.
 */
app.controller('appItemsController',function($scope,exchangeLeancloud,promptBox) {
    var app_Id = localStorage.getItem('AppId');



    var api_Json = new AV.Query('Api');
    api_Json.get('57c533d379bc440063f1375f').then(function (data) {
        $scope.api_Json = data.attributes.api_json;
    }, function (error) {
       console.log("err:"+error);
    });


    var token = new AV.Query('App');
    token.get(app_Id).then(function (data) {
        $scope.token = data.attributes.app_key;
    }, function (error) {
        console.log("err:"+error);
    })


    $scope.addCoagent = function() {
        if($scope.coagent) {
            var paramsJson = {
                username: $scope.coagent,
                app_id: app_Id
            };
            exchangeLeancloud.call('relation_user',paramsJson,function(data) {
                promptBox.prompt(data);
                $scope.coagent = '';
            });
        }
    }
})