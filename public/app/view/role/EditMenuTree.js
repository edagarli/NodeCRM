Ext.define('UMA.view.role.EditMenuTree', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.editMenuTree',
	title : '管理菜单',
	collapsible : true,
	split : true,
	width : 200,
	minSize : 200,
	rootVisible : false,
	autoLoad:false,
	root : { 
	},
	autoScroll : true,
	store : 'DataCheckMenu', 
	columns : [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: '菜单名称',
            flex: 1,
            width : 60,
            sortable: true,
            dataIndex: 'name'
    }],
	listeners:{
		checkchange :function(node,checked) {
			treecheck(node,checked);
		},
		afterrender:function() {
			var menus=this.wadd;
			for(var i=0;i<menus.length;i++){
				alert(menus[i].$id);
			}
		}
	}
    
});

function treecheck(node,checked ){
	 node.expand();  
	 node.checked = checked;  
	 node.eachChild(function (child) {  
		 child.set('checked', checked);  
		 treecheck(child,checked);
	}); 
}