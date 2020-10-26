var navigationitems = [];
var nav_selected = 0;

var page;

var mods = ["Spoilers","Front Bumper","Rear Bumper","Side skirt","Exhaust","Frame","Grille","Bonnet","Left wing","Right wing","Roof","Engine","Brakes","Transmission","Horns","Suspension","Armor","unknown","Turbo","unknown","Custom tire smoke","unknown","Xenon","Front Wheels","Back Wheels","Plate holders","Plate vanity","Trim Design","Ornaments","unknown","Dial Design","Door interior","Seats","Steering Wheel","Shift Lever","Plaques","Rear shelf","Trunk","Hydraulics","Engine block","Air filter","Strut bar","Arch Cover","Antenna","Exterior parts","Tank","Door","Back Hydraulics","Livery", "Decals","WheelType","Wheels","WindowColor","PlateColor","Platetext","-","-","-","-","-","-","-","-","Pearl","Wheels","Extramod 1","Extramod 2","Extramod 3","Extramod 4","Extramod 5","Extramod 6","Extramod 7","Extramod 8","Extramod 9","Extramod 10","Extramod 11","Extramod 12","Extramod 13","Extramod 14","Extramod 15","Color","Neon"]; // standard 0-48 + rgb, windowtint, liverys, extramods usw.

var basecoat = [0,12,15,21,118,120];
var basecoatnames = ["Metallic","Matt","Util","Worn","Brushed","Chrome"];

var wheelTypes = [ "Sport","Muscle","Lowrider","SUV","Offroad","Tuner","Bike Wheels","High End","Benny's Original","Benny's Bespoke","Race","Stock" ];

var colors = [ "Met. Black","Met. Graphite Black","Met. Black Steel","Met. Dark Silver","Met. Silver","Met. Blue Silver","Met. Steel Gray","Met. Shadow Silver","Met. Stone Silver","Met. Midnight Silver","Met. Gun Metal","Met. Anthracite Grey","Matte Black","Matte Gray","Matte Light Grey","Util Black","Util Black Poly","Util Dark silver","Util Silver","Util Gun Metal","Util Shadow Silver","Worn Black","Worn Graphite","Worn Silver Grey","Worn Silver","Worn Blue Silver","Worn Shadow Silver","Met. Red","Met. Torino Red","Met. Formula Red","Met. Blaze Red","Met. Graceful Red","Met. Garnet Red","Met. Desert Red","Met. Cabernet Red","Met. Candy Red","Met. Sunrise Orange","Met. Classic Gold","Met. Orange","Matte Red","Matte Dark Red","Matte Orange","Matte Yellow","Util Red","Util Bright Red","Util Garnet Red","Worn Red","Worn Golden Red","Worn Dark Red","Met. Dark Green","Met. Racing Green","Met. Sea Green","Met. Olive Green","Met. Green","Met. Gasoline Blue","Matte Lime Green","Util Dark Green","Util Green","Worn Dark Green","Worn Green","Worn Sea Wash","Met. Midnight Blue","Met. Dark Blue","Met. Saxony Blue","Met. Blue","Met. Mariner Blue","Met. Harbor Blue","Met. Diamond Blue","Met. Surf Blue","Met. Nautical Blue","Met. Bright Blue","Met. Purple Blue","Met. Spinnaker Blue","Met. Ultra Blue","Met. Bright Blue","Util Dark Blue","Util Midnight Blue","Util Blue","Util Sea Foam Blue","Util Lightning blue","Util Maui Blue Poly","Util Bright Blue","Matte Dark Blue","Matte Blue","Matte Midnight Blue","Worn Dark blue","Worn Blue","Worn Light blue","Met. Taxi Yellow","Met. Race Yellow","Met. Bronze","Met. Yellow Bird","Met. Lime","Met. Champagne","Met. Pueblo Beige","Met. Dark Ivory","Met. Choco Brown","Met. Golden Brown","Met. Light Brown","Met. Straw Beige","Met. Moss Brown","Met. Biston Brown","Met. Beechwood","Met. Dark Beechw.","Met. Choco Orange","Met. Beach Sand","Met. Bleeched Sand","Met. Cream","Util Brown","Util Medium Brown","Util Light Brown","Met. White","Met. Frost White","Worn Honey Beige","Worn Brown","Worn Dark Brown","Worn straw beige","Brushed Steel","Brushed Black steel","Brushed Aluminium","Chrome","Worn Off White","Util Off White","Worn Orange","Worn Light Orange","Met. Securicor","Worn Taxi Yellow","police car blue","Matte Green","Matte Brown","Worn Orange","Matte White","Worn White","Worn Olive Army","Pure White","Hot Pink","Salmon pink","Met. Vermillion Pink","Orange","Green","Blue","Mettalic Black Blue","Met. Black Purple","Met. Black Red","hunter green","Met. Purple","Met. V Dark Blue","Modshop Blacka","Matte Purple","Matte Dark Purple","Met. Lava Red","Matte Forest Green","Matte Olive Drab","Matte Desert Brown","Matte Desert Tan","Matte Foilage Green","Alloy","Epsilon Blue","Pure Gold","Brushed Gold","Light yellow" ];


