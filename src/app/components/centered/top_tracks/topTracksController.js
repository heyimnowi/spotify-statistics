angular.module('app-bootstrap').controller('topTracksController', [
  'trackService',
  function (trackService) {

    trackService.getTopTracks(1, 'lopeznoeliab')
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        this.loginError = true;
      });

  }]);
