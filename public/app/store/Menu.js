Ext.define('UMA.store.Menu', {
	extend: 'Ext.data.TreeStore',
	autoLoad : false,
	model: 'UMA.model.DataMenu',
	proxy: {
		type: 'ajax',
		url : '/admin/menu'
	}
});