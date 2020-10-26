import * as alt from 'alt';
import * as chat from 'chat';

chat.registerCmd('tuning', (player) => {
	
	if (!player.vehicle) return;
	startTuning(player);	
});

alt.onClient('client:tuning:start', (player) => {
	if (!player.vehicle) return;
	startTuning(player);
});

function startTuning(player)
{
	var possibleMods = [];
	var installedMods = [];
	var veh = player.vehicle;
	
	veh.modKit = 1;
	
	for(var i=0; i<49; i++)
	{
		possibleMods.push(veh.getModsCount(i));
		installedMods.push(veh.getMod(i));
	}
	
	possibleMods[49] = 15;
	installedMods[49] = 0;
	
	possibleMods[50] = 11;
	installedMods[50] = 0;
	
	possibleMods[51] = 160;
	installedMods[51] = 0;
	
	possibleMods[52] = 3;
	installedMods[52] = veh.windowTint;
	
	possibleMods[53] = 4;
	installedMods[53] = veh.numberPlateIndex;
	
	possibleMods[54] = 0;
	installedMods[54] = veh.numberPlateText;
	
	possibleMods[55] = 5;
	installedMods[55] = 0;
	
	possibleMods[56] = 0;
	installedMods[56] = veh.customPrimaryColor.r;
	
	possibleMods[57] = 0;
	installedMods[57] = veh.customPrimaryColor.g;
	
	possibleMods[58] = 0;
	installedMods[58] = veh.customPrimaryColor.b;
	
	possibleMods[59] = 5;
	installedMods[59] = 0;
	
	possibleMods[60] = 0;
	installedMods[60] = veh.customSecondaryColor.r;
	
	possibleMods[61] = 0;
	installedMods[61] = veh.customSecondaryColor.g;
	
	possibleMods[62] = 0;
	installedMods[62] = veh.customSecondaryColor.b;
	
	possibleMods[63] = 160;
	installedMods[63] = 0;
	
	possibleMods[64] = 100;
	installedMods[64] = 0;
	
	for(var i=1; i<16; i++)
	{
		possibleMods.push(1);
		installedMods.push(veh.getExtra(i));
	}
		
	possibleMods[80] = 160;
	installedMods[80] = 0;
		
	possibleMods[81] = 1;
	if(veh.neon.front == true) installedMods[81] = 1;
	else installedMods[81] = 0;
		
	possibleMods[82] = 0;
	installedMods[82] = veh.neonColor.r;
		
	possibleMods[83] = 0;
	installedMods[83] = veh.neonColor.g;
		
	possibleMods[84] = 0;
	installedMods[84] = veh.neonColor.b;
		
	
	alt.emitClient(player, 'server:tuning:start', possibleMods, installedMods);
	
	// veh.neon = {front:true,back:true,left:true,right:true};
	// veh.neonColor = {r:255,g:0,b:0};
}

	
alt.onClient('client:tuning:mod', (player, args) => {		
	applyMod(player, args);
});

alt.onClient('client:tuning:reset', (player, args) => {
	
	var todo = [];
	
	for(var i=0; i<81; i++)
	{
		if(i == 54) continue;
		todo[0] = i;
		todo[1] = args[1];
		applyMod(player, todo);
	}	
});

function applyMod(player, args)
{
	if(args[0] < 49) { player.vehicle.setMod(args[0], args[1]); }
	else if(args[0] == 49) { player.vehicle.livery = args[1]; }
	else if(args[0] == 50)
	{
		//if(args[1] == 12) { args[1] = 0; args[2] = -1; }
		player.vehicle.setWheels(args[1], args[2]);
	}
	else if(args[0] == 51) { player.vehicle.wheelColor = args[1]; }
	else if(args[0] == 52) { player.vehicle.windowTint = args[1]; }
	else if(args[0] == 53) { player.vehicle.numberPlateIndex = args[1]; }
	else if(args[0] == 54) { player.vehicle.numberPlateText = args[1]; }
	else if(args[0] >= 54 && args[0] < 59)
	{
		player.vehicle.primaryColor = args[1];
		player.vehicle.customPrimaryColor = { r: args[2], g: args[3], b: args[4] };
	}
	else if(args[0] >= 59 && args[0] < 63)
	{
		player.vehicle.secondaryColor = args[1];
		player.vehicle.customSecondaryColor = { r: args[2], g: args[3], b: args[4] };
	}		
	else if(args[0] == 63) { player.vehicle.pearlColor = args[1]; }
	else if(args[0] == 64)
	{
		// if(args[2] == 12) { args[1] = -1; args[2] = 0; }
		player.vehicle.setWheels(args[2],args[1]);
	}
	else if(args[0] == 80)
	{
		player.vehicle.interiorColor = args[1];
	}
	else if(args[0] == 81)
	{
		if(args[1] == 0) player.vehicle.neon = {front:false,back:false,left:false,right:false};
		else player.vehicle.neon = {front:true,back:true,left:true,right:true};
		player.vehicle.neonColor = { r: args[2], g: args[3], b: args[4] };
	}
	else if(args[0] >=65 && args[0] < 80) player.vehicle.setExtra(args[0]-65, args[1]);
}

