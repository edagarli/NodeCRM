Ext.define('UMA.view.menu.Edit', {
	extend : 'UMA.window.Window',
	alias : 'widget.menuEdit',
	title : '编辑菜单',
	items : [
		{
			xtype : 'form',
			frame : true,
			border : false,
			autoScroll : true,
			bodyPadding : 5,
			url : '/admin/menu/edit',
			fieldDefaults : {
				labelAlign : 'left',
				labelWidth : 90,
				anchor : '100%'
			},
			defaultType : 'textfield',
			defaults : {
				allowBlank : true
			},
			items : [
				{
					name : 'name',
					fieldLabel : '菜单名称',
					allowBlank : false
				}, {
					name : 'mid',
					fieldLabel : '菜单编号',
					allowBlank : false
				}, {
					xtype : 'checkboxfield',
					name : 'leaf',
					fieldLabel : '是否是根目录'
				}, {
					xtype : 'checkboxfield',
					name : 'expanded',
					fieldLabel : '默认是否展开'
				}, {
					xtype : 'hiddenfield',
					name : '_id'
				}
			],
			buttons : [
				{
					text : '重置',
					iconCls : 'reset',
					action : 'reset'
				}, {
					text : '提交',
					formBind : true,
					iconCls : 'save',
					disabled : true,
					action : 'submit'
				},{
				text : '关闭',
				iconCls : 'cancel',
				action : 'closewin'
			}
			]
		}
	]
});