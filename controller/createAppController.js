/**
 * Created by geek on 16-8-16.
 */
app.controller('createAppController',function($scope,exchangeLeancloud,promptBox) {

    $scope.addApp = function () {
        if($scope.appName){

            var paramsJson = {
                app_name: $scope.appName
            };
            exchangeLeancloud.call('create_app',paramsJson,function(data) {
                promptBox.prompt(data);
                $scope.appName = '';
            });

        }
    }
})