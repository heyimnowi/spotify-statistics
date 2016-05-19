angular.module('app-bootstrap').controller('minutesPerDayController', [
  'userService', 'trackService',
  function (userService, trackService) {

    const user = 'lopeznoeliab';
    const limitTracks = 200;
    // const tracksInfo = [];
    let currentPage = 1;
    this.data = [];

    this.checkItem = (itemName, itemsArray) => {
      return _.findIndex(itemsArray, function(o) {
        return o.name === itemName;
      })
    };

    this.encode = (string) => {
      return _.replace(_.replace(string, '&', '%26'), '+', '%252B');
    };

    this.addNewTrack = (dateIndex, track) => {
      trackService.getTrackInfo(track.name, this.encode(track.artist['#text']))
        .then((trackInfoResponse) => {
          if(angular.isDefined(trackInfoResponse.data.track)){
            const duration = trackInfoResponse.data.track.duration / 60000;
            this.data[dateIndex].minutes += duration;
          }
        });
    };

    this.getTracks = () => {
      userService.getRecentTracks(currentPage, limitTracks, user)
        .then((recentTracksResponse) => {
          const arrayTracks = recentTracksResponse.data.recenttracks.track;
          angular.forEach(arrayTracks, (track) => {
            if (angular.isUndefined(track['@attr'])) {
              const date = track.date['#text'].split(',')[0];
              let dateIndex = this.checkItem(date, this.data);
              if (dateIndex === -1) {
                const newDate = {
                  name: date,
                  minutes: 0
                };
                this.data.push(newDate);
                dateIndex = this.data.length - 1;
              }
              this.addNewTrack(dateIndex, track);
            }
          });
          if (recentTracksResponse.data.recenttracks['@attr'].totalPages > currentPage) {
            this.getTracks(++currentPage);
          }
        });
    };

    this.getTracks();

  }]);
