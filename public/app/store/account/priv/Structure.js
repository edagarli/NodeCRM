Ext.define('UMA.store.account.priv.Structure', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.account.priv.Structure',
	autoLoad: false,
	pageSize: 40,
	proxy : {
		type : 'ajax',
		url : '/admin/account/read-priv-structure',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});