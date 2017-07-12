angular.module('AngularScaffold.Services').factory('MainService', ['$http',
    function($http) {

        $http.defaults.withCredentials = true;
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
        $http.defaults.headers.common['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS";
        $http.defaults.headers.common['Access-Control-Allow-Headers'] = "Authorization";
        var baseUrl = 'https://api.rudnik.co/';
        var baseUrl = 'http://34.201.62.39/';
        return {
            GetBagWords: function(type) {
                return $http.get(baseUrl + `Bag-of-Words/${type}`);
            }
        };
    }
]);
