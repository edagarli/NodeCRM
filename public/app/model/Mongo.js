Ext.define('UMA.model.Mongo', {
	extend : 'Ext.data.Model',
	fields : [
		{
			name : '_id',
			type : 'string'
		}
	/*
		{
			name : '_id',
			type : 'object',
			convert : function(value, record) {
				if(value) {
					return value['$id'];	
				}
				return value;
			}
		}
		*/
	]
});