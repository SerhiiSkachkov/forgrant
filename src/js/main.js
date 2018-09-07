$(document).ready(function () {

	var coin = ['ETH', 'LTC', 'BTC', ];
	var curVal = $("#currency-list option:selected").val();

	ajax(curVal);


	/* clear list and change currency*/
	$('#currency-list').change(function() {
		var curVal = $(this).val();
		$(document).find('.coin-change-list li').remove();
		$(document).find('.coin-item-box div').remove();
		ajax(curVal);
	});

	function ajax(curVal) {

		for (var i in coin) {

			$.ajax({
				url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + coin[i] + curVal,
				async: false,
				dataType: 'json',
				success: function(data) { 
					console.log(data)

				var ask = data.ask;

				var perc = data.changes.percent,
					pcHours = perc.hour,
					pcDay = perc.day,
					pcWeek = perc.week,
					pcMonth = perc.month;

				var price = data.changes.price,
					hours = price.hour,
					day = price.day,
					week = price.week,
					month = price.month;

				var box = $("ul[data=" + coin[i] +"]");
				var box2 = $("ul[data=" + coin[i] + "-percent"+"]");

					box.closest('.coin-item-box').prepend(('<div>Price:<span>' + ask ))
					box.append(("<li>Hour change<span>" + hours ))
						.append(("<li>Day change<span>" + day ))
						.append(("<li>Week change<span>" + week ))
						.append(("<li>Month change<span>" + month ));

					box2.append(("<li>Hour change<span>" + pcHours + "%"))
						.append(("<li>Day change<span>" + pcDay + "%"))
						.append(("<li>Week change<span>" + pcWeek + "%"))
						.append(("<li>Month change<span>" + pcMonth + "%"));

					$('li > span').each(function() {
						var text = $(this).text();

						if ($(this).text().indexOf("-") + 1 == 1) {
	  							$(this).addClass('price-fall');
						} 
						else {
							$(this).text($(this).text().replace(/^[^-]/, '+'));
						}

					});
						
				},
				error: function (jqXHR, exception) {
					console.log('error')
				}
			});
		};			
	};

	/* show percent or price */
	$('input').each(function() {
		$(this).change(function(){
			$(this).siblings('.coin-change-list-percent').toggleClass('hide')
			$(this).siblings('.coin-change-list-price').toggleClass('hide')
		});
	});
/* select style */
	$(function(){
     
      var params = {
        changedEl: "select",
        visRows: 5,
        scrollArrows: true
      }
      cuSel(params);
    });

});
