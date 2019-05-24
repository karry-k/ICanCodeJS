var app = window.angular.module('app', [])

app.factory('leaderboardFetcher', leaderboardFetcher)
app.controller('mainCtrl', mainCtrl)

function leaderboardFetcher ($http) {

  var API_ROOT = 'leaderboard'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    }
  }

}

function mainCtrl ($scope, leaderboardFetcher) {

  $scope.leaderboard = []

  leaderboardFetcher.get()
    .then(function (data) {
      $scope.leaderboard = data
    })
}
