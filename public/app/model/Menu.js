Ext.define('UMA.model.Menu', {
	extend : 'UMA.model.Mongo',
	fields : [
		{
			name : 'name',
			type : 'string'
		},
		{
			name : 'mid',
			type : 'string'
		}
		
	]
});