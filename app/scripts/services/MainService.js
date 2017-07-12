angular.module('AngularScaffold.Services').factory('MainService', ['$http',
    function($http) {
        //var baseUrl = 'https://api.rudnik.co/';
        var baseUrl = 'http://34.201.62.39/';
        return {
            GetBagWords: function(type) {
                return $http.get(baseUrl + `Bag-of-Words/${type}`);
            },
            GetNgrams: function(type) {
                return $http.get(baseUrl + `N-grams/${type}`);
            },
            GetTFIDF: function(type) {
                return $http.get(baseUrl + `TFIDF/${type}`);
            }
        };
    }
]);
