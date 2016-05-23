angular.module('app-bootstrap').factory('userService', [
  '$http',
  function ($http) {

    return {
      // Get the top tracks listened to by a user.
      getTopTracks: function (limit, user) {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=user.gettoptracks' +
          '&user=' + user +
          '&limit=' + limit +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json');
      },
      // Get a list of the recent tracks listened to by this user. Also includes the currently playing
      // track with the nowplaying="true" attribute if the user is currently listening.
      getRecentTracks: (page, limit, user) => {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=user.getrecenttracks' +
          '&user=' + user +
          '&page=' + page +
          '&limit=' + limit +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json');
      },
      // Get the top artists listened to by a user
      getTopArtists: function (user, limit) {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=user.gettopartists' +
          '&user=' + user +
          '&limit=' + limit +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json');
      },
      // Get a list of tracks by a given artist scrobbled by this user, including scrobble time.
      getArtistTracks: (user, artist, limit) => {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=user.getartisttracks' +
          '&user=' + user +
          '&artist=' + artist +
          '&limit=' + limit +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json');
      }
    };

  }]);
