Ext.define('UMA.model.Gender', {
	extend : 'Ext.data.Model',
	fields : [
		{
			name : '_id',
			type : 'string',
			convert : function(value, record) {
				return value == 'm' ? '男' : '女';
			}
		}, {
			name : 'value',
			type : 'object',
			convert : function(value, record) {
				return value.count;
			}
		}
	]
});