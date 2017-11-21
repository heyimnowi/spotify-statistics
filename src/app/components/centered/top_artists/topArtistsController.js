angular.module('app-bootstrap').controller('topArtistsController', [
    'userService', '$q', '$rootScope',
    function(userService, $q, $rootScope) {

        const limitTopArtist = 10;
        const limitTracks = 200;
        const user = 'lopeznoeliab';
        let maxArtist = 0;
        let minArtist = 0;
        const width = window.innerWidth;
        const height = window.innerHeight - 150;

        $rootScope.showSpinner = true;

        this.chart = false;

        // Chart data
        this.data = [{
            name: 'Top artists',
            color: '#FFF',
            size: 10,
            children: []
        }];

        // Chart options
        this.options = {
            chart: {
                type: 'sunburstChart',
                width: width,
                height: height,
                duration: 250,
                tooltip: {
                    contentGenerator: function(d) {
                        return '<div class="circle-reference" style="background-color:' + d.data.color + '"></div>' +
                            '<span class="title">' + d.data.name +
                            '</span><span class="data">' + d.data.size + '</span>';
                    }
                }
            }
        };

        this.encode = (string) => {
            return _.replace(_.replace(string, '&', '%26'), '+', '%252B');
        };

        this.checkItem = (itemName, itemsArray) => {
            return _.findIndex(itemsArray, function(o) {
                return o.name === itemName;
            })
        };

        this.setColors = () => {
            angular.forEach(this.data[0].children, (artist, index) => {
                const minAlbum = d3.min(artist.children,
                    function(d) {
                        return parseInt(d.size);
                    }
                );
                const maxAlbum = d3.max(artist.children,
                    function(d) {
                        return parseInt(d.size);
                    }
                );
                const colorAlbumScale = d3.scale.linear()
                    .domain([minAlbum, maxAlbum])
                    .range([50, 100]);
                _.each(artist.children, function(album) {
                    album.colorCode = colorAlbumScale(album.size);
                    album.color = d3.rgb('hsl(' + artist.colorCode + ',' + album.colorCode + '%, 50%)');
                    const maxTrack = d3.max(album.children,
                        function(d) {
                            return parseInt(d.size);
                        }
                    );
                    const minTrack = d3.min(artist.children,
                        function(d) {
                            return parseInt(d.size);
                        }
                    );
                    const colorTrackScale = d3.scale.linear()
                        .domain([minTrack, maxTrack])
                        .range([30, 70]);
                    _.each(album.children, function(track) {
                        track.color = d3.rgb('hsl(' + artist.colorCode + ',' + album.colorCode + '%, ' + colorTrackScale(track.size) + '%)');
                    });
                });
            });
        };

        this.createArtistTracks = (album, track, colorIndex) => {
            const trackName = track.name;
            const trackIndex = this.checkItem(trackName, album.children);
            // The song doesnt exist
            if (trackIndex === -1) {
                const newTrack = {
                    name: track.name,
                    colorCode: '',
                    color: '',
                    size: 1
                };
                album.children.push(newTrack);
            } else {
                album.children[trackIndex].size++;
            }
            album.size++;
        };

        var white = d3.rgb("white"),
            black = d3.rgb("black"),
            width2 = d3.select("canvas").property("width");

        var channels = {
            h: {
                scale: d3.scale.linear().domain([60, 320]).range([0, width2]),
                x: width2 / 2
            },
            s: {
                scale: d3.scale.linear().domain([0, 1]).range([0, width2]),
                x: width2 / 2
            },
            l: {
                scale: d3.scale.linear().domain([0, 1]).range([0, width2]),
                x: width2 / 2
            }
        };

        var channel = d3.selectAll(".channel")
            .data(d3.entries(channels));

        var canvas = channel.select("canvas")
            .each(render);

        function render(d) {
            var width = this.width,
                context = this.getContext("2d"),
                image = context.createImageData(width, 1),
                i = -1;

            var current = d3.hsl(
                channels.h.scale.invert(channels.h.x),
                channels.s.scale.invert(channels.s.x),
                channels.l.scale.invert(channels.l.x)
            );

            for (var x = 0, v, c; x < width; ++x) {
                current[d.key] = d.value.scale.invert(x);
                current.s = 100;
                c = d3.rgb(current);
                image.data[++i] = c.r;
                image.data[++i] = c.g;
                image.data[++i] = c.b;
                image.data[++i] = 255;
            }

            context.putImageData(image, 0, 0);
        }


        this.createArtistAlbums = (artist, artistNameEncoded, colorIndex) => {
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
                                colorCode: '',
                                color: '',
                                size: 0,
                                children: []
                            };
                            artist.children.push(newAlbum);
                            albumIndex = artist.children.length - 1;
                        }
                        this.createArtistTracks(artist.children[albumIndex], track, colorIndex);
                    });
                });
        };

        // Push new artist to the array
        this.createNewArtist = (topArtistArray) => {
            const promises = [];
            const colorArtistScale = d3.scale.linear()
                .domain([minArtist, maxArtist])
                .range([60, 320]);
            angular.forEach(topArtistArray, (artist, index) => {
                const artistColor = d3.rgb('hsl(' + Math.floor(colorArtistScale(artist.playcount)) + ', 100%, 50%)');
                const newArtist = {
                    name: artist.name,
                    size: artist.playcount,
                    colorCode: Math.floor(colorArtistScale(artist.playcount)),
                    color: artistColor,
                    children: []
                };
                this.data[0].children.push(newArtist);
                promises.push(this.createArtistAlbums(this.data[0].children[index], this.encode(artist.name), index));
            });
            $q.all(promises).then(() => {
                this.setColors();
                this.chart = true;
                $rootScope.showSpinner = false;
            });
        };

        // Get top artists from Last.fm api
        this.getTopArtists = () => {
            userService.getTopArtists(user, limitTopArtist)
                .then((topArtistsResponse) => {
                    minArtist = d3.min(topArtistsResponse.data.topartists.artist,
                        function(d) {
                            return parseInt(d.playcount);
                        }
                    );
                    maxArtist = d3.max(topArtistsResponse.data.topartists.artist,
                        function(d) {
                            return parseInt(d.playcount);
                        }
                    );
                    this.topArtists = topArtistsResponse.data.topartists.artist;
                    this.createNewArtist(this.topArtists)
                });
        }

        this.getTopArtists();

    }
]);
