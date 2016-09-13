/**
 * Created by geek on 16-8-17.
 */
app.directive("getMyApp", function () {
    return {
        restrict: 'EA',
        controller: 'myAppController',
        scope: {
            results: '='
        },
        template: "<div flex-xs flex-gt-xs='50' layout='row' style='background-color: #eef1f5;'>" +
        "<md-card id='{{result.objectId}}' ng-repeat='result in results' style='background-color: #23527c;color: white;'>" +
        "<md-card-title>" +
        "<md-card-title-text>" +
        "<span class='md-headline'>{{result.app_name}}</span>" +
        "<span class='subhead'>审核状态：{{result.status}}</span>"+
        "</md-card-title-text>" +
        "<md-card-title-media>" +
        "<div class='md-media-lg card-media' style='text-align: center;font-size: 60px;height: 40px;'>" +
        "<md-icon md-svg-src='img/android.svg' class='active_user '></md-icon>" +
        "</div>" +
        "</md-card-title-media>" +
        "</md-card-title>" +
        "<md-card-actions layout='row' layout-align='end center'>" +
        "<md-button ng-click='submit(result.objectId)' ng-disabled='applications(result.status)'>提交审核</md-button>"+
        "<md-button ng-click='deleteApp(result.objectId)'>删除</md-button>" +
        "<md-button ng-click='toAppItems(result.objectId)'>详情</md-button>" +
        "</md-card-actions>" +
        "</md-card>" +
        "</div>"
    }
}).directive('relationUser', function () {
        return {
            restrict: 'EA',
            controller: 'appItemsController',
            scope: {
                actors: '='
            },
            template: "<div flex-xs flex-gt-xs='50' layout='row'>"+
                "<md-button id='{{actor.objectId}}' ng-repeat='actor in actors' ng-click='restriction(actor.objectId,$event)'>{{actor.username}}</md-button>"+
                "</div>"
        }
}).directive('managerApp', function () {
    return {
        restrict: 'EA',
        controller: 'managerController',
        template: "<table class='appTable'>"+
            "<tr>"+
                "<th>App名称</th>"+
                "<th>审核状态</th>"+
                "<th>审核操作</th>"+
            "</tr>"+
            "<tr id='allApp.objectId    ' ng-repeat='allApp in allApps'>"+
                "<td>{{allApp.app_name}}</td>"+
                "<td>{{allApp.status}}</td>"+
                "<td><md-button class='md-raised md-warn' ng-disabled='auditingStatus(allApp.status)' ng-click='agree(allApp.objectId)'>审核通过</md-button>"+
                "<md-button class='md-raised md-warn' ng-click='disagree(allApp.objectId)'>不通过</md-button></td>"+
            "</tr>"+
            "</table>"
    }
});