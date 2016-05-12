angular.module('app-bootstrap').controller('similarArtistController', [
  'userService', 'artistService', '$q',
  function (userService, artistService, $q) {

    const limitTopArtist = 170;
    const user = 'lopeznoeliab';
    const limitSimilar = 20;

    // Chart data
    this.data = {
      nodes: [],
      links: []
    };

    const tooltip = d3.select('#container')
                      .append('div')
                      .attr('class', 'tooltip-force');

    const width = 900;
    const height = 900;

    this.decode = (string) => {
      return _.replace(_.replace(string, '%26', '&'), '%252B', '+');
    };

    this.encode = (string) => {
      return _.replace(_.replace(string, '&', '%26'), '+', '%252B');
    };

    this.checkItem = (itemName, itemsArray) => {
      return _.findIndex(itemsArray, function(o) {
        return o.name === itemName;
      })
    };

    this.getSimilar = (artist, artistNameEncoded, index) => {
      return artistService.getSimilar(artistNameEncoded, limitSimilar)
        .then((similarArtistResponse) => {
          const promises = [];
          const similarArtistArray = similarArtistResponse.data.similarartists.artist;
          angular.forEach(similarArtistArray, (similar) => {
            const artistSimilarIndex = this.checkItem(this.decode(similar.name), this.data.nodes);
            if (artistSimilarIndex !== -1) {
              const newLink = {
                source: index,
                target: artistSimilarIndex,
                value: 1
              };
              this.data.nodes[artistSimilarIndex].links++;
              this.data.nodes[index].links++;
              this.data.nodes[index].similars.push(similar.name);
              this.data.nodes[artistSimilarIndex].similars.push(artist.name);
              this.data.links.push(newLink);
            }
          });
          $q.all(promises).then(() => {
            // console.log('listo')
          });
        });
    };

    // Push new artist to the array
    this.createNewArtist = (topArtistArray) => {
      const promises = [];
      angular.forEach(topArtistArray, (artist, index) => {
        const newArtist = {
          name: this.decode(artist.name),
          playcount: artist.playcount,
          links: 0,
          similars: []
        };
        this.data.nodes.push(newArtist);
        promises.push(this.getSimilar(newArtist, this.encode(artist.name), index));
      });
      $q.all(promises).then(() => {
        this.data.nodes = this.data.nodes.sort(function (a,b) {return d3.descending(a.links, b.links); });
        console.log(this.data);

        const minPlaycount = d3.min(this.data.nodes,
          function(d) {
            return parseInt(d.playcount);
          }
        );
        const maxPlaycount = d3.max(this.data.nodes,
          function(d) {
            return parseInt(d.playcount);
          }
        );

        const colorScale = d3.scale.linear()
                                  .domain([minPlaycount, maxPlaycount])
                                  .range([0, 100]);

        const force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        const svg = d3.select('#container').append('svg')
            .attr('width', width)
            .attr('height', height);

        force
            .nodes(this.data.nodes)
            .links(this.data.links)
            .start();

        const link = svg.selectAll('.link')
            .data(this.data.links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke-width', function(d) {
              return Math.sqrt(d.value);
            });

        const node = svg.selectAll('.node')
            .data(this.data.nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', 5)
            .style('fill', function(d) {
              return d3.rgb('hsl(316,' + colorScale(d.playcount) + '%, 45%)');
            })
            .on('mouseover', function(d) {
              tooltip.style('display', 'none');
              tooltip
                .html('<span>' + d.name + '</span>')
                .style('left', d3.event.pageX + 12 + 'px')
                .style('top', d3.event.pageY - 10 + 'px')
                .style('opacity', 1)
                .style('display', 'block')
                .style('position', 'absolute');
            })
            .on('mouseout', function() {
              tooltip
                .html('')
                .style('display', 'none')
            })
            .call(force.drag);

        node.append('title')
            .text(function(d) {
              return d.name;
            });

        force.on('tick', function() {
          link.attr('x1', function(d) {
            return d.source.x;
          })
          .attr('y1', function(d) {
            return d.source.y;
          })
          .attr('x2', function(d) {
            return d.target.x;
          })
          .attr('y2', function(d) {
            return d.target.y;
          });

          node
            .attr('cx', function(d) {
              return d.x;
            })
            .attr('cy', function(d) {
              return d.y;
            });
        });

      });
    };

    // Get top artists from Last.fm api
    this.getTopArtists = () => {
      userService.getTopArtists(user, limitTopArtist)
      .then((topArtistsResponse) => {
        this.topArtists = topArtistsResponse.data.topartists.artist;
        this.createNewArtist(this.topArtists)
      });
    }

    this.getTopArtists();

  }]);
