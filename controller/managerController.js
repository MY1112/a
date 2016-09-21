app.controller('managerController',function ($scope,exchangeLeancloud) {
    exchangeLeancloud.call('get_check', {paramsJson: 'paramsJson'}, function (data) {
        $scope.allApps = data;
    });
    $scope.successStatus = function(appStatus) {
        return appStatus == 'success';
    }
    $scope.notStatus = function(appStatus) {
        return appStatus == '未审核';
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
})