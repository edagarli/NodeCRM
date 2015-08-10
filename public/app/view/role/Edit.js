Ext.define('UMA.view.role.Edit', {
	extend : 'UMA.window.Window',
	alias : 'widget.roleEdit',
	layout: 'border',
	title : '编辑角色',
	initComponent:function() {
		
		var roleid=this.roleid;
		
		this.items = [{
	    	xtype :'form',
	    	frame : true,
	    	autoScroll:true,
	    	bodyPadding : 5,
	    	 region: 'center',
	    	url : '/admin/role/update',
	    	fieldDefaults : {
				labelAlign : 'left',
				labelWidth : 90,
				anchor : '100%'
			},
			items : this.roleItems,
			buttons: [{
					iconCls : 'reset',
				text : '重置',
				action : 'reset'
			}, {
				text : '提交',
					iconCls : 'save',
				formBind : true,
				disabled : true,
				action : 'submit'
			}]
	    },
	    {
	    	region : 'west',
			xtype : 'allMenuTree',
			roleid : roleid
	    }];
	    this.callParent();
	}
});