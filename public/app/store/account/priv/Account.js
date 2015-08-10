Ext.define('UMA.store.account.priv.Account', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.account.priv.Account',
	autoLoad: true,
	pageSize: 40,
	proxy : {
		type : 'ajax',
		url : '/admin/account/read-priv-account',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});