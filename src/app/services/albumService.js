angular.module('app-bootstrap').factory('albumService', [
  '$http',
  function ($http) {

    return {
      // Get the metadata and tracklist for an album on Last.fm
      getAlbumInfo: (artist, album, user) => {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=album.getinfo' +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&artist=' + artist +
          '&album=' + album +
          '&format=json' +
          '&user=lopeznoeliab');
      },
      // Get the top tags for an album on Last.fm, ordered by popularity.
      getAlbumTopTags: function (artist, album) {
        return $http.post('http://ws.audioscrobbler.com/2.0/?' +
          'method=album.gettoptags' +
          '&album=' + album +
          '&artist=' + artist +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json');
      }
    };

  }]);
