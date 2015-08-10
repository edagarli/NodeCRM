Ext.define('UMA.view.menu.Add', {
	extend : 'UMA.window.Window',
	alias : 'widget.menuAdd',
	title : '新增菜单',
	requires : [
		'UMA.view.menu.Combobox'
	],
	initComponent:function(){
	this.items = [
		{
			xtype : 'form',
			frame : true,
			border : false,
			autoScroll : true,
			bodyPadding : 5,
			url : '/admin/menu/add',
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
				},{
					xtype : 'menuCombobox'
				}, {
					xtype : 'hiddenfield',
					name : 'menutype',
					value:'1'
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
					disabled : true,
					iconCls : 'save',
					action : 'submit'
				},{
				text : '关闭',
				iconCls : 'cancel',
				action : 'closewin'
				}
			]
		}];
		this.callParent();
	}
	
});


Ext.define('UMA.view.menu.RootAdd', {
	extend : 'UMA.window.Window',
	alias : 'widget.rootmenuAdd',
	title : '新增根目录',
	requires : [
		'UMA.view.menu.Combobox'
	],
	initComponent:function(){
	this.items =[
		{
			xtype : 'form',
			frame : true,
			border : false,
			autoScroll : true,
			bodyPadding : 5,
			url : '/admin/menu/add',
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
				},{
					xtype : 'checkboxfield',
					name : 'expanded',
					fieldLabel : '默认是否展开'
				},{
					xtype : 'menuCombobox'
				}, {
					xtype : 'hiddenfield',
					name : 'menutype',
					value:'0'
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
		}];
		this.callParent();
	}
});