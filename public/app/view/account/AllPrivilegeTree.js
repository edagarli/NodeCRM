Ext.define('UMA.view.account.AllPrivilegeTree', {
	
	extend : 'Ext.tree.Panel',
	alias : 'widget.allPrivilegeTree',
	title : '管理用户权限',
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
		var accountid=this.accountid;
		Ext.apply(this, {
            store: new Ext.data.TreeStore({
                model: 'UMA.model.DataPrivilege',                
				lazyFill: true,
                proxy: {
                    type: 'ajax',
                    url: '/admin/iDatabase/allItem',
					extraParams:{'accountid':accountid}
                }
            }),
			columns : [{
				xtype: 'treecolumn', //this is so we know which column will show the tree
				text: '项目列表',
				flex: 1,
				width : 60,
				sortable: true,
				dataIndex: 'name'
			}],
			plugins: [{
				ptype: 'bufferedrenderer'
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