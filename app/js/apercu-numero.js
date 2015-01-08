var folder = window.location.href;
folder = "./numeros/" + folder.substring(folder.lastIndexOf("#") + 1);

var titre_num;
var duree_num;
var groupe_num;
var ambiance_num;
var desc_num;
var date_num;
var url_img = [];

/****************************************
		FONCTIONS
****************************************/


function getDesc()
{
	var path = folder + "/descriptif.xml";

	$.ajax(
	{
		url: path,
		type: "POST",
    	dataType: "xml",
		success: function (data)
		{
			$(data).find("TITRE").each(function()
			{
				titre_num = $(this).text();
			});

			$(data).find("DATE").each(function()
			{
				date_num = $(this).text();
			});

			$(data).find("DUREE_MINUTES").each(function()
			{
				duree_num = $(this).text();
			});

			$(data).find("NOMBRE_ARTISTES").each(function()
			{
				groupe_num = $(this).text();
			});

			$(data).find("AMBIANCE").each(function()
			{
				ambiance_num = $(this).text();
			});

			$(data).find("DESCRIPTION_LONGUE").each(function()
			{
				desc_num = $(this).text();
			});
		},

		complete: function(result)
		{
			getImg();
		}
	});
}


function getImg()
{
	var fileextension = ".jpg";

	$.ajax(
	{
		url: folder,
		success: function (data)
		{
			$(data).find("a:contains(" + fileextension + ")").each(function ()
			{
				var path = this + "";
				path = path.split("/");
				var temp = folder + "/" + path[path.length - 1];

				if (data.indexOf(".jpg") >= 0)
					url_img.push(temp);
	        });
		},

		complete: function(result)
		{
			insertAppercu();
		}
	});
}


function insertAppercu()
{
	var css_bg = "url('" + url_img[0] + "')";
	$(".col-sm-8.numero-appercu-img").css("background-image", css_bg);

	$(".col-sm-4.numero-appercu-desc").find("h3").html(titre_num);

	$(".col-sm-4.numero-appercu-desc").find("ul").html("");
	$(".col-sm-4.numero-appercu-desc").find("ul").append("<li>créé le : " + date_num + "</li>");
	$(".col-sm-4.numero-appercu-desc").find("ul").append("<li>durée : " + duree_num + " minutes</li>");
	$(".col-sm-4.numero-appercu-desc").find("ul").append("<li>nombre d'artistes : " + groupe_num + "</li>");
	$(".col-sm-4.numero-appercu-desc").find("ul").append("<li>ambiance : " + ambiance_num + "</li>");

	$(".col-sm-4.numero-appercu-desc").find("p").html(desc_num);

	$(".numero-blur").show();
	$(".numero-blur").css("numero-blur", 0);

	$(".numero-blur").animate
	(
		{
			opacity: 1
		},
		500
	);
}


/****************************************
		MAIN
****************************************/

getDesc();
