Ext.define('UMA.store.ActiveStatus', {
	extend : 'Ext.data.Store',
	fields : [
		'name', 'value'
	],
	data : [
		{
			name : "活跃",
			value : true
		}, {
			name : "禁用",
			value : false
		}
	]
});