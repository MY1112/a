app.controller('juadgeController',function($location) {
    if (localStorage.getItem('AV/iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz/currentUser')) {
        $location.path('/myApp');
    }
})