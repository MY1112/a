/**
 * Created by geek on 16-8-17.
 */
app.directive("getMyApp", function () {
    return {
        restrict: 'EA',
        controller: 'myAppController',
        template:
            "<a title='{{result.app_name}}' href='#/App'><md-button class='md-raised md-primary' ng-click='toAppItems(result.id)' ng-repeat='result in results'>{{result.app_name}}</md-button></a>"
    }
});