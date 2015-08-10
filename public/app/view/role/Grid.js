Ext.define('UMA.view.role.Grid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.Role',
	requires : [
		'UMA.toolbar.Paging'
	],
	id : 'Role',
	store : 'Role',
	title : '角色列表',
	selType : 'rowmodel',
	closable : true,
	autoScroll : true,
	multiSelect : true,
	enableTabScroll : true,
	disableSelection : false,
	selType : 'rowmodel',
	plugins : [
		Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 2
		})
	],
	initComponent: function() {
		Ext.data.StoreManager.lookup('Role').load();
		this.isActivedStore = [['1','活跃'],['0','禁用']];
		this.callParent();
	},
	columns : [
		{
			text : "角色名称",
			sortable : true,
			dataIndex : 'roleName',
			editor:'textfield'
		}, {
			text : "角色别名",
			sortable : true,
			dataIndex : 'roleAlias',
			flex : 1,
			editor : 'textfield'
		}, {
			text : "状态",
			sortable : true,
			dataIndex : 'isActived',
			width : 40,
			editor:{
                xtype         : 'combobox',
                typeAhead     : true,
                triggerAction : 'query',
                store         : this.isActivedStore,
                listClass     : 'x-combo-list-small',
                allowBlank    : false
            },
            renderer:function(value){
                for(var i=0;i<this.isActivedStore.length;i++) {
                    if(this.isActivedStore[i][0]==value) {
                        return this.isActivedStore[i][1];
                    }
                }
            },
			align : 'center'
		}, {
			xtype: 'datecolumn',
			text : '创建时间',
			sortable : true,
			dataIndex : 'createTime',
			align : 'center',
			format: 'Y-m-d H:i:s',
			width : 150
		}
	],
	tbar : [
		{
			text : '新增',
				iconCls : 'add',
			width : 60,
			action : 'add'
		}, '-', {
			text : '编辑',
			width : 60,
				iconCls : 'edit',
			action : 'edit'
		}, '-', {
			text : '保存',
				iconCls : 'save',
			width : 60,
			action : 'save'
		}, '-', {
			text : '删除',
				iconCls : 'delete',
			width : 60,
			tooltip : '删除',
			action : 'remove'
		}
	],
	bbar : {
		xtype : 'paging',
		store : 'Role'
	}
});