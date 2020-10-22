		window.onload = function()
		{
			var primaryR = document.getElementById('primary_r');
			var primaryG = document.getElementById('primary_g');
			var primaryB = document.getElementById('primary_b');
			
			var secondaryR = document.getElementById('secondary_r');
			var secondaryG = document.getElementById('secondary_g');
			var secondaryB = document.getElementById('secondary_b');
			
			var primaryPrimer = document.getElementById('primary_primer');
			var secondaryPrimer = document.getElementById('secondary_primer');
			
			var previewPrimary = document.getElementById('preview_primary');
			var previewSecondary = document.getElementById('preview_secondary');
			
			var feedback = document.getElementById('feedback');
			
			var apply = document.getElementById('apply');
			
			var exit = document.getElementById('exit');

			primaryR.addEventListener('change', changeColor);
			primaryG.addEventListener('change', changeColor);
			primaryB.addEventListener('change', changeColor);

			secondaryR.addEventListener('change', changeColor);
			secondaryG.addEventListener('change', changeColor);
			secondaryB.addEventListener('change', changeColor);
						
			primaryPrimer.addEventListener('change', changeColor);
			secondaryPrimer.addEventListener('change', changeColor);
			
			apply.addEventListener('click', applyColor);
			exit.addEventListener('click', close);
			
			changeColor();
			
			function changeColor()
			{
				previewPrimary.style.backgroundColor = 'rgb('+primaryR.value+','+primaryG.value+','+primaryB.value+')';
				previewSecondary.style.backgroundColor = 'rgb('+secondaryR.value+','+secondaryG.value+','+secondaryB.value+')';
				feedback.innerHTML = primaryR.value + "/" + primaryG.value + "/" + primaryB.value + " <b>|</b> " + secondaryR.value + "/" + secondaryG.value + "/" + secondaryB.value;
				feedback.innerHTML += "<br>";
				feedback.innerHTML += primaryPrimer.value + " <b>|</b> " + secondaryPrimer.value;
			}
			
			function applyColor()
			{
				feedback.innerHTML = "APPLIED";
				
				let color1;
				let color2;
								
				if(primaryPrimer.value == "Metallic") color1 = 0;
				else if(primaryPrimer.value == "Matt") color1 = 12;
				else if(primaryPrimer.value == "Util") color1 = 15;
				else if(primaryPrimer.value == "Worn") color1 = 21;
				else if(primaryPrimer.value == "Brushed") color1 = 118;
				else if(primaryPrimer.value == "Chrome") color1 = 120;
				
				if(secondaryPrimer.value == "Metallic") color2 = 0;
				else if(secondaryPrimer.value == "Matt") color2 = 12;
				else if(secondaryPrimer.value == "Util") color2 = 15;
				else if(secondaryPrimer.value == "Worn") color2 = 21;
				else if(secondaryPrimer.value == "Brushed") color2 = 118;
				else if(secondaryPrimer.value == "Chrome") color2 = 120;
				
				let args = [];
				args[0] = color1;
				args[1] = primaryR.value;
				args[2] = primaryG.value;
				args[3] = primaryB.value;
				args[4] = color2;
				args[5] = secondaryR.value;
				args[6] = secondaryG.value;
				args[7] = secondaryB.value;
				
				alt.emit('color:Car', args);
			}
			
			function close()
			{				
				feedback.innerHTML = "CLOSED";
				alt.emit('close:Webview');
			}
			
		}