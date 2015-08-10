Ext.define('UMA.store.AllMenu', {
	extend: 'Ext.data.Store',
	model: 'UMA.model.Menu',
	autoLoad: false,
	proxy : {
		type : 'ajax',
		url : '/admin/menu/allrootmenu',
		reader : {
			type : 'json',
			root : 'result',
			totalProperty : 'total'
		}
	}
});