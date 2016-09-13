app.controller('managerController',function ($scope,exchangeLeancloud,$timeout) {
    exchangeLeancloud.call('get_check', {paramsJson: 'paramsJson'}, function (data) {
        $scope.allApps = data;
    });
    $timeout(function() {
        document.myForm.button1.click();
    }, 500,2);
    $scope.auditingStatus = function(appStatus) {
        return appStatus == 'success';
    }
    $scope.agree = function(appId) {
        var paramsJson = {
            appId: appId
        };
        exchangeLeancloud.call('consent_check',paramsJson,function(data) {
            window.location.reload();
        })
    }

    $scope.disagree = function(appId) {
        var paramsJson = {
            appId: appId
        };
        exchangeLeancloud.call('no_consent_check',paramsJson,function(data) {
            window.location.reload();
        })
    }
})