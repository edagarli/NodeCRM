Ext.define('UMA.model.account.priv.Structure', {
	extend : 'UMA.model.Mongo',
	fields : [
		{
			name : 'projectId',
			type : 'string'
		},
		{
			name : 'formId',
			type : 'string'
		},
		{
			name : 'structureId',
			type : 'string'
		},
		{
	    	name : 'accountId',
	    	type : 'string'
	    },
	    {
	    	name : 'structureName',
	    	type : 'string'
	    }, 
		{
			name : 'createTime',
			type : 'object',
			convert : function(value, record) {
				var date = new Date();
				date.setTime(value.sec * 1000);
				return date;
			}
		}
	]
});