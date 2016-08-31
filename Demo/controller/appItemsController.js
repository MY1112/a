/**
 * Created by geek on 16-8-29.
 */
app.controller('appItemsController',function($scope,exchangeLeancloud,promptBox) {
    var app_Id = localStorage.getItem('AppId');
    $scope.AppName = app_Id;


    //CreateApp.create()


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