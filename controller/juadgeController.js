app.controller('juadgeController',function($scope,$location,exchangeLeancloud,$timeout) {
    if (localStorage.getItem('AV/iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz/currentUser')) {
            exchangeLeancloud.call('juadge', {paramsJson: 'paramsJson'}, function (data) {
                if (data == '用户') {
                    $location.path('/myApp')
                } else if (data == '管理员') {
                    $location.path('/manager')
                }
            });
    }
    $timeout(function() {
        document.getElementById('button1').onclick='';
    }, 500);
})