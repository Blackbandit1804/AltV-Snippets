import * as alt from 'alt';
import * as native from 'natives';

let webview;

alt.on('keyup', (key) => {
    if (key === 0x74) { //F4 KEY
        if (!webview)
            alt.emitServer('client:tuning:start');
        else
            closeWebview();
    }
});

alt.onServer('server:tuning:start', (possibleMods,installedMods) =>
{
	openWebview(possibleMods, installedMods);
});

alt.onServer('server:tuning:stop', (possibleMods,installedMods) =>
{
	closeWebview();
});

function openWebview(possibleMods, installedMods)
{
	if(!webview) {
		webview = new alt.WebView( 'http://resource/html/index.htm' );
		
		webview.on('webview:tuning:close', closeWebview);
		webview.on('webview:tuning:mod', requestMod);
	}
	webview.focus();
	
	alt.showCursor(true);	
	alt.toggleGameControls(false);
	
	alt.setTimeout(() => {
		webview.emit('client:tuning:start', possibleMods, installedMods);
	},500);
	
	webview.on('webview:tuning:stop', args =>
	{
		closeWebview();
	});
	
	webview.on('webview:tuning:reset', args =>
	{
		alt.emitServer("client:tuning:reset", args);
	});
}

function closeWebview() {
	alt.showCursor(false);	
	alt.toggleGameControls(true);
	webview.destroy();
	webview = undefined;
}

function requestMod(args)
{
	args[0] = parseInt(args[0]);
	args[1] = parseInt(args[1]);
	
	alt.emitServer("client:tuning:mod", args);	
}