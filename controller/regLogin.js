/**
 * Created by geek on 16-9-2.
 */

app.controller('regLogin',function($scope,Logout,$location,$timeout,$http,exchangeLeancloud) {
    $scope.navigationMenu = function() {
        if (localStorage.getItem('AV/iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz/currentUser') == undefined) {
            return true;
        }else {
            return false;
        }
    }
    $scope.logoutClear = function() {
        Logout.logout();
        localStorage.removeItem('AppId');
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
                $timeout(function() {
                    $location.path('/juadge');
                },1000);
            }, function (error) {
                console.log('err')
            });
        }
    }

    $scope.yonghu = function() {
        AV.User.logIn($scope.lgp,$scope.lgm).then(function (loginedUser) {
            $scope.lgp='';
            $scope.lgm='';
            exchangeLeancloud.call('juadge', {paramsJson: 'paramsJson'}, function (data) {
                if (data == '管理员') {
                    $scope.managerHide = true;
                }else {
                    $scope.managerHide = false;
                }
            });
            $timeout(function() {
                $location.path('/juadge');
            },1000);
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
            $timeout(function() {
                $location.path('/juadge');
            },1000)
            console.log(success);
        }, function (error) {
            console.log(error);
        });
    }

    //$scope.weixinLogin = function() {
    //    AV.User.signUpOrlogInWithAuthData({
    //        "openid": "oPrJ7uM5Y5oeypd0fyqQcKCaRv3o",
    //        "access_token": "OezXcEiiBSKSxW0eoylIeNFI3H7HsmxM7dUj1dGRl2dXJOeIIwD4RTW7Iy2IfJePh6jj7OIs1GwzG1zPn7XY_xYdFYvISeusn4zfU06NiA1_yhzhjc408edspwRpuFSqtYk0rrfJAcZgGBWGRp7wmA",
    //        "expires_at": "2016-01-06T11:43:11.904Z"
    //    }, 'weixin').then(function (s) {
    //    }, function (e) {
    //
    //    });
    //}
})