var possibleMods = [];
var installedMods = [];
var selectedMods = [];

window.onload = function()
{
	alt.on("client:tuning:start", startTuning);
}

function startTuning(args,brgs)
{
	possibleMods = args;
	installedMods = brgs;
	
	selectedMods = installedMods.slice(0);
	
	page = document.getElementById("page");
	
	makeDragable();
	
	for(var i=0; i < 6; i++)
	{
		navigationitems[i] = document.getElementById("nav_" + i);
	}
	selectNavigationItem();

	setContent();
	
	checkButtons();
}

function selectNavigationItem()
{
	for(var i=0; i < navigationitems.length; i++)
	{
		navigationitems[i].className = "navigationitem";
		if(i == nav_selected) navigationitems[i].className += "selected";
		
		navigationitems[i].onclick = function()
		{
			var id=this.id.split("_")[1];
			nav_selected = id;
			selectNavigationItem();
			setContent();
		}
	}
}

function setContent()
{
	if(nav_selected == 0)
	{
		page.innerHTML = "<br><b>Paint</b><br>";
		
		addColorslider(55);
		addColorslider(59);
		addSelection(51);
		addSelection(63);		
		addSelection(48);
		addSelection(49);
	}
	else if(nav_selected == 1)
	{
		page.innerHTML = "<br><b>Chassis</b><br>";
		addSelection(0);
		addSelection(1);
		addSelection(2);
		addSelection(3);
		addSelection(4);
		addSelection(6);
		addSelection(7);
		addSelection(8);
		addSelection(9);
		addSelection(10);
		addSelection(41);
		addSelection(42);
		addSelection(44);
		addSelection(45);
		addSelection(46);
		addSelection(52);
		addSelection(50);
		addSelection(64);
		// addSelection(23);
		// addSelection(24);
		addColorslider(81);
	}
	else if(nav_selected == 2)
	{
		page.innerHTML = "<br><b>Interior</b><br>";
		
		addSelection(5);
		addSelection(30);
		addSelection(31);
		addSelection(32);
		addSelection(33);
		addSelection(34);
		addSelection(35);
		addSelection(36);
		addSelection(37);
		addSelection(80);
	}
	else if(nav_selected == 3)
	{
		page.innerHTML = "<br><b>Misc</b><br>";
		
		addSelection(14);
		addSelection(16);
		// addSelection(17);
		// addSelection(19);
		addSelection(20);
		// addSelection(21);
		addSelection(22);
		addSelection(25);
		addSelection(26);
		addSelection(38);
		addSelection(39);
		addSelection(40);
		addSelection(43);
		addSelection(47);
		addSelection(53);
	}
	else if(nav_selected == 4)
	{
		page.innerHTML = "<br><b>Power</b><br>";
		
		addSelection(11);
		addSelection(12);
		addSelection(13);
		addSelection(15);
		addSelection(18);
	}
	else if(nav_selected == 5)
	{
		page.innerHTML = "<br><b>Extras</b><br>";
		
		for(var i=65; i <80; i++)
		{
			addSelection(i);
		}
	}
}

