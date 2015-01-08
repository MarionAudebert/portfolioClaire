$(document).ready(function()
{
	/****************************************
			FONCTIONS
	****************************************/

	function ronds_responsive()
	{
		var win_h = $(window).height();
		var win_w = $(window).width();

		if(win_w > win_h)
		{
			var taille = win_h * 0.59;
			$(".grand_rond").css("height", taille);
			$(".grand_rond").css("width", taille);

			taille = win_h * 0.125;
			$(".petit_rond_1").css("height", taille);
			$(".petit_rond_1").css("width", taille);

			$(".petit_rond_2").css("height", taille);
			$(".petit_rond_2").css("width", taille);

			taille = win_h * 0.265;
			$(".moyen_rond_1").css("height", taille);
			$(".moyen_rond_1").css("width", taille);

			$(".moyen_rond_4").css("height", taille);
			$(".moyen_rond_4").css("width", taille);

			/*
				div.moyen_rond_1,
				div.moyen_rond_2,
				div.moyen_rond_3,
				div.moyen_rond_4,
				div.petit_rond_1,
				div.petit_rond_2
			*/
		}
		else
		{

		}
	}

	/****************************************
			EVENTS
	****************************************/

	$(window).resize(function()
	{
		ronds_responsive();
	});

	/****************************************
			MAIN
	****************************************/

	ronds_responsive();


});