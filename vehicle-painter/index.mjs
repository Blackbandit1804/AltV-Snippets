import * as alt from 'alt';
import * as chat from 'chat';

chat.registerCmd('pc', (player,arg) => {
	alt.emitClient(player, 'webview:Load');
});

alt.onClient('server:CarColor', (player, args) => {
	player.vehicle.primaryColor = args[0];	
	player.vehicle.customPrimaryColor = { r: args[1], g: args[2], b: args[3] };
	player.vehicle.secondaryColor = args[4];	
	player.vehicle.customSecondaryColor = { r: args[5], g: args[6], b: args[7] };
});