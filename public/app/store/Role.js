Ext.define('UMA.store.Role', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.Role',
	autoLoad: false,
	pageSize: 40,
	proxy : {
		type : 'ajax',
		url : '/admin/role/read',
		startParam : 'offset',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});