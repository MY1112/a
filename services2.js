/**
 * Created by geek on 16-8-19.
 */
app.factory('Logout',function() {
    var logout = function() {
        AV.User.logOut();
        var currentUser = AV.User.current();
        if (currentUser) {
            console.log('失败！')
        }
    }
    return {logout:logout};
}).factory('exchangeLeancloud',function($rootScope) {
    var call = function(function_name,paramsJson,cb) {
        cb = cb || function() {}
        AV.Cloud.run(function_name, paramsJson, {
            success: function(data) {
                $rootScope.$apply(cb(data))
            },
            error: function(err) {
                console.log('err:'+err)
            }
        });
    }
    var find = function (ObjectName,UserId,cb) {
        cb = cb || function() {}
        var apps = AV.Object.createWithoutData(ObjectName, UserId);
        var relation = apps.relation('containedApps');
        var query = relation.query();
        query.find().then(function (results) {
            cb(results)
        }, function (error) {
            console.log("err"+error)
        });
    }
    return {call:call,find:find};
}).factory('promptBox',function($mdDialog) {
    var prompt = function(data) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('提示')
                .textContent(data)
                .ariaLabel('Offscreen Demo')
                .ok('确认')
                .openFrom({
                    top: -50,
                    width: 30,
                    height: 80
                })
                .closeTo({
                    left: 1500
                })
        );
    }
    return {prompt:prompt};
}).factory('Permission',function(exchangeLeancloud,promptBox,$mdDialog) {
    var user_permission = function(userId,ev,app_Id) {
        var confirm = $mdDialog.confirm()
            .title('是否给已选用户添加权限？')
            .textContent('')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('添加权限')
            .cancel('取消');

        $mdDialog.show(confirm).then(function(result) {
            var paramsJson = {
                userID: userId,
                appID: app_Id
            };
            exchangeLeancloud.call('relation_app_acl',paramsJson,function(data){
                promptBox.prompt(data);
            })
        }, function() {
        });
    }
    return {user_permission:user_permission};
})