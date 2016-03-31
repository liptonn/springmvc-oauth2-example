'use strict';

var app = angular.module('aplikasiOauthClient', []);

app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.controller('NavCtrl', function($scope, $window, $location, $http) {
    $scope.authUrl = 'http://localhost:8080/authorization-server/oauth/authorize?client_id=jsclient&response_type=token&scope=write';

    $scope.token;

    $scope.login = function() {
        $window.location.href = $scope.authUrl;
    };

    $scope.getTokenFromUrl = function() {
        var token;
        var hashParams = $location.hash();
        if (!hashParams) {
            console.log("No token in URL");
            return;
        }
        console.log(hashParams);
        var eachParam = hashParams.split('&');
        for (var i = 0; i < eachParam.length; i++) {
            var param = eachParam[i].split('=');
            if ('access_token' === param[0]) {
                token = param[1];
            }
        }
        console.log("Access Token : " + token);
        if (token) {
            $window.sessionStorage.setItem('token', token);
        }
        $location.hash('');
    };

    $scope.checkLogin = function() {
        if ($window.sessionStorage.getItem('token')) {
            $scope.token = $window.sessionStorage.getItem('token');
            return;
        }
        $scope.getTokenFromUrl();
        if ($window.sessionStorage.getItem('token')) {
            $scope.token = $window.sessionStorage.getItem('token');
            return;
        }

        $scope.login();
    };

    $scope.checkLogin();
});

app.controller('OauthCtrl', function($scope, $http, $window) {
    $scope.currentUser;
    $scope.accessToken = $window.sessionStorage.getItem('token');

    $scope.adminApi = function() {
        if (!$scope.accessToken) {
            console.log("have no token");
            return;
        }

        //call Admin API
        $http.get('http://localhost:8081/resource-server/api/admin?access_token=' + $scope.accessToken)
            .success(function(data) {
                $scope.adminOutput = data;
                $scope.currentUser = data.user;
            }).error(function(data, status) {
                console.log("Error : " + status + " - " + data);
                $scope.adminOutput = data;
            });
    };

    $scope.staffApi = function() {
        if (!$scope.accessToken) {
            console.log("Have no token");
            return;
        }

        //call Staff API
        $http.get('http://localhost:8081/resource-server/api/staff?access_token=' + $scope.accessToken)
            .success(function(data) {
                $scope.staffOutput = data;
                $scope.currentUser = data.user;
            }).error(function(data, status) {
                console.log("Error : " + status + " - " + data);
                $scope.staffOutput = data;
            });
    };
});
