$(document).ready(function()
{
	
	var develop = false;


	$(".theme-photo").click(function()
	{
		if(!$(this).find(".theme-dev").is(':visible'))
		{
			$(".theme-dev").hide();
			$(this).find(".theme-dev").show();
			$(".galerie > .row ").css("height", "30%");
			$(this).parent().css("height", "100%");
		}

	});

	$(".glyphicon-remove").click(function()
	{
		$(".theme-photo").find(".theme-dev").hide('fast');
		$(".theme-photo").parent().css("height", "30%");

	});

});

