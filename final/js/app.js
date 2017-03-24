var app = angular.module('app', ['ui.router','couchdb','contentFilters']);

app.run(function($rootScope) {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser){
        loggedInUser = JSON.parse(loggedInUser);
        $rootScope.loggedIn = true;
        $rootScope.userRole = loggedInUser.role;
        console.log("loggedInUser: "+loggedInUser);
    }
});

angular.element(document).ready(function () {
    if (location.hash === '') {
        location.hash = '/';
    }
});
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'parts/home.html',
        controller:'homeController'
    });
    $stateProvider.state('detail', {
        url: '/detail/:docId',
        templateUrl: 'parts/detail.html',
        controller: 'detailCtr'
            
        
    });
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'parts/admin.html',
        controller: 'adminController'
    });
});

angular.element(document).ready(function () {
    if (location.hash === '') {
        location.hash = '/detail';
    }
});
angular.element(document).ready(function () {
    if (location.hash === '') {
        location.hash = '/admin';
    }
});
