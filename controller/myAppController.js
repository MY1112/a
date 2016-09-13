/**
 * Created by geek on 16-8-23.
 */
app.controller('myAppController',function($scope,exchangeLeancloud,promptBox,$timeout,$location) {

    exchangeLeancloud.call('get_app',{paramsJson:'paramsJson'},function(data) {
        $scope.results = data;
    });

    exchangeLeancloud.call('show_relation_app',{paramsJson:'paramsJson'},function(data) {
        $scope.relations = data;
    })

    $timeout(function() {
        document.myForm.button1.click();
    }, 500,2);

    $scope.applications = function(appStatus) {
        return appStatus == 'success';
    }
    $scope.checking = function(appStatus) {
        return appStatus == 'checking';
    }

    $scope.submit = function(appId) {
        var paramsJson = {
            appId: appId
        };
        exchangeLeancloud.call('check',paramsJson,function(data) {
            promptBox.prompt(data)
            window.location.reload();
        })
    }

    $scope.toAppItems = function(AppId) {
        localStorage.setItem('AppId',AppId);
        $location.path("/App");
    }

    $scope.deleteApp = function (AppId) {
        var paramsJson = {
            objectId: AppId
        };
        exchangeLeancloud.call('delete_app',paramsJson,function(data) {
            promptBox.prompt(data);
        })
        document.getElementById(AppId).remove();
    }


})