function addSelection(id)
{
	if(possibleMods[id] == 0) return;
	
	var elem = document.createElement("div");
	elem.className = "selection";
	
	var decrease = document.createElement("div");
	decrease.className = "selectionleft";
	decrease.innerHTML = "-";
	
	var info = document.createElement("div");
	info.className = "selectioninfo";
	
	if(id == 50) info.innerHTML = mods[id] + " (" + wheelTypes[selectedMods[id]] +")";
	else if(id == 51) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
	else if(id == 63) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
	else if(id == 80) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
	else if(id >= 65 && !selectedMods[id]) info.innerHTML = mods[id] + " (0 of " + possibleMods[id] + ")";
	else if(id >= 65 && selectedMods[id]) info.innerHTML = mods[id] + " (1 of " + possibleMods[id] + ")";
	else info.innerHTML = mods[id] + " (" + selectedMods[id] + " of " + possibleMods[id] + ")";
	
	var increase = document.createElement("div");
	increase.className = "selectionright";
	increase.innerHTML = "+";
	
	decrease.onclick = function()
	{
		if(selectedMods[id] > 0) selectedMods[id]--;
		else selectedMods[id] = possibleMods[id];
		if(id == 50) info.innerHTML = mods[id] + " (" + wheelTypes[selectedMods[id]] +")";
		else if(id == 51) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
		else if(id == 63) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
		else if(id == 80) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
		else info.innerHTML = mods[id] + " (" + selectedMods[id] + " of " + possibleMods[id] + ")";
		
		var args = [];
		args[0] = id;
		args[1] = selectedMods[id];
		if(id == 50) args[2] = selectedMods[64];
		if(id == 64) args[2] = selectedMods[50];
		alt.emit('webview:tuning:mod', args);
	};
	
	increase.onclick = function()
	{
		if(selectedMods[id] < possibleMods[id]) selectedMods[id]++;
		else selectedMods[id] = 0;
		if(id == 50) info.innerHTML = mods[id] + " (" + wheelTypes[selectedMods[id]] +")";
		else if(id == 51) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
		else if(id == 63) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
		else if(id == 80) info.innerHTML = mods[id] + " (" + colors[selectedMods[id]] +")";
		else info.innerHTML = mods[id] + " (" + selectedMods[id] + " of " + possibleMods[id] + ")";
		
		var args = [];
		args[0] = id;
		args[1] = selectedMods[id];
		if(id == 50) args[2] = selectedMods[64];
		if(id == 64) args[2] = selectedMods[50];
		alt.emit('webview:tuning:mod', args);
	};
	
	elem.appendChild(decrease);
	elem.appendChild(info);
	elem.appendChild(increase);
		
	page.appendChild(elem);	
}

