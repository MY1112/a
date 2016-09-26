app.controller('managerController',function ($scope,exchangeLeancloud,promptBox) {
    exchangeLeancloud.call('get_check', {paramsJson: 'paramsJson'}, function (data) {
        $scope.allApps = data;
    });
    $scope.successStatus = function(appStatus) {
        return appStatus == 'success';
    }
    $scope.notStatus = function(appStatus) {
        return appStatus == 'notreviewed';
    }
    $scope.agree = function(appId) {
        document.getElementById(appId).getElementsByClassName('submit')[0].disabled = true;
        document.getElementById(appId).getElementsByClassName('submit')[1].disabled = true;

        var paramsJson = {
            appId: appId
        };
        exchangeLeancloud.call('consent_check',paramsJson,function(data) {
            document.getElementById(appId).getElementsByClassName('status')[0].innerText = data;
        })
    }

    $scope.disagree = function(appId) {
        var paramsJson = {
            appId: appId
        };
        exchangeLeancloud.call('no_consent_check',paramsJson,function(data) {
            document.getElementById(appId).getElementsByClassName('status')[0].innerText = data;
        })
    }

    $scope.deleteApp = function(AppId) {
        var paramsJson = {
            objectId: AppId
        };
        exchangeLeancloud.call('delete_app',paramsJson,function(data) {
            promptBox.prompt(data);
        })
        document.getElementById(AppId).remove();
    }
})