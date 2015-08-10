Ext.define('UMA.model.Role', {
	extend : 'UMA.model.Mongo',
		fields : [
			{
				name : 'roleName',
				type : 'string'
			}, {
				name : 'roleAlias',
				type : 'string'
			}, {
				name : 'isActived',
				type : 'boolean'
			}, {
				name : 'createTime',
				type : 'object',
				convert : function(value, record) {
					/*
					var date = new Date();
					date.setTime(value.sec * 1000);
					*/
					var date = new Date(value);
					return date;
				}
			}, {
				name : 'permission',
				type : 'object'
			},{
			name : 'menus',
			type : 'object'
		  }
		]
	});