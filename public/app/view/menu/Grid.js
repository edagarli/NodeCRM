Ext.define('UMA.view.menu.Grid', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.Menu',
	title : '菜单列表',
	
	id : 'Menu',
	  collapsible: true,
	  	closable : true,
        useArrows: true,
        rootVisible: false,
        stateful: true,
        store: Ext.data.StoreManager.lookup('DataMenu'), 
        multiSelect: true,
        singleExpand: true,
	
		columns : [
		{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: '菜单名称',
            flex: 1,
            width : 60,
            sortable: true,
            dataIndex: 'name'
        }, {
			text : '菜单编号',
			sortable : true,
			dataIndex : 'mid',
			flex : 1,
			editor : 'textfield'
		}, {
			text : '是否展开',
			sortable : true,
			dataIndex : 'expanded',
			flex : 1,
			renderer :function(value, p, record) {
					if(value)
						return "<font color='green'>是</font>";
					else
						return "<font color='blue'>否</font>";
					}
		}
	],
	selType : 'rowmodel',

	initComponent: function() {
	//	Ext.data.StoreManager.lookup('DataMenu').load();
	    var DataStore = Ext.data.StoreManager.lookup('DataMenu');	
	    this.store = DataStore;
		this.callParent();
		//this.callParent();
	},
	
	tbar : [	{
			text : '新增根目录',
			width : 100,
		    iconCls : 'add',
			action : 'rootadd'
		}, '-',{
			text : '新增菜单',
			width : 80,
			  iconCls : 'add',
			action : 'add'
		}, '-',{
			text : '编辑',
			width : 80,
			iconCls : 'edit',
			action : 'edit'
		}, '-', {
			text : '删除',
			width : 60,
			iconCls : 'delete',
			tooltip : '删除',
			action : 'remove'
		}

	]
});