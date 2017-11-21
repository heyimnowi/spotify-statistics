angular.module('app-bootstrap').controller('topTracksController', [
  'userService', '$rootScope',
  function (userService, $rootScope) {

    const data = [];
    const limitTracks = 20;

    const width = 300;
    const height = 300;
    const a = width / 2;
    const b = height / 2;
    $rootScope.showSpinner = true;

    const scale = d3.scale.linear()
                    .domain([1, 25])
                    .range([1, 300]);

    const color = d3.scale.quantile()
                  .domain([0, 20, 40, 60, 80, 100])
                  .range(["#CBFFCE", "#90E0AB", "#0FC1A1", "#106EE8", "#07588A", "#0C056D"]);

    const radius = Math.min(width-100,height-100)/2;

    const arc = d3.svg.arc()
                .outerRadius(radius -230)
                .innerRadius(radius - 50)
                .cornerRadius(20);

    const arcOver = d3.svg.arc()
                    .outerRadius(radius +50)
                    .innerRadius(0);

    const playcountScale = d3.scale.linear()
                                    .domain([0, 30])
                                    .range([0, 1000000]);

    const svg = d3.select("#container").append("svg")
                .attr("viewBox", "0 0 " + width + " " + height / 2)
                .append("g")
                .attr("transform","translate(150,75)");

    const div = d3.select("body")
            .append("div")
            .attr("class", "tooltip-1");

    userService.getTopTracks(limitTracks, 'lopeznoeliab')
      .then((response) => {
        angular.forEach(response.data.toptracks.track, (track, index) => {
          const newTrack = {
            name: track.name,
            artist: track.artist.name,
            playcount: track.playcount,
            image: track.image[1]['#text']
          };
          data.push(newTrack);
        });

        const div = d3.select("body")
                .append("div")
                .attr("class", "tooltip");

        const pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d){return d.playcount;})
                    .padAngle(.02);

        const g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter()
                    .append("g")
                    .attr("class","arc")
                    .on("mousemove",function(d){
                      const mouseVal = d3.mouse(this);
                      div.style("display","none");
                      div
                        .html("<p><span>Track:</span>" + d.data.name +"</p>"+
                              "<p><span>Artist:</span>" + d.data.artist + "</p>"+
                              "<p><span>Playcount:</span>" + d.data.playcount + "</p>")
                          .style("left", (d3.event.pageX+12) + "px")
                          .style("top", (d3.event.pageY-10) + "px")
                          .style("opacity", 1)
                          .style("display","block")
                          .style("position", "absolute");
                      })
                    .on("mouseout",function(){div.html(" ").style("display","none");});

        g.append("path")
          .attr("d",arc)
          .style("fill",function(d){ return color(d.data.playcount);});

        $rootScope.showSpinner = false;

      });

  }]);
