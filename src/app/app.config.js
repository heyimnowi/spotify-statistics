angular.module('app-bootstrap').config([
  'RestangularProvider', 'configuration', 'localStorageServiceProvider',
  function (RestangularProvider, configuration, localStorageServiceProvider) {

    // Restangular Setup
    RestangularProvider.setBaseUrl(configuration.apiUrl);
    RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });

	  // SpotifyProvider.setClientId('f8aeb1fc014445dda9d7db419bec711a');

    // Local Storage Setup
    localStorageServiceProvider.setPrefix(window.btoa('app-/* @echo environment */'));
  }
]);
