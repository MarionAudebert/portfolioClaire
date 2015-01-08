$(document).ready(function()
{
	var visible = false;

	/****************************************
			FONCTIONS
	****************************************/

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
			visible = false;

			$("#titre_site").show();
		}
		else
		{
			$(".container.barre_menu").show();
			$(".container.barre_menu").css("opacity", 1);
			$(".blur").hide();
			visible = false;

			$("#titre_site").show();
		}
	}

	/****************************************
			EVENTS
	****************************************/

	$(window).resize(function()
	{
		menuResponsive();
	});

	$(".bouton-menu").click(function()
	{
		if(!visible)
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

			visible = true;
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

			visible = false;
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

		visible = false;
	});

	/****************************************
			MAIN
	****************************************/

	menuResponsive();

});