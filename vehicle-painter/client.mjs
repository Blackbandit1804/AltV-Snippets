import * as alt from 'alt';
import * as native from 'natives';

let webview;

alt.on('keyup', (key) => {
    if (key === 0x72) { //F3 KEY
        if (!webview)
            openWebview();
        else
            closeWebview();
    }
});

alt.onServer('webview:Load', openWebview);

function openWebview() {
	if(!webview) {
		webview = new alt.WebView( 'http://resource/html/index.html' );
		webview.on('close:Webview', closeWebview);
		webview.on('color:Car', colorCar);
	}
	webview.focus();
	alt.showCursor(true);	
	alt.toggleGameControls(false);
}

function closeWebview() {
	alt.showCursor(false);	
	alt.toggleGameControls(true);
	webview.destroy();
	webview = undefined;
}

function colorCar(args) {
	alt.emitServer('server:CarColor', args);	
}
