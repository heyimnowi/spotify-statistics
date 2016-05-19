angular.module('app-bootstrap').factory('trackService', [
  '$http',
  function ($http) {

    return {
      // Get the metadata for a track on Last.fm
      getTrackInfo: (track, artist) => {
        return $http.post('http://ws.audioscrobbler.com/2.0/' +
          '?method=track.getInfo' +
          '&api_key=42188804bb4145d42e9cfbd2e260c53c' +
          '&format=json' +
          '&artist=' + artist +
          '&track=' + track)
      }
    };

  }]);
