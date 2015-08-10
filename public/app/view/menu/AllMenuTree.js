Ext.define('UMA.view.menu.AllMenuTree', {
	
	extend : 'Ext.tree.Panel',
	alias : 'widget.allMenuTree',
	title : '管理菜单',
	collapsible : true,
	split : true,
	width : 200,
	minSize : 200,
	autoLoad:false,
	rootVisible : false,
	root : {
	},
	autoScroll : true,
	initComponent:function() {		
		var roleid=this.roleid;
		Ext.apply(this, {
            store: new Ext.data.TreeStore({
                model: 'UMA.model.DataMenu',
                proxy: {
                    type: 'ajax',
                    url: '/admin/menu/allmenu?checkbox=true',
					extraParams:{'roleid':roleid}
                }
            }),
			columns : [{
				xtype: 'treecolumn', //this is so we know which column will show the tree
				text: '菜单名称',
				flex: 1,
				width : 60,
				sortable: true,
				dataIndex: 'name'
			}],
			listeners:{
				checkchange :function(node,checked){
					treecheck(node,checked);
				}	
			}
        });
		this.callParent();
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