function addColorslider(id)
{
	var elem = document.createElement("div");
	elem.className = "colorslider";
	
	var decrease = document.createElement("div");
	decrease.className = "selectionleft";
	decrease.innerHTML = "-";
	
	var info = document.createElement("div");
	info.className = "selectioninfo";
	
	if(id == 81) info.innerHTML = mods[id] + " (" + selectedMods[id] + " of " + possibleMods[id] + ")";
	else info.innerHTML = basecoatnames[selectedMods[id]];
	
	var increase = document.createElement("div");
	increase.className = "selectionright";
	increase.innerHTML = "+";

	var sliderR = document.createElement("input");
	sliderR.setAttribute("type", "range");
	sliderR.setAttribute("min", "0");
	sliderR.setAttribute("max", "255");
	sliderR.setAttribute("value", selectedMods[id+1]);
	sliderR.setAttribute("step", "1");
	sliderR.className = "slider";
	sliderR.style.backgroundColor = "#990000";
	
	var sliderG = document.createElement("input");
	sliderG.setAttribute("type", "range");
	sliderG.setAttribute("min", "0");
	sliderG.setAttribute("max", "255");
	sliderG.setAttribute("value", selectedMods[id+2]);
	sliderG.setAttribute("step", "1");
	sliderG.className = "slider";
	sliderG.style.backgroundColor = "#009900";
	
	var sliderB = document.createElement("input");
	sliderB.setAttribute("type", "range");
	sliderB.setAttribute("min", "0");
	sliderB.setAttribute("max", "255");
	sliderB.setAttribute("value", selectedMods[id+3]);
	sliderB.setAttribute("step", "1");
	sliderB.className = "slider";
	sliderB.style.backgroundColor = "#000099";
	
	var previewRGB = document.createElement("div");
	previewRGB.setAttribute("class", "preview");
	if( parseInt(selectedMods[id+1]) + parseInt(selectedMods[id+2]) + parseInt(selectedMods[id+3]) < 384 ) previewRGB.style.color = "#ffffff";
	else previewRGB.style.color = "#000000";	
	previewRGB.innerHTML = "R: " + selectedMods[id+1] + " / G: " + selectedMods[id+2] + " / B: " + selectedMods[id+3];
	previewRGB.style.backgroundColor = "rgb("+selectedMods[id+1]+","+selectedMods[id+2]+","+selectedMods[id+3]+")";
	
	decrease.onclick = function()
	{
		if(selectedMods[id] > 0) selectedMods[id]--;
		else selectedMods[id] = possibleMods[id];
		if(id == 81) info.innerHTML = mods[id] + " (" + selectedMods[id] + " of " + possibleMods[id] + ")";
		else info.innerHTML = basecoatnames[selectedMods[id]];
		// change on server!
		var args = [];
		args[0] = id;
		
		if(id == 81) args[1] = selectedMods[id];
		else args[1] = basecoat[selectedMods[id]];
		args[2] = selectedMods[id+1];
		args[3] = selectedMods[id+2];
		args[4] = selectedMods[id+3];
		alt.emit('webview:tuning:mod', args);
	};
	
	increase.onclick = function()
	{
		if(selectedMods[id] < possibleMods[id]) selectedMods[id]++;
		else selectedMods[id] = 0;
		if(id == 81) info.innerHTML = mods[id] + " (" + selectedMods[id] + " of " + possibleMods[id] + ")";
		else info.innerHTML = basecoatnames[selectedMods[id]];
		// change on server!
		var args = [];
		args[0] = id;
		if(id == 81) args[1] = selectedMods[id];
		else args[1] = args[1] = basecoat[selectedMods[id]];
		args[2] = selectedMods[id+1];
		args[3] = selectedMods[id+2];
		args[4] = selectedMods[id+3];
		alt.emit('webview:tuning:mod', args);
	};
	
	sliderR.onmouseover = function()
	{
		sliderR.style.backgroundColor = "#ff0000";
	};
	sliderR.onmouseout = function()
	{
		sliderR.style.backgroundColor = "#990000";
	};
	sliderR.onchange = function()
	{
		selectedMods[id+1] = this.value;
		previewRGB.innerHTML = "R: " + selectedMods[id+1] + " / G: " + selectedMods[id+2] + " / B: " + selectedMods[id+3];
		previewRGB.style.backgroundColor = "rgb("+selectedMods[id+1]+","+selectedMods[id+2]+","+selectedMods[id+3]+")";
		
		if( parseInt(selectedMods[id+1]) + parseInt(selectedMods[id+2]) + parseInt(selectedMods[id+3]) < 384 ) previewRGB.style.color = "#ffffff";
		else previewRGB.style.color = "#000000";
		
		// change on server!
		var args = [];
		args[0] = id;
		args[1] = basecoat[selectedMods[id]];
		args[2] = selectedMods[id+1];
		args[3] = selectedMods[id+2];
		args[4] = selectedMods[id+3];
		alt.emit('webview:tuning:mod', args);
	}
	
	sliderG.onmouseover = function()
	{
		sliderG.style.backgroundColor = "#00ff00";
	};
	sliderG.onmouseout = function()
	{
		sliderG.style.backgroundColor = "#009900";
	};
	sliderG.onchange = function()
	{
		selectedMods[id+2] = this.value;
		previewRGB.innerHTML = "R: " + selectedMods[id+1] + " / G: " + selectedMods[id+2] + " / B: " + selectedMods[id+3];
		previewRGB.style.backgroundColor = "rgb("+selectedMods[id+1]+","+selectedMods[id+2]+","+selectedMods[id+3]+")";
		
		if( parseInt(selectedMods[id+1]) + parseInt(selectedMods[id+2]) + parseInt(selectedMods[id+3]) < 384 ) previewRGB.style.color = "#ffffff";
		else previewRGB.style.color = "#000000";
		
		// change on server!
		var args = [];
		args[0] = id;
		args[1] = basecoat[selectedMods[id]];
		args[2] = selectedMods[id+1];
		args[3] = selectedMods[id+2];
		args[4] = selectedMods[id+3];
		alt.emit('webview:tuning:mod', args);
	}
		
	sliderB.onmouseover = function()
	{
		sliderB.style.backgroundColor = "#0000ff";
	};
	sliderB.onmouseout = function()
	{
		sliderB.style.backgroundColor = "#000099";
	};
	sliderB.onchange = function()
	{
		selectedMods[id+3] = this.value;
		previewRGB.innerHTML = "R: " + selectedMods[id+1] + " / G: " + selectedMods[id+2] + " / B: " + selectedMods[id+3];
		previewRGB.style.backgroundColor = "rgb("+selectedMods[id+1]+","+selectedMods[id+2]+","+selectedMods[id+3]+")";
		
		if( parseInt(selectedMods[id+1]) + parseInt(selectedMods[id+2]) + parseInt(selectedMods[id+3]) < 384 ) previewRGB.style.color = "#ffffff";
		else previewRGB.style.color = "#000000";
		
		// change on server!
		var args = [];
		args[0] = id;
		args[1] = basecoat[selectedMods[id]];
		args[2] = selectedMods[id+1];
		args[3] = selectedMods[id+2];
		args[4] = selectedMods[id+3];
		alt.emit('webview:tuning:mod', args);
	}
	
	elem.appendChild(decrease);
	elem.appendChild(info);
	elem.appendChild(increase);
	elem.appendChild(sliderR);
	elem.appendChild(sliderG);
	elem.appendChild(sliderB);
	elem.appendChild(previewRGB);
	
	page.appendChild(elem);
}

function checkButtons()
{		
	var resetButton = document.getElementById("reset");
	var saveButton = document.getElementById("save");
	
	resetButton.onclick = function()
	{
		selectedMods = installedMods.slice(0);
		alt.emit('webview:tuning:reset',selectedMods);
	}
	
	saveButton.onclick = function()
	{
		alt.emit('webview:tuning:stop',"close");
	}
}

function makeDragable()
{
	var elem = document.getElementById("title");
	
	elem.onmousedown = function()
	{
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		var e = e || window.event;

		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		elem.onmousemove = elementDrag;			
		elem.onmouseup = closeDragElement;

		function elementDrag(e)
		{
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			elem.parentElement.style.top = (elem.parentElement.offsetTop - pos2) + "px";
			elem.parentElement.style.left = (elem.parentElement.offsetLeft - pos1) + "px";
		}

		function closeDragElement()
		{
			elem.onmouseup = null;
			elem.onmousemove = null;
		}
	};
}