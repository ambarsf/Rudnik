angular.module('AngularScaffold.Services').factory('MainService', ['$http',
    function($http) {
        $http.defaults.withCredentials = true;
        var baseUrl = 'https://api.rudnik.co/';
        return {
            GetBagWords: function(data) {
                return $http.post(baseUrl + `Bag-of-Words/${data.type}`);
            }
        };
    }
]);
