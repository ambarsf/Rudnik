angular.module('AngularScaffold.Controllers')
    .controller('HomeController', ['MainService', function(MainService) {

        var ctrl = this;
        ctrl.loaded = {
            ngrams: false,
            tfidf: false,
            bagwords: false
        };
        var requested = false;
        ctrl.percentage_movies_TFIDF = {
            accuracy: 0.0,
            type: ''
        };
        ctrl.percentage_movies_ngrams = {
            accuracy: 0.0,
            type: ''
        };
        ctrl.percentage_movies_bagwords = {
            accuracy: 0.0,
            type: ''
        };
				ctrl.showChart = function() {
					var index=0;
					$(document).scroll(function(){
						var top = $('#skills').height()-$(window).scrollTop();
						if(top<-300 && ctrl.loaded.ngrams && ctrl.loaded.tfidf && ctrl.loaded.bagwords){
							if(index==0){
								$('.chart').easyPieChart({
									easing: 'easeOutBounce',
									onStep: function(from, to, percent) {
										$(this.el).find('.percent').text(Math.round(percent));
									}
								});

								}
							index++;
						}
					})
        }
        ctrl.loading = function() {
          if (!ctrl.requested){
            ctrl.requested = true;
            console.log("entre");
            MainService.GetBagWords('movies').then(function(response) {
                ctrl.percentage_movies_bagwords = response.data.BagWords;
                ctrl.percentage_movies_bagwords.accuracy = ctrl.percentage_movies_bagwords.accuracy * 100;
                ctrl.loaded.bagwords = true;
                ctrl.CallMatrixBagOfWords(ctrl.percentage_movies_bagwords.cm, ctrl.percentage_movies_bagwords.size);
            });
            MainService.GetNgrams('movies').then(function(response) {
                ctrl.percentage_movies_ngrams = response.data.Ngrams;
                ctrl.percentage_movies_ngrams.accuracy = ctrl.percentage_movies_ngrams.accuracy * 100;
                ctrl.loaded.ngrams = true;
            });
            MainService.GetTFIDF('movies').then(function(response) {
                ctrl.percentage_movies_TFIDF = response.data.TFIDF;
                ctrl.percentage_movies_TFIDF.accuracy = ctrl.percentage_movies_TFIDF.accuracy * 100;
                ctrl.loaded.tfidf = true;
            });
          }
        }
        this.loading();
        //ctrl.loading();
ctrl.showChart();

        var canvas = document.getElementById('nokey'),
            can_w = parseInt(canvas.getAttribute('width')),
            can_h = parseInt(canvas.getAttribute('height')),
            ctx = canvas.getContext('2d');

        var ball = {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                r: 0,
                alpha: 1,
                phase: 0
            },
            ball_color = {
                r: 30,
                g: 149,
                b: 202
            },
            R = 2,
            balls = [],
            alpha_f = 0.03,
            alpha_phase = 0,

            // Line
            link_line_width = 0.8,
            dis_limit = 260,
            add_mouse_point = true,
            mouse_in = false,
            mouse_ball = {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                r: 0,
                type: 'mouse'
            };

        // Random speed
        function getRandomSpeed(pos) {
            var min = -1,
                max = 1;
            switch (pos) {
                case 'top':
                    return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
                    break;
                case 'right':
                    return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
                    break;
                case 'bottom':
                    return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
                    break;
                case 'left':
                    return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
                    break;
                default:
                    return;
                    break;
            }
        }

        function randomArrayItem(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function randomNumFrom(min, max) {
            return Math.random() * (max - min) + min;
        }
        // Random Ball
        function getRandomBall() {
            var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
            switch (pos) {
                case 'top':
                    return {
                        x: randomSidePos(can_w),
                        y: -R,
                        vx: getRandomSpeed('top')[0],
                        vy: getRandomSpeed('top')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
                case 'right':
                    return {
                        x: can_w + R,
                        y: randomSidePos(can_h),
                        vx: getRandomSpeed('right')[0],
                        vy: getRandomSpeed('right')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
                case 'bottom':
                    return {
                        x: randomSidePos(can_w),
                        y: can_h + R,
                        vx: getRandomSpeed('bottom')[0],
                        vy: getRandomSpeed('bottom')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
                case 'left':
                    return {
                        x: -R,
                        y: randomSidePos(can_h),
                        vx: getRandomSpeed('left')[0],
                        vy: getRandomSpeed('left')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
            }
        }

        function randomSidePos(length) {
            return Math.ceil(Math.random() * length);
        }

        // Draw Ball
        function renderBalls() {
            Array.prototype.forEach.call(balls, function(b) {
                if (!b.hasOwnProperty('type')) {
                    ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')';
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        }

        // Update balls
        function updateBalls() {
            var new_balls = [];
            Array.prototype.forEach.call(balls, function(b) {
                b.x += b.vx;
                b.y += b.vy;

                if (b.x > -(50) && b.x < (can_w + 50) && b.y > -(50) && b.y < (can_h + 50)) {
                    new_balls.push(b);
                }

                // alpha change
                b.phase += alpha_f;
                b.alpha = Math.abs(Math.cos(b.phase));
            });

            balls = new_balls.slice(0);
        }

        // loop alpha
        function loopAlphaInf() {

        }

        // Draw lines
        function renderLines() {
            var fraction, alpha;
            for (var i = 0; i < balls.length; i++) {
                for (var j = i + 1; j < balls.length; j++) {

                    fraction = getDisOf(balls[i], balls[j]) / dis_limit;

                    if (fraction < 1) {
                        alpha = (1 - fraction).toString();

                        ctx.strokeStyle = 'rgba(150,150,150,' + alpha + ')';
                        ctx.lineWidth = link_line_width;

                        ctx.beginPath();
                        ctx.moveTo(balls[i].x, balls[i].y);
                        ctx.lineTo(balls[j].x, balls[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        // calculate distance between two points
        function getDisOf(b1, b2) {
            var delta_x = Math.abs(b1.x - b2.x),
                delta_y = Math.abs(b1.y - b2.y);

            return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
        }

        // add balls if there a little balls
        function addBallIfy() {
            if (balls.length < 20) {
                balls.push(getRandomBall());
            }
        }

        // Render
        function render() {
            ctx.clearRect(0, 0, can_w, can_h);

            renderBalls();

            renderLines();

            updateBalls();

            addBallIfy();

            window.requestAnimationFrame(render);
        }

        // Init Balls
        function initBalls(num) {
            for (var i = 1; i <= num; i++) {
                balls.push({
                    x: randomSidePos(can_w),
                    y: randomSidePos(can_h),
                    vx: getRandomSpeed('top')[0],
                    vy: getRandomSpeed('top')[1],
                    r: R,
                    alpha: 1,
                    phase: randomNumFrom(0, 10)
                });
            }
        }
        // Init Canvas
        function initCanvas() {
            canvas.setAttribute('width', window.innerWidth);
            canvas.setAttribute('height', window.innerHeight);

            can_w = parseInt(canvas.getAttribute('width'));
            can_h = parseInt(canvas.getAttribute('height'));
        }
        window.addEventListener('resize', function(e) {
            initCanvas();
        });

        function goMovie() {
            initCanvas();
            initBalls(20);
            window.requestAnimationFrame(render);
        }
        goMovie();

        // Mouse effect
        canvas.addEventListener('mouseenter', function() {
            mouse_in = true;
            balls.push(mouse_ball);
        });
        canvas.addEventListener('mouseleave', function() {
            mouse_in = false;
            var new_balls = [];
            Array.prototype.forEach.call(balls, function(b) {
                if (!b.hasOwnProperty('type')) {
                    new_balls.push(b);
                }
            });
            balls = new_balls.slice(0);
        });
        canvas.addEventListener('mousemove', function(e) {
            var e = e || window.event;
            mouse_ball.x = e.pageX;
            mouse_ball.y = e.pageY;
        });

        // Matrix Stuff //
        ctrl.CallMatrixBagOfWords = function(matrix, size){

          var confusionMatrix = []
          var index = 0;
          for (var i = 0; i < size[0]; i++) {
            var temp = []
            for (var j = 0; j < size[1]; j++) {
              temp.push(Math.round(matrix[index]*100))
              index++;
            }
            confusionMatrix.push(temp);
          }

  				var tp = confusionMatrix[0][0];
  				var fn = confusionMatrix[0][1];
  				var fp = confusionMatrix[1][0];
  				var tn = confusionMatrix[1][1];

  				var p = tp + fn;
  				var n = fp + tn;

  				var accuracy = (tp+tn)/(p+n);
  				var f1 = 2*tp/(2*tp+fp+fn);
  				var precision = tp/(tp+fp);
  				var recall = tp/(tp+fn);

  				accuracy = Math.round(accuracy * 100) / 100
  				f1 = Math.round(f1 * 100) / 100
  				precision = Math.round(precision * 100) / 100
  				recall = Math.round(recall * 100) / 100

  				var computedData = [];
  				computedData.push({"F1":f1, "PRECISION":precision,"RECALL":recall,"ACCURACY":accuracy});

  				var labels = ['Class A', 'Class B'];
  				ctrl.Matrix({
  					container : '#container',
  					data      : confusionMatrix,
  					labels    : labels,
  					start_color : '#ffffff',
  					end_color : '#1e95ca'
  				});

  		// rendering the table
  				var table = ctrl.tabulate(computedData, ["F1", "PRECISION","RECALL","ACCURACY"]);
      }

        var margin = {top: 50, right: 50, bottom: 100, left: 100};

        ctrl.Matrix = function(options) {
        	    var width = 150,
        	    height = 150,
        	    data = options.data,
        	    container = options.container,
        	    labelsData = options.labels,
        	    startColor = options.start_color,
        	    endColor = options.end_color;

        	if(!data){
        		throw new Error('Please pass data');
        	}

        	if(!Array.isArray(data) || !data.length || !Array.isArray(data[0])){
        		throw new Error('It should be a 2-D array');
        	}

          var maxValue = d3.max(data, function(layer) { return d3.max(layer, function(d) { return d; }); });
          var minValue = d3.min(data, function(layer) { return d3.min(layer, function(d) { return d; }); });

        	var numrows = data.length;
        	var numcols = data[0].length;

        	var svg = d3.select(container).append("svg")
        	    .attr("width", width + margin.left + margin.right)
        	    .attr("height", height + margin.top + margin.bottom)
        		.append("g")
        	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        	var background = svg.append("rect")
        	    .style("stroke", "white")
        	    .style("stroke-width", "2px")
        	    .attr("width", width)
        	    .attr("height", height);

        	var x = d3.scale.ordinal()
        	    .domain(d3.range(numcols))
        	    .rangeBands([0, width]);

        	var y = d3.scale.ordinal()
        	    .domain(d3.range(numrows))
        	    .rangeBands([0, height]);

        	var colorMap = d3.scale.linear()
        	    .domain([minValue,maxValue])
        	    .range([startColor, endColor]);

        	var row = svg.selectAll(".row")
        	    .data(data)
        	  	.enter().append("g")
        	    .attr("class", "row")
        	    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

        	var cell = row.selectAll(".cell")
        	    .data(function(d) { return d; })
        			.enter().append("g")
        	    .attr("class", "cell")
        	    .attr("transform", function(d, i) { return "translate(" + x(i) + ", 0)"; });

        	cell.append('rect')
        	    .attr("width", x.rangeBand())
        	    .attr("height", y.rangeBand())
        	    .style("stroke-width", 0);

            cell.append("text")
        	    .attr("dy", ".32em")
        	    .attr("x", x.rangeBand() / 2)
        	    .attr("y", y.rangeBand() / 2)
        	    .attr("text-anchor", "middle")
        	    .style("fill", function(d, i) { return d >= maxValue/2 ? 'white' : 'black'; })
        	    .text(function(d, i) { return d; });

        	row.selectAll(".cell")
        	    .data(function(d, i) { return data[i]; })
        	    .style("fill", colorMap);

        	var labels = svg.append('g')
        		.attr('class', "labels");

        	var columnLabels = labels.selectAll(".column-label")
        	    .data(labelsData)
        	    .enter().append("g")
        	    .attr("class", "column-label")
        	    .attr("transform", function(d, i) { return "translate(" + x(i) + "," + height + ")"; });

        	columnLabels.append("line")
        		.style("stroke", "white")
        	    .style("stroke-width", "1px")
        	    .attr("x1", x.rangeBand() / 2)
        	    .attr("x2", x.rangeBand() / 2)
        	    .attr("y1", 0)
        	    .attr("y2", 5);

        	columnLabels.append("text")
        	    .attr("x", 30)
        	    .attr("y", y.rangeBand() / 2)
        	    .attr("dy", ".22em")
        	    .attr("text-anchor", "end")
        	    .attr("transform", "rotate(-60)")
        	    .text(function(d, i) { return d; });

        	var rowLabels = labels.selectAll(".row-label")
        	    .data(labelsData)
        	  .enter().append("g")
        	    .attr("class", "row-label")
        	    .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });

        	rowLabels.append("line")
        		.style("stroke", "white")
        	    .style("stroke-width", "1px")
        	    .attr("x1", 0)
        	    .attr("x2", -5)
        	    .attr("y1", y.rangeBand() / 2)
        	    .attr("y2", y.rangeBand() / 2);

        	rowLabels.append("text")
        	    .attr("x", -8)
        	    .attr("y", y.rangeBand() / 2)
        	    .attr("dy", ".32em")
        	    .attr("text-anchor", "end")
        	    .text(function(d, i) { return d; });

            var y = d3.scale.linear()
            .range([height, 0])
            .domain([minValue, maxValue]);

            var yAxis = d3.svg.axis()
            .scale(y)
            .orient("right");

            key.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(41," + margin.top + ")")
            .call(yAxis)

        }

        // The table generation function
        ctrl.tabulate = function(data, columns) {
            var table = d3.select("#dataView").append("table")
                    .attr("style", "margin-left: " + margin.left +"px"),
                thead = table.append("thead"),
                tbody = table.append("tbody");

            // append the header row
            thead.append("tr")
                .selectAll("th")
                .data(columns)
                .enter()
                .append("th")
                    .text(function(column) { return column; });

            // create a row for each object in the data
            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");

            // create a cell in each row for each column
            var cells = rows.selectAll("td")
                .data(function(row) {
                    return columns.map(function(column) {
                        return {column: column, value: row[column]};
                    });
                })
                .enter()
                .append("td")
                .attr("style", "font-family: Courier") // sets the font style
                    .html(function(d) { return d.value; });

            return table;
        }

    }]);
