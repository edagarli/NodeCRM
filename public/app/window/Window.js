Ext.define('UMA.window.Window', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	title : 'Window',
	modal : false,
	maximizable: true,
	width : 640,
	height : 480,
	closeAction : 'destroy'
});