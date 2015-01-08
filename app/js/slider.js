$(document).ready(function()
{

	var num = 1;
	var nb_photo = 4;

	$(".theme-photo").click(function()
	{
		$(this).find(".theme-dev").first().css("background-image", "url('./img/photos-" + $(this).attr("id") + "/0" + num + ".jpg')" );
	});

	$(".carousel-control.right").click(function()
	{
		num +=1;
		if(num == nb_photo)
			num = 1;
		$(this).parent().css("background-image", "url('./img/photos-" + $(this).parent().parent().attr("id") + "/0" + num + ".jpg')" );
	});

	$(".carousel-control.left").click(function()
	{
		num -=1;
		if(num == 0)
			num = nb_photo;
		$(this).parent().css("background-image", "url('./img/photos-" + $(this).parent().parent().attr("id") + "/0" + num + ".jpg')" );

	});

});