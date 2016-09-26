/**
 * Created by geek on 16-8-23.
 */
app.controller('myAppController',function($scope,exchangeLeancloud,promptBox,$location) {
    var myDate = new Date();
        var params_Json = {
            date: {
                year: myDate.getFullYear(),
                month: myDate.getMonth()+1,
                day: myDate.getDate(),
                responsecode: 200
            }
        };
    exchangeLeancloud.call('get_app',params_Json,function(data) {
        $scope.results = data;
    });

    exchangeLeancloud.call('show_relation_app',{paramsJson:'paramsJson'},function(data) {
        $scope.relations = data;
    })

    $scope.applications = function(appStatus) {
        return appStatus == 'success';
    }
    $scope.checking = function(appStatus) {
        return appStatus == 'checking';
    }

    $scope.submit = function(appId,appStatus) {
        document.getElementById(appId).getElementsByClassName('submit')[0].disabled = true;
        var paramsJson = {
            appId: appId
        };
        exchangeLeancloud.call('check',paramsJson,function(data) {
            document.getElementById(appId).getElementsByClassName('status')[0].innerText = "审核状态:"+data;
        });

    }

    $scope.toAppItems = function(AppId,AppStatus) {
        localStorage.setItem('AppId',AppId);
        if(AppStatus == 'success') {
            $location.path("/App");
        }else {
            promptBox.prompt("notreviewed");
        }
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