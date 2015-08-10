Ext.define('UMA.store.DataCheckPrivilege', {
	extend: 'Ext.data.TreeStore',
	autoLoad: false,
	model: 'UMA.model.DataPrivilege',
	proxy: {
		type: 'ajax',
		url : '/admin/iDatabase/allItem',
		reader : {
		
		}
	
		}
});

