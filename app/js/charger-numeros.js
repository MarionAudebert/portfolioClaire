$(document).ready(function()
{
	var i_zero = 0;
	var url_beta = [];
	var url_xml = [];

	var titres_num = [];
	var duree_num = [];
	var groupe_num = [];
	var ambiance_num = [];
	var desc_num = [];
	var dates_num = [];
	var url_img = [];

	var hover_appercu = false;

	/****************************************
			FONCTIONS
	****************************************/

	function getXML(i)
	{
		var dir = "./numeros/" + url_beta[i];
		var fileextension = ".xml";

		$.ajax(
		{
			url: dir,
			success: function (data)
			{
				var path = $(data).find("a:contains(" + fileextension + ")")[0].href.split("/");
				var temp = dir + "/" + (path[path.length - 1]);

				if (temp.indexOf(".xml") >= 0)
					url_xml.push(temp);
			},

			complete: function(result)
			{
				if(i < url_beta.length)
					getXML(i + 1);
				else
					getDesc(i_zero);
			}
		});
	}

	function getDesc(i)
	{
		var dir = url_xml[i];

		$.ajax(
		{
			url: dir,
			type: "POST",
        	dataType: "xml",
			success: function (data)
			{
				$(data).find("TITRE").each(function()
				{
					titres_num.push($(this).text());
				});

				$(data).find("DATE").each(function()
				{
					dates_num.push($(this).text());
				});

				$(data).find("DUREE_MINUTES").each(function()
				{
					duree_num.push($(this).text());
				});

				$(data).find("NOMBRE_ARTISTES").each(function()
				{
					groupe_num.push($(this).text());
				});

				$(data).find("AMBIANCE").each(function()
				{
					ambiance_num.push($(this).text());
				});

				$(data).find("DESCRIPTION_COURTE").each(function()
				{
					desc_num.push($(this).text());
				});
			},

			complete: function(result)
			{
				if(i < url_xml.length)
					getDesc(i + 1);
				else
					getImg(i_zero);
			}
		});
	}

	function getImg(i)
	{
		var dir = "./numeros/" + url_beta[i];
		var fileextension = ".jpg";

		$.ajax(
		{
			url: dir,
			success: function (data)
			{
				var path = $(data).find("a:contains(" + fileextension + ")")[0].href.split("/");
				var temp = dir + "/" + (path[path.length - 1]);

				if (temp.indexOf(".jpg") >= 0)
					url_img.push(temp);
			},

			complete: function(result)
			{
				if(i < url_beta.length)
					getImg(i + 1);
				else
					insertNumeros();
			}
		});
	}
 
	function mergeSort(arr)
	{
	    if (arr.length < 2)
	        return arr;
	 
	    var middle = parseInt(arr.length / 2);
	    var left   = arr.slice(0, middle);
	    var right  = arr.slice(middle, arr.length);
	 
	    return merge(mergeSort(left), mergeSort(right));
	}
	 
	function merge(left, right)
	{
	    var result = [];
	 
	    while (left.length && right.length) {
	        if (left[0] <= right[0]) {
	            result.push(left.shift());
	        } else {
	            result.push(right.shift());
	        }
	    }
	 
	    while (left.length)
	        result.push(left.shift());
	 
	    while (right.length)
	        result.push(right.shift());
	 
	    return result;
	}

	function miseEnFormeDate(date)
	{
		var elements_date = date.split("/");

		var dtPrev = new Date();
		dtPrev.setFullYear(elements_date[2], elements_date[1] - 1, elements_date[0]);
		
		return dtPrev;
	}

	function trierNumerosDates()
	{
		for (var i = 0; i < dates_num.length; i++)
			dates_num[i] = miseEnFormeDate(dates_num[i]);
		
		var dates_copie = dates_num;
		var indexs_tries = [];

		for (var i = 0; i < dates_copie.length; i++)
			indexs_tries.push(0);

		dates_copie = mergeSort(dates_copie);

		for (var i = 0; i < dates_copie.length; i++)
		{
			while(dates_copie[i] != dates_num[indexs_tries[i]])
				indexs_tries[i]++;
		}

		return indexs_tries;
	}

	function insertNumeros()
	{
		var chaine = "";
		var j = 0;
		var indexs_tries = trierNumerosDates();

		for (var i = 0; i < url_xml.length; i++)
		{
			var index = indexs_tries[i];
			var ref_num = url_xml[index].split("/")[2];

			if(j == 0)
			{	
				chaine += "<div class=\"row row_numero\">";
			}
			
			chaine +=	"<style>div.numero-box.numero-box-" + i + "{ background-image: url(\"" + url_img[index] + "\"); }</style>"
			chaine +=	"<div class=\"col-sm-3 col-numero\">";
			chaine +=		"<a href=\"#" + ref_num + "\" class=\"numero-lien\" onClick=\"appercuNumero();\">";
			chaine +=			"<div class=\"numero-box numero-box-" + i + "\">";
			chaine +=				"<div class=\"numero-desc\">";
			chaine +=					"<h3>- " + titres_num[index] + " -</h3>";
			chaine +=					"<p class=\"numero-info\">+ " + duree_num[index] + " min</p>";
			chaine +=					"<p class=\"numero-info\">+ " + groupe_num[index] + " artistes</p>";
			chaine +=					"<p class=\"numero-info\">+ " + ambiance_num[index] + "</p>";
			chaine +=					"<p>" + desc_num[index] + "</p>";
			chaine +=				"</div>";
			chaine +=			"</div>";
			chaine +=			"</a>";
			chaine +=	"</div>";

			if(j == 3)
			{
				chaine += "</div>";
				j = 0;
			}
			else
				++j;
		}

		if(j != 0)
		{
			chaine += "</div>";
		}

		$(".main_content").append(chaine);
		articlesLoaded();
	}

	function afficherNumeros(i)
	{
		$(".numero-box-" + i).animate
		(
			{
				opacity: 1
			},
			200,
			function()
			{
				afficherNumeros(i + 1);
			}
		);
	}

	function fermerAppercu()
	{
		$(".numero-blur").animate
		(
			{
				opacity: 0
			},
			500,
			function()
			{
				$(".numero-blur").hide();
				var new_url = window.location.href;
				new_url = new_url.substring(0, new_url.indexOf("#")); 

				window.history.pushState({}, '', new_url);
			}
		);
	}


	/****************************************
			EVENTS
	****************************************/

	function pageLoaded()
	{
		$("#ok-js").html("");
	}

	function articlesLoaded()
	{
		for (var i = 0; i < url_xml.length; i++)
			$(".numero-box-" + i).css("opacity", 0);

		$("#ok-js").animate(
		{
			opacity: 0
		},
		500,
		function()
		{
			$("#ok-js").hide();
		});

		$(".spinner").animate
		(
			{
				opacity: 0
			},
			500,
			function()
			{
				$(".spinner").hide();
				afficherNumeros(0);
			}
		);
	}

	$(".numero-blur").click(function()
	{
		if(!hover_appercu)
		{
			fermerAppercu();
		}
	});

	$("#fermer-appercu").click(function()
	{
		fermerAppercu();
	});

	$(".row.numero-appercu-box").mouseenter(function()
	{
		hover_appercu = true;
	});

	$(".row.numero-appercu-box").mouseleave(function()
	{
		hover_appercu = false;
	});

	$(window).resize(function()
	{
		if($(window).width() <= 754)
			$(".col-sm-8.numero-appercu-img").hide();
		else
			$(".col-sm-8.numero-appercu-img").show();
	});

	/****************************************
			MAIN
	****************************************/

	pageLoaded();

	var folder = window.location.href;
	if (folder.indexOf("#") >= 0)
		appercuNumero();

	if($(window).width() <= 754)
		$(".col-sm-8.numero-appercu-img").hide();
	
	var dir = "./numeros";
	var fileextension = "";

	$.ajax(
	{
		url: dir,
		success: function (data)
		{
			$(data).find("a:contains(" + fileextension + ")").each(function ()
			{
				var path = this.href.split("/") ;
				url_beta.push(path[path.length - 2]);
			});
		},

		complete: function(result)
		{
			if(i_zero < url_beta.length)
			{
				getXML(i_zero + 1);
			}
		}
	});
});