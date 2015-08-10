Ext.define('UMA.store.Radio', {
	extend : 'Ext.data.Store',
	fields : [
		"name", "value"
	],
	data : [
		{
			"name" : '是',
			"value" : true
		}, {
			"name" : '否',
			"value" : false
		}
	]
});