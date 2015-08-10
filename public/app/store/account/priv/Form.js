Ext.define('UMA.store.account.priv.Form', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.account.priv.Form',
	autoLoad: true,
	pageSize: 40,
	proxy : {
		type : 'ajax',
		url : '/admin/account/read-priv-form',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});