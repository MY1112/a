/**
 * Created by geek on 16-8-23.
 */
app.controller('myAppController',function($scope,exchangeLeancloud,promptBox) {
    var user_items = JSON.parse(localStorage.getItem('AV/iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz/currentUser'));

    exchangeLeancloud.find('_User',user_items.objectId,function(appItems) {
        var userInfo = [];
        for(var i = 0;i<appItems.length;i++) {
            var arr = appItems[i].attributes;
            arr.id = appItems[i].id;
            userInfo.push(arr);
            $scope.results = userInfo;
        }
    });

    $scope.toAppItems = function(AppId) {
        localStorage.setItem('AppId',AppId);
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