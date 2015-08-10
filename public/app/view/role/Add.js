Ext.define('UMA.view.role.Add', {
	extend : 'UMA.window.Window',
	alias : 'widget.roleAdd',
	width:890,
	layout: 'border',
	title: '新增角色',
	initComponent:function() {
				
		this.items = [{
	    	xtype :'form',
	    	frame : true,
	    	autoScroll:true,
	    	bodyPadding : 5,
	        region: 'center',
	    	url : '/admin/role/insert',
	    	fieldDefaults : {
				labelAlign : 'left',
				labelWidth : 90,
				anchor : '100%'
			},
			items : this.roleItems,
			buttons: [{
				text : '重置',
				iconCls : 'reset',
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
			roleid : ''
	    }];
	    this.callParent();
	}
});