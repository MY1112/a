/**
 * Created by geek on 16-8-16.
 */
app.controller('regController',function($scope,$interval,Register){
    $scope.registered = function() {
        //$scope.namewarn = !$scope.username?  '用户名不能为空':'';
        //$scope.passwordwarn = !$scope.password? '密码不能为空':'';
        //$scope.repeatwarn = $scope.password!=$scope.repeatPassword? '密码不一致':'';
        //$scope.emailwarn = !$scope.email? '邮箱不能为空':'';
        if ($scope.username && $scope.password == $scope.repeatPassword && $scope.email) {
            Register.register($scope.username,$scope.password,$scope.email);
        }
    }

});