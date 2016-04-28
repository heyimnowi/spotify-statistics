angular.module('app-bootstrap').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('home');
    });

    // Now set up the states
    $stateProvider
      .state('centered', {
        abstract: true,
        views: {
          main: {
            templateUrl: '../app/components/centered/centered.html'
          }
        }
      })
      .state('centered.top-tracks', {
        url: '/top-tracks',
        views: {
          content: {
            templateUrl: '../app/components/centered/top_tracks/top_tracks.html',
            controller: 'topTracksController',
            controllerAs: 'topTracksCtrl'
          }
        }
      })
      .state('centered.top-artists', {
        url: '/top-artists',
        views: {
          content: {
            templateUrl: '../app/components/centered/top_artists/top_artists.html',
            controller: 'topArtistsController',
            controllerAs: 'topArtistsCtrl'
          }
        }
      })
      .state('centered.minutes-per-day', {
        url: '/minutes-per-day',
        views: {
          content: {
            templateUrl: '../app/components/centered/minutes_per_day/minutes_per_day.html',
            controller: 'minutesPerDayController',
            controllerAs: 'minutesPerDayCtrl'
          }
        }
      })
      .state('home', {
        url: '/home',
        views: {
          main: {
            templateUrl: '../app/components/home/home.html'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
