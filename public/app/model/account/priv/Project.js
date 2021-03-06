Ext.define('UMA.model.account.priv.Project', {
	extend : 'UMA.model.Mongo',
	fields : [
		{
			name : 'projectId',
			type : 'string'
		},		
	    {
	    	name : 'projectName',
	    	type : 'string'
	    },
		{
	    	name : 'accountId',
	    	type : 'string'
	    },
		{
			name : 'select',
			type : 'boolean'
		}, 
		{
			name : 'insert',
			type : 'boolean'
		}, 
		{
			name : 'update',
			type : 'boolean'
		}, 
		{
			name : 'delete',
			type : 'boolean'
		},
		{
			name : 'createTime',
			type:'object',
			convert : function(value, record) {
				var date = new Date();
				date.setTime(value.sec * 1000);
				return date;
			}
		}
	]
});