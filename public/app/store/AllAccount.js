Ext.define('UMA.store.AllAccount', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.Account',
	autoLoad: true,
	pageSize: 200,
	proxy : {
		type : 'ajax',
		url : '/admin/account/all',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});