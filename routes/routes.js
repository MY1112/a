/**
 * Created by geek on 16-8-15.
 */
var app = angular.module('My_App',['ngRoute','ngMaterial']);

app.run(function() {
    var APP_ID = 'iqnghLfOqAtee5Bo1QAgsAC3-gzGzoHsz';
    var APP_KEY = 'KqPheplNC2ctxTW4XJlaXoeJ';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
})


app.config(['$routeProvider','$mdThemingProvider', function($routeProvider,$mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey');

    $routeProvider
        .when('/home',{
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/myApp',{
            templateUrl: 'myApp.html',
            controller: 'myAppController'
        })
        .when('/manager',{
            templateUrl: 'manager.html'
        })
        .when('/App',{
            templateUrl: 'AppItems.html',
            controller: 'appItemsController'
        })
        .when('/createApp',{
            templateUrl: 'createApp.html',
            controller: 'createAppController'
        })
        .otherwise({redirectTo:'/home'});
}]);