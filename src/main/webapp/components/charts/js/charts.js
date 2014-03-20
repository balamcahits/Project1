define([], function() {

	Clazz.createPackage("com.components.charts.js");

	Clazz.com.components.charts.js.Charts = Clazz.extend(Clazz.WidgetWithTemplate, {
		/***
		 * Called in initialization time of this class 
		 *
		 * @config: configurations for this listener
		 */
		initialize : function(config) {
			var self = this;
		},
		
		lineChart : function(placeholder, data, color) {
			$.plot(placeholder, [data], {
				series : {
					color: color
				}	
			});
		},
	
		lineChartTime : function(placeholder, data, color) {
			var plot = $.plot(placeholder, [data], {
				xaxis: {
					mode: "time"
				},
				series : {
					color: color
				}	
			});
		},

		pieChart : function(placeholder, data, show, hoverable, clickable, position) {
				placeholder.unbind();
				$.plot(placeholder, data, {
					series: {
						pie: { 
							show: show
						}
					},
					grid: {
						hoverable: hoverable,
						clickable: clickable
					},
					legend: {
						position: position
					}
				});

				placeholder.bind("plothover", function(event, pos, obj) {

					if (!obj) {
						return;
					}

					var percent = parseFloat(obj.series.percent).toFixed(2);
					$("#hover").html("<span style='font-weight:bold; color:" + obj.series.color + "'>" + obj.series.label + " (" + percent + "%)</span>");
				});

				placeholder.bind("plotclick", function(event, pos, obj) {
					if (!obj) {
						return;
					}
					/* percent = parseFloat(obj.series.percent).toFixed(2);
					alert(""  + obj.series.label + ": " + percent + "%"); */
				});
		},
	
		barChart : function(placeholder, data, stack, bars, lines, steps, color) {
			$.plot(placeholder, [data], {
				series: {
					stack: stack,
					lines: {
						show: lines,
						steps: steps
					},
					bars: {
						show: bars,
						fill: 1,
						barWidth: 0.1
					},
					color: color
				},
				grid: {
					hoverable: true
				}
			});
		},
		
		constructPieInfo : function(response,value){
			var self = this, xData = [], yData = [], finalData = [], new_data=[], sum = 0;;
			//try{
				var Stringval = decodeURI(response.response);
				var JSONval = $.parseJSON(Stringval), xData = [],yData = [], finalData=[];
				//console.info(JSONval.facet_counts.facet_fields);
				$.each(JSONval.facet_counts.facet_fields,function(i,v) {
					$.each(v,function(ind,val) {
						if(ind%2 === 0) {
							xData.push(val);
						} else {
							yData.push(val);
						}
					});
					
				});
				for(var i = 0;i<xData.length;i++) {
					finalData[i] = {
						label: xData[i],
						data: yData[i]
					}
				};
				self.pieChart($("#placeholder_"+value.id), finalData, true, true, true, "ne");
				$("#placeholder_"+value.id).bind("plothover", function (event, pos, item) {
				if (item) {
					if ($(this).data('previous-post') != item.seriesIndex) {
						//plot.unhighlight();
						//plot.highlight(item.series, item.datapoint);
						$(this).data('previous-post', item.seriesIndex);
					}
					$("#tooltip_"+value.id).remove();
					item.datapoint = parseFloat(item.datapoint).toFixed(2);
					y = ': ' + item.datapoint + '%';
						
					self.toolTipForPie(pos.pageX, pos.pageY, item.series.label + " " + y,value.id);
				} else {
					$("#tooltip_"+value.id).css('display','none');
				}	
			});		
			$("#tooltip_"+value.id).css('display','none');	
				
			//}catch(exception){
				//ex
			//}
		},
		
		toolTipForPie : function(x, y, contents,placeholderindex) {
			$('<div id="tooltip_'+placeholderindex+'">' + contents + '</div>').css( {
				position: 'absolute',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#fee',
				opacity: 0.80
			}).appendTo("body");//.fadeIn(200);
		},
		
		constructLineInfo : function(response,value){
			var self = this;			
			var xData = [], yData = [], finalData = [];			
			var Stringval = decodeURI(response.response);
			var JSONval = $.parseJSON(Stringval);
			$.each(JSONval.facet_counts.facet_ranges.createDate.counts,function(ind,val) {
				if(ind%2 === 0) {
						xData.push(val);
					} else {
						yData.push(val);
					}					
			});
			for(var i = 0;i<xData.length;i++) {
				finalData.push([Date.parse(xData[i]),yData[i]]);
			};
			self.lineChartTime($("#placeholder_"+value.id), finalData, 'orange');
		},
		
		constructBarInfo : function(response,value){
			var self = this, barChartData = [];
			for (var i = 0; i <= 10; i += 1) {
				barChartData.push([i, 1]);
			}
			
			var Stringval = decodeURI(response.response);
			var JSONval = $.parseJSON(Stringval), xData = [],yData = [], finalData=[];
			
			$.each(JSONval.facet_counts.facet_fields,function(i,v) {
				$.each(v,function(ind,val) {
					if(ind%2 === 0) {
						xData.push(val);
					} else {
						yData.push(val);
					}
				});
				
			});
			for(var i = 0;i<xData.length;i++) {
				finalData.push([xData[i],yData[i]]);
			};
				
			self.barChart($("#placeholder_"+value.id), finalData, 10, true, false, false, 'purple');
		},
	});

	return Clazz.com.components.charts.js.Charts;
});