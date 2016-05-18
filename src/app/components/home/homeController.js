angular.module('app-bootstrap').controller('HomeController', [
  'userService', '$scope'
  function (userService, $scope) {

    this.average = 0;
    this.tracks = 0;
    this.average = 47;
    const user = 'lopeznoeliab';
    $scope.url = '';

    userService.getRecentTracks(1, 1, user)
      .then((recentTracksResponse) => {
        this.tracks = recentTracksResponse.data.recenttracks['@attr'].total;
      });

    userService.getTopArtists(user, 1)
      .then((topArtistResponse) => {
        this.artist = topArtistResponse.data.topartists['@attr'].total;
        this.url = topArtistResponse.data.topartists.artist[0].image[4]['#text'];
      });

    userService.getRecentTracks(1, 1, user)
      .then((recentTracksResponse) => {
        this.tracks = recentTracksResponse.data.recenttracks['@attr'].total;
      });

  }]);
