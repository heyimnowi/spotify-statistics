angular.module('app-bootstrap').controller('minutesPerDayController', [
  'userService', 'trackService',
  function (userService, trackService) {

    const user = 'lopeznoeliab';
    const limitTracks = 200;
    this.tracks = [];
    this.data = [];

    this.checkItem = (itemName, itemsArray) => {
      return _.findIndex(itemsArray, function(o) {
        return o.name === itemName;
      })
    };

    this.addNewTrack = (dateIndex, track) => {
      debugger;
      let trackIndex = this.checkItem(track.name, this.tracks);
      if (trackIndex === -1) {
        trackService.getTrackInfo(track.name, track.artist.name)
          .then((trackInfoResponse) => {
            const newTrack = {
              name: track.name,
              duration: 0
            }
            this.tracks.push(newTrack);
            trackIndex = this.tracks.length - 1;
          });
      }
      this.data[dateIndex].minutes += this.tracks[trackIndex].duration;
    };

    this.getTracks = (page) => {
      userService.getRecentTracks(page, limitTracks, user)
        .then((recentTracksResponse) => {
          const arrayTracks = recentTracksResponse.data.recenttracks.track;
          angular.forEach(arrayTracks, (track) => {
            const date = track.date['#text'].split(',')[0];
            let dateIndex = this.checkItem(date, this.data);
            debugger;
            if (dateIndex === -1) {
              const newDate = {
                name: date,
                minutes: 0
              };
              this.data.push(newDate);
              dateIndex = this.data.length - 1;
            }
            this.addNewTrack(dateIndex, track);
          });
          if (recentTracksResponse.data.recenttracks['@attr'].totalPages < page) {
            this.getTracks(page + 1);
          }
        });
    };

    trackService.getTrackInfo('Mark my words', 'Justin Bieber')
      .then((trackInfoResponse) => {
        console.log(trackInfoResponse);
      });
    this.getTracks(1);

  }]);
