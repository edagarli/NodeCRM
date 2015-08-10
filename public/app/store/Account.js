Ext.define('UMA.store.Account', {
	extend: 'Ext.data.TreeStore',
	model: 'UMA.model.Account',
	autoLoad: false,
	proxy : {
		type : 'ajax',
		url : '/admin/account/read'
	}
});