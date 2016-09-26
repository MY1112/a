/**
 * Created by geek on 16-9-2.
 */

app.controller('regLogin',function($scope,Logout,$location,$timeout,$http,exchangeLeancloud) {
    $scope.loginshow = true;
    $scope.logoutClear = function() {
        Logout.logout();
        localStorage.removeItem('AppId');
        $scope.loginshow = true;
    }

    $scope.save_juadge = function() {
        localStorage.setItem('Juadge','true');
    }

    $scope.rem_juadge = function() {
        localStorage.removeItem('Juadge');
    }

    $scope.regLogin = function() {
        if(localStorage.getItem('Juadge') == null){
            return false;
        }else {
            return true;
        }
    }

    $scope.juadgeLogin = function() {
        if($scope.loginPhone == undefined || $scope.loginVerification == undefined){
            $scope.inputWarn = true;
        }else {
            $scope.inputWarn = false;
            AV.User.logInWithMobilePhoneSmsCode($scope.loginPhone, $scope.loginVerification).then(function (success) {
                localStorage.setItem('current_user',$scope.loginPhone);
                exchangeLeancloud.call('juadge', {paramsJson: 'paramsJson'}, function (data) {
                    $scope.loginshow = false;
                    $scope.current_username = localStorage.getItem('current_user');
                    if (data == '管理员') {
                        $scope.managerHide = true;
                        $location.path('/manager')
                    }else {
                        $scope.managerHide = false;
                        $location.path('/myApp')
                    }
                });
            }, function (error) {
                console.log('err')
            });
        }
    }

    if (localStorage.getItem('AV/iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz/currentUser')) {
        $scope.loginshow = false;
    }

    $scope.yonghu = function() {
        AV.User.logIn($scope.lgp,$scope.lgm).then(function (loginedUser) {
            localStorage.setItem('current_user',$scope.lgp);
            exchangeLeancloud.call('juadge', {paramsJson: 'paramsJson'}, function (data) {
                $scope.loginshow = false;
                $scope.current_username = localStorage.getItem('current_user');
                if (data == '管理员') {
                    $scope.managerHide = true;
                    $location.path('/manager')
                }else {
                    $scope.managerHide = false;
                    $location.path('/myApp')
                }
            });
        }, function (error) {
        });
    }

    $scope.transmissionLogin = function () {
        if($scope.loginPhone){
            AV.User.requestLoginSmsCode($scope.loginPhone).then(function (success) {
            }, function (error) {
            });
        }
    }

    $scope.transmission = function() {
        if($scope.PhoneNumber){
            AV.Cloud.requestSmsCode($scope.PhoneNumber).then(function () {
            }, function (error) {
            });
        }
    }
    $scope.registered = function() {
        AV.User.signUpOrlogInWithMobilePhone($scope.PhoneNumber, $scope.Verification).then(function (success) {
            localStorage.setItem('current_user',$scope.PhoneNumber);
            exchangeLeancloud.call('juadge', {paramsJson: 'paramsJson'}, function (data) {
                $scope.loginshow = false;
                $scope.current_username = localStorage.getItem('current_user');
                if (data == '管理员') {
                    $scope.managerHide = true;
                    $location.path('/manager')
                }else {
                    $scope.managerHide = false;
                    $location.path('/myApp')
                }
            });
        }, function (error) {
            console.log(error);
        });
    }

})