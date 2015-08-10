Ext.define('UMA.view.MenuTree', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.menuTree',
	title : '管理菜单',
	collapsible : true,
	split : true,
	width : 200,
	minSize : 200,
	rootVisible : false,
	root : {
	},
	autoScroll : true,
	store : 'Menu',
	columns : [
		{ 
            xtype: 'treecolumn', //this is so we know which column will show the tree
            flex: 1,
            width : 60,
            sortable: true,
            dataIndex: 'name'
        }]
});
