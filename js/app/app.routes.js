'use strict';

angular.module('app-bootstrap').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

  // For any unmatched urls
  $urlRouterProvider.otherwise(function ($injector) {
    $injector.get('$state').go('home');
  });

  // Now set up the states
  $stateProvider.state('centered', {
    abstract: true,
    views: {
      main: {
        templateUrl: '../app/components/centered/centered.html'
      }
    }
  }).state('centered.top-tracks', {
    url: '/top-tracks',
    views: {
      content: {
        templateUrl: '../app/components/centered/top_tracks/top_tracks.html',
        controller: 'topTracksController',
        controllerAs: 'topTracksCtrl'
      }
    }
  }).state('centered.top-artists', {
    url: '/top-artists',
    views: {
      content: {
        templateUrl: '../app/components/centered/top_artists/top_artists.html',
        controller: 'topArtistsController',
        controllerAs: 'topArtistsCtrl'
      }
    }
  }).state('centered.minutes-per-day', {
    url: '/minutes-per-day',
    views: {
      content: {
        templateUrl: '../app/components/centered/minutes_per_day/minutes_per_day.html',
        controller: 'minutesPerDayController',
        controllerAs: 'minutesPerDayCtrl'
      }
    }
  }).state('home', {
    url: '/home',
    views: {
      main: {
        templateUrl: '../app/components/home/home.html'
      }
    }
  });

  $locationProvider.html5Mode(true);
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAucm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBUSxNQUFSLENBQWUsZUFBZixFQUFnQyxNQUFoQyxDQUF1QyxDQUNyQyxnQkFEcUMsRUFDbkIsb0JBRG1CLEVBQ0csbUJBREgsRUFFckMsVUFBVSxjQUFWLEVBQTBCLGtCQUExQixFQUE4QyxpQkFBOUMsRUFBaUU7OztBQUcvRCxxQkFBbUIsU0FBbkIsQ0FBNkIsVUFBQyxTQUFELEVBQWU7QUFDMUMsY0FBVSxHQUFWLENBQWMsUUFBZCxFQUF3QixFQUF4QixDQUEyQixNQUEzQjtBQUNELEdBRkQ7OztBQUtBLGlCQUNHLEtBREgsQ0FDUyxVQURULEVBQ3FCO0FBQ2pCLGNBQVUsSUFETztBQUVqQixXQUFPO0FBQ0wsWUFBTTtBQUNKLHFCQUFhO0FBRFQ7QUFERDtBQUZVLEdBRHJCLEVBU0csS0FUSCxDQVNTLHFCQVRULEVBU2dDO0FBQzVCLFNBQUssYUFEdUI7QUFFNUIsV0FBTztBQUNMLGVBQVM7QUFDUCxxQkFBYSx1REFETjtBQUVQLG9CQUFZLHFCQUZMO0FBR1Asc0JBQWM7QUFIUDtBQURKO0FBRnFCLEdBVGhDLEVBbUJHLEtBbkJILENBbUJTLHNCQW5CVCxFQW1CaUM7QUFDN0IsU0FBSyxjQUR3QjtBQUU3QixXQUFPO0FBQ0wsZUFBUztBQUNQLHFCQUFhLHlEQUROO0FBRVAsb0JBQVksc0JBRkw7QUFHUCxzQkFBYztBQUhQO0FBREo7QUFGc0IsR0FuQmpDLEVBNkJHLEtBN0JILENBNkJTLDBCQTdCVCxFQTZCcUM7QUFDakMsU0FBSyxrQkFENEI7QUFFakMsV0FBTztBQUNMLGVBQVM7QUFDUCxxQkFBYSxpRUFETjtBQUVQLG9CQUFZLHlCQUZMO0FBR1Asc0JBQWM7QUFIUDtBQURKO0FBRjBCLEdBN0JyQyxFQXVDRyxLQXZDSCxDQXVDUyxNQXZDVCxFQXVDaUI7QUFDYixTQUFLLE9BRFE7QUFFYixXQUFPO0FBQ0wsWUFBTTtBQUNKLHFCQUFhO0FBRFQ7QUFERDtBQUZNLEdBdkNqQjs7QUFnREEsb0JBQWtCLFNBQWxCLENBQTRCLElBQTVCO0FBQ0QsQ0EzRG9DLENBQXZDIiwiZmlsZSI6ImFwcC9hcHAucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcC1ib290c3RyYXAnKS5jb25maWcoW1xuICAnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJyxcbiAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAvLyBGb3IgYW55IHVubWF0Y2hlZCB1cmxzXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgoJGluamVjdG9yKSA9PiB7XG4gICAgICAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKS5nbygnaG9tZScpO1xuICAgIH0pO1xuXG4gICAgLy8gTm93IHNldCB1cCB0aGUgc3RhdGVzXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSgnY2VudGVyZWQnLCB7XG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vYXBwL2NvbXBvbmVudHMvY2VudGVyZWQvY2VudGVyZWQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ2NlbnRlcmVkLnRvcC10cmFja3MnLCB7XG4gICAgICAgIHVybDogJy90b3AtdHJhY2tzJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL2FwcC9jb21wb25lbnRzL2NlbnRlcmVkL3RvcF90cmFja3MvdG9wX3RyYWNrcy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0b3BUcmFja3NDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RvcFRyYWNrc0N0cmwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdjZW50ZXJlZC50b3AtYXJ0aXN0cycsIHtcbiAgICAgICAgdXJsOiAnL3RvcC1hcnRpc3RzJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL2FwcC9jb21wb25lbnRzL2NlbnRlcmVkL3RvcF9hcnRpc3RzL3RvcF9hcnRpc3RzLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3RvcEFydGlzdHNDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RvcEFydGlzdHNDdHJsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnY2VudGVyZWQubWludXRlcy1wZXItZGF5Jywge1xuICAgICAgICB1cmw6ICcvbWludXRlcy1wZXItZGF5JyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL2FwcC9jb21wb25lbnRzL2NlbnRlcmVkL21pbnV0ZXNfcGVyX2RheS9taW51dGVzX3Blcl9kYXkuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbWludXRlc1BlckRheUNvbnRyb2xsZXInLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnbWludXRlc1BlckRheUN0cmwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvaG9tZScsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICB9XG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
