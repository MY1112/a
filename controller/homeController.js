app.controller('homeController',function($scope,$location,exchangeLeancloud) {
    if (localStorage.getItem('AV/iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz/currentUser')) {
        exchangeLeancloud.call('juadge', {paramsJson: 'paramsJson'}, function (data) {
            $scope.current_username = localStorage.getItem('current_user');
            if (data == '管理员') {
                $scope.managerHide = true;
                $location.path('/manager')
            } else {
                $scope.managerHide = false;
                $location.path('/myApp')
            }
        });
    }
})