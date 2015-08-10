Ext.define('UMA.store.AllRole', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.Role',
	autoLoad: false,
	proxy : {
		type : 'ajax',
		url : '/admin/role/read',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});