Ext.define('UMA.store.DataMenu', {
	extend: 'Ext.data.TreeStore',
	autoLoad: false,
	model: 'UMA.model.DataMenu',
	proxy: {
		type: 'ajax',
		url : '/admin/menu/allmenu'
		
		
	} 
});

