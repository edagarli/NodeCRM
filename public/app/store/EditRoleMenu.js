Ext.define('UMA.store.DataCheckMenu', {
	extend: 'Ext.data.TreeStore',
	autoLoad: false,
	model: 'UMA.model.DataMenu',
	proxy: {
		type: 'ajax',
		url : '/admin/menu/allmenu?checkbox=true'
		
		
	}
});

