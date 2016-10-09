angular.module('tagcloud', [])
    .controller('tagcloudController', function($scope, $http) {

        $scope.host = 'http://localhost:8080';
        $scope.hideError = true;
        $scope.tag = '#fun';
        $scope.rss = 'https://www.avanza.se/forum/forum/rss/8';

        $scope.getUsingHashTag = function() {
            $http.get($scope.host + '/tag-cloud-twitter?source='+encodeURIComponent($scope.tag)).then(
                function(response) {
                    createCloud(response.data);
            }, function() {
                    showError();
            })};

        $scope.getUsingRss = function() {
            $http.get($scope.host + '/tag-cloud-rss?source='+encodeURIComponent($scope.rss)).then(
                function(response) {
                    createCloud(response.data);
            }, function() {
                showError();
            })};

        function showError() {
            $scope.hideError = false;
            setTimeout(function() {
                $scope.hideError = true;
            }, 3000);
        }

        function createCloud(words) {
            clearCloud();
            d3.wordcloud()
                .size([800, 400])
                .selector('#cloud')
                .words(
                    words.map(function (item) {
                        var newObj = {};
                        newObj.text = item.word;
                        newObj.size = item.weight;
                        return newObj;
                    }))
                .start();
        }

        function clearCloud() {
            var myEl = angular.element(document.querySelector('#cloud'));
            myEl.empty();
        }

    });