Ext.define('app.application.UMA', {

    extend: 'Ext.app.Application',

	name : 'UMA',

	appFolder : '/app',

	autoCreateViewport : true,
	
	enableQuickTips:true,
	
	controllers : [
		'Menu'
	],
	
	stores : ['ActiveStatus'],

	launch : function() {
		
		Ext.Ajax.on('requestcomplete', function(ajax, response) {
			var result = response.responseText;
			if (result.charAt(0) == '{') {
				var json = Ext.decode(result);
				if (json.access == 'deny') {
					Ext.Msg.alert('提示信息', json.msg);
				}
			}
		});
		
		Ext.Ajax.on('requestexception', function(ajax, response ,options ,eOpts ) {
			Ext.Msg.alert('提示信息', '网络连接异常，请稍后重试');
		});

	}
});