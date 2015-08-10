Ext.define('UMA.store.account.priv.Project', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.account.priv.Project',
	autoLoad: true,
	pageSize: 40,
	proxy : {
		type : 'ajax',
		url : '/admin/account/read-priv-project',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});