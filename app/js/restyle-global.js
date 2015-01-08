$(document).ready(function()
{
	var visible = false;
	var visible_resp = false;

	/****************************************
			FONCTIONS
	****************************************/

	function opaciteSousTitre(scroll_y)
	{
		var limite = 20;

		if(scroll_y > limite)
		{
			$(".sous-titre-page").css("opacity", 0);
		}
		else
		{
			var o = 1 - scroll_y / limite;
			$(".sous-titre-page").css("opacity", o);
		}
	}

	function menuResponsive()
	{
		// Screen sizes Bootstrap :	320px, 480px, 768px, 992px, 1200px

		if($(window).width() <= 320)
		{
			$("#titre_site").hide();
			$(".container.barre_menu").hide();
		}
		else if($(window).width() <= 480)
		{
			$("#titre_site").hide();
			$(".container.barre_menu").hide();
		}
		else if($(window).width() <= 754)
		{
			// mini menu
			$("#titre_site").hide();
			$(".container.barre_menu").hide();
		}
		else if($(window).width() <= 992)
		{
			// reduire police h1
			$(".container.barre_menu").show();
			$(".container.barre_menu").css("opacity", 1);
			$(".blur").hide();
			visible_resp = false;

			$("#titre_site").show();
		}
		else
		{
			$(".container.barre_menu").show();
			$(".container.barre_menu").css("opacity", 1);
			$(".blur").hide();
			visible_resp = false;

			$("#titre_site").show();
		}
	}

	/****************************************
			EVENTS
	****************************************/

	$(window).scroll(function()
	{
		opaciteSousTitre($(window).scrollTop());
	});

	$(window).resize(function()
	{
		menuResponsive();
	});

	$(".bouton-menu").click(function()
	{
		if(!visible_resp)
		{
			$(".container.barre_menu").show();
			$(".container.barre_menu").css("opacity", 0);

			$(".container.barre_menu").animate
			(
				{
					opacity: 1
				},
				500
			);

			$(".blur").show();
			$(".blur").css("opacity", 0);

			$(".blur").animate
			(
				{
					opacity: 1
				},
				500
			);

			visible_resp = true;
		}
		else
		{
			$(".container.barre_menu").animate
			(
				{
					opacity: 0
				},
				500,
				function()
				{
					$(".container.barre_menu").hide();
				}
			);

			$(".blur").animate
			(
				{
					opacity: 0
				},
				500,
				function()
				{
					$(".blur").hide();
				}
			);

			visible_resp = false;
		}
	});

	$(".blur").click(function()
	{
		$(".container.barre_menu").animate
		(
			{
				opacity: 0
			},
			500,
			function()
			{
				$(".container.barre_menu").hide();
			}
		);

		$(".blur").animate
		(
			{
				opacity: 0
			},
			500,
			function()
			{
				$(".blur").hide();
			}
		);

		visible_resp = false;
	});

	/****************************************
			MAIN
	****************************************/

	opaciteSousTitre(0);
	menuResponsive();

});