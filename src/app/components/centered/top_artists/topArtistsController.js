angular.module('app-bootstrap').controller('topArtistsController', [
  'userService', '$scope', '$q',
  function (userService, $scope, $q) {

    const limitTopArtist = 10;
    const limitTracks = 50;
    const user = 'lopeznoeliab';
    this.chart = false;

    // Chart data
    this.data = [{
      name: 'Top artists',
      children: []
    }];

    // Chart options
    this.options = {
      chart: {
        type: 'sunburstChart',
        height: 450,
        color: d3.scale.category10(),
        duration: 250,
        objectEquality: true
      }
    };

    this.encode = (string) => {
      return _.replace(_.replace(string, '&', '%2527'), '+', '%252B');
    };

    this.checkItem = (itemName, itemsArray) => {
      return _.findIndex(itemsArray, function(o) {
        return o.name === itemName;
      })
    };

    this.createArtistTracks = (album, track) => {
      console.log("print track");
      const trackName = track.name;
      const trackIndex = this.checkItem(trackName, album.children);
      // The song doesnt exist
      if (trackIndex === -1) {
        const newTrack = {
          name: track.name,
          size: 1
        }
        album.children.push(newTrack);
      } else {
        album.children[trackIndex].size++;
      }
      album.size++;
    };

    this.createArtistAlbums = (artist, artistNameEncoded) => {
      return userService.getArtistTracks(user, artistNameEncoded, limitTracks)
        .then((artistTracksResponse) => {
          const artistTracks = artistTracksResponse.data.artisttracks.track;
          angular.forEach(artistTracks, (track) => {
            const albumName = track.album['#text'];
            let albumIndex = this.checkItem(albumName, artist.children);
            // The album doesnt exist
            if (albumIndex === -1) {
              const newAlbum = {
                name: albumName,
                size: 0,
                children: []
              };
              artist.children.push(newAlbum);
              albumIndex = artist.children.length - 1;
            }
            this.createArtistTracks(artist.children[albumIndex], track);
          });
        });
    };

    // Push new artist to the array
    this.createNewArtist = (topArtistArray) => {
      const promises = [];
      angular.forEach(topArtistArray, (artist, index) => {
        const newArtist = {
          name: artist.name,
          size: artist.playcount,
          children: []
        };
        this.data[0].children.push(newArtist);
        promises.push(this.createArtistAlbums(this.data[0].children[index], this.encode(artist.name)));
      });
      $q.all(promises).then((values) => {
        this.chart = true;
      });
    };

    // Get top artists from Last.fm api
    this.getTopArtists = () => {
      userService.getTopArtists(user, limitTopArtist)
      .then((topArtistsResponse) => {
        this.topArtists = topArtistsResponse.data.topartists.artist;
        this.createNewArtist(this.topArtists)
        console.log(this.data);
      });
    }
  
    this.getTopArtists();

  }]);
