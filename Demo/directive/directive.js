/**
 * Created by geek on 16-8-17.
 */
app.directive("getMyApp", function () {
    return {
        restrict: 'EA',
        controller: 'myAppController',
        template:
    "<md-content class='md-padding' layout-xs='column' layout='row'>"+
        "<div flex-xs flex-gt-xs='50' layout='row'>"+
        "<md-card id='{{result.id}}' ng-repeat='result in results'>"+
        "<md-card-title>"+
        "<md-card-title-text>"+
        "<span class='md-headline'>{{result.app_name}}</span>"+
        "</md-card-title-text>"+
        "<md-card-title-media>"+
        "<div class='md-media-lg card-media' style='text-align: center;font-size: 60px;height: 40px;'>"+
        "<md-icon md-svg-src='img/android.svg' class='active_user '></md-icon>" +
        "</div>"+
        "</md-card-title-media>"+
        "</md-card-title>"+
        "<md-card-actions layout='row' layout-align='end center'>"+
        "<md-button ng-click='deleteApp(result.id)'>删除</md-button>"+
        "<a href='#/App'><md-button ng-click='toAppItems(result.id)'>详情</md-button></a>"+
        "</md-card-actions>"+
    "</md-card>"+
    "</div>"+
    "</md-content>"
    }
});