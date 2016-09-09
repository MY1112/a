/**
 * Created by geek on 16-8-23.
 */
app.controller('myAppController',function($scope,exchangeLeancloud) {
    var user_items = JSON.parse(localStorage.getItem('AV/iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz/currentUser'));

    exchangeLeancloud.find(user_items.objectId,function(appItems) {
        var userInfo = [];
        for(var i = 0;i<appItems.length;i++) {
            var arr = appItems[i].attributes;
            arr.id = appItems[i].id;
            userInfo.push(arr);
            $scope.results = userInfo;
        }
        });
    //
    //$scope.deleteApp = function (app_id) {
    //    CreateApp.Delete('App',app_id);
    //    document.getElementById(app_id).remove();
    //}
    $scope.toAppItems = function(AppId) {
        localStorage.setItem('AppId',AppId);
    }



})