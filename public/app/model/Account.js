Ext.define('UMA.model.Account', {
	extend : 'UMA.model.Mongo',
	fields : [
		{name : 'name',type : 'string'},
		{name : 'description',type:'string'},
		{name : 'roleId',type:'string'},
		{name : 'isActived',type:'string'},
		{name : 'phone',type:'string'},
		{name : 'mobile',type:'string'},
		{name : 'email',type:'string'},
		{name : 'userId',type:'string'},
		{name : 'fatherNode',type:'string'},
		{name : 'email',type:'string'},
		{name : 'pwd',type:'string'},
		//{name : 'createTime',type:'string'},
		//{name : 'expireTime',type:'string'}		
		{name : 'createTime',type:'object',convert : function(value, record) {
			var date = new Date(value);
			//date.setTime(value.sec * 1000);
			return date;
		}},
		{name : 'expireTime',type:'object',convert : function(value, record) {
			var date = new Date(value);
			//date.setTime(value.sec * 1000);
			return date;
		}}	
	]
});