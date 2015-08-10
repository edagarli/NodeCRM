Ext.define('UMA.store.Gender', {
	extend : 'Ext.data.Store',
	fields : [
		'name', 'value'
	],
	data : [
		{
			name : '男',
			value : 'man'
		}, {
			name : '女',
			value : 'woman'
		}
	]
});