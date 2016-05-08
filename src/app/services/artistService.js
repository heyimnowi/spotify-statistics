angular.module('app-bootstrap').factory('artistService', [
  '$http',
  function ($http) {

    return {
      // Get the metadata for an artist. Includes biography
      getArtistInfo: (artistName, user) => {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=artist.getinfo' +
          '&artist=' + artistName +
          '&user=' + user +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' + 
          '&format=json');
      },
      // Get the top tags for an artist on Last.fm, ordered by popularity.
      getAritstTopTags: (artist) => {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=artist.getTopTags' +
          '&artist=' + artist +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json');
      },
      getSimilar: (artist, limit) => {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=artist.getsimilar' +
          '&artist=' + artist +
          '&limit=' + limit +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json');
      },
    };

  }]);
