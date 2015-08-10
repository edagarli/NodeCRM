﻿Ext.override(Ext.data.TreeStore, {
	load: function(options) {
		options = options || {};
		options.params = options.params || {};

		var me = this,
			node = options.node || me.tree.getRootNode(),
			root;

		if (!node) {
			node = me.setRootNode({
				expanded: true
			});
		}

		if (me.clearOnLoad) {
			node.removeAll(false);
		}

		Ext.applyIf(options, {
			node: node
		});
		options.params[me.nodeParam] = node ? node.getId() : 'root';

		if (node) {
			node.set('loading', true);
		}
		return me.callParent([options]);
	}
});
var AccountGridClick = 0;

Ext.define('UMA.view.account.Grid', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.Account',
	initComponent: function() {		
		var me = this;
		
	    var addAction = Ext.create('Ext.Action', {
	        iconCls: 'icon-add',
	        text: '添加子帐户',
	        disabled: false,
	        handler: function(widget, event) {
	            var rec = me.getSelectionModel().getSelection()[0];
	            if (rec) {
					var window = Ext.widget('accountAdd');
					window.down('form').getForm().setValues({fatherNode:rec.get('_id')});
					window.show();
	            } else {
	                alert('请选择父帐户');
	            }
	        }
	    });

	    var editAction = Ext.create('Ext.Action', {
	        iconCls: 'icon-add',
	        text: '编辑子帐户',
	        disabled: false,
	        handler: function(widget, event) {
	            var rec = me.getSelectionModel().getSelection()[0];
	            if (rec) {
					var window = Ext.widget('accountEdit');
					window.down('form').getForm().setValues({
						_id : rec.get('_id'),
						name : rec.get('name'),
						phone : rec.get('phone'),
						mobile : rec.get('mobile'),
						email : rec.get('email'),
						description : rec.get('description'),
						roleId : rec.get('roleId'),
						fatherNode : rec.get('fatherNode'),
						isActived : rec.get('isActived'),
						expireTime : rec.get('expireTime'),
						userId : rec.get('userId')
					});
					window.show();
	            } else {
	                alert('请选择父帐户');
	            }
	        }
	    });
	    
	    var deleteAction = Ext.create('Ext.Action', {
	        iconCls: 'icon-add',
	        text: '删除子帐户',
	        disabled: false,
	        handler: function(widget, event) {
	        	Ext.Msg.confirm({
					title : '提示信息',
					msg : '请确认是否要删除该信息?',
					buttons : Ext.Msg.YESNO,
					fn : function(btn) {
						if (btn == 'yes') {
				            var rec = me.getSelectionModel().getSelection()[0];
				            if (rec) {
				            	var id=[];
				            	id.push(rec.get('_id'));
								Ext.Ajax.request({
									url : '/admin/account/remove',
									params : {
										_id : Ext.encode(id)
									},
									success : function(response) {
										var text = response.responseText;
										var json = Ext.decode(text);
										Ext.Msg.alert('提示信息', json.msg);
										if (json.success) {
											me.store.load();
										}
									}
								});
				            } else {
				                alert('请选择父帐户');
				            }
						}
					}
	        	});
	        }
	    });
	    
	    this.contextMenu = Ext.create('Ext.menu.Menu', {
	        items: [addAction,editAction,deleteAction]
	    });

	    //进行数据加载
	    Ext.data.StoreManager.lookup('AllRole').load();
	    /*var AccountStore = Ext.data.StoreManager.lookup('Account');
	    if(AccountGridClick==0) {
	    	AccountGridClick += 1;
	    }
	    else {
	    	AccountStore.load();
	    }
	    this.store = AccountStore;*/
		Ext.apply(this, {
            store: new Ext.data.TreeStore({
                model: 'UMA.model.Account',
                proxy: {
                    type : 'ajax',
					url : '/admin/account/read'
                }
            })
        });
		this.callParent();
	},
	id : 'Account',
	title : '帐户列表',
	border : false,
	rootVisible: false,
	closable : true,
	enableTabScroll : false,
	multiSelect : true,
	disableSelection : false,
    collapsible: false,
    useArrows: true,
    singleExpand: true,
    autoScroll: true,    
	viewConfig: {
        stripeRows: true,
        listeners: {
            itemcontextmenu: function(view, rec, node, index, e) {
                e.stopEvent();
                this.up('treepanel').contextMenu.showAt(e.getXY());
                return false;
            },
            drop:function(node, data, overModel, dropPosition, eOpts) {
            	Ext.Ajax.request({
					url : '/admin/account/drop',
					params : {
						_id        : data.records[0].get("_id"),
						taggetid:overModel.data._id
					
					},
					scope:this,
					success : function(response) {
						var text = response.responseText;
						var json = Ext.decode(text);
						Ext.Msg.alert('提示信息', json.msg);
						if (json.success) {
							this.up('treepanel').store.load();
						}
					}
				});
            }  
        },
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    },
	columns : [
	    {
	    	xtype: 'treecolumn',
			text : "姓名",
			sortable : true,
			dataIndex : 'name',
			flex : 1
		}, {
			xtype: 'gridcolumn',
			text : "描述",
			sortable : false,
			dataIndex : 'description',
			flex : 1
		}, {
			xtype: 'gridcolumn',
			text : "角色",
			sortable : true,
			dataIndex : 'roleId',
			flex : 1,
			renderer : function(value) {
				var name = null;
				var store = Ext.data.StoreManager.lookup('AllRole');
				store.each(function(o) {
					if (o.get('_id') == value) {
						name = o.get('roleName');
					}
				}, this);
				return name;
			}
		}, {
			xtype: 'gridcolumn',
			text : "状态",
			sortable : true,
			dataIndex : 'isActived',
			flex : 1,
			renderer : function(value) {
				var name = null;
				var store = Ext.data.StoreManager.lookup('ActiveStatus');
				store.each(function(o) {
					if (o.get('value') == value) {
						name = o.get('name');
					}
				});
				return name;
			},
			align : 'center'
		}, {
			xtype: 'gridcolumn',
			text : "手机号码",
			sortable : true,
			dataIndex : 'mobile',
			flex:1
		}, {
			xtype: 'gridcolumn',
			text : "固定电话",
			sortable : true,
			dataIndex : 'phone',
			flex:1
		},  {
			xtype: 'gridcolumn',
			text : "Email",
			sortable : true,
			dataIndex : 'email',
			flex:1
		}, {
			xtype: 'datecolumn',
			text : "创建时间",
			sortable : true,
			dataIndex : 'createTime',
			align : 'center',
			format:'Y-m-d H:i:s',
			flex:1
		}, {
			xtype: 'datecolumn',
			text : "过期时间",
			sortable : true,
			dataIndex : 'expireTime',
			align : 'center',
			format:'Y-m-d H:i:s',
			flex:1
		}
	],
	selType : 'rowmodel',
	tbar : [
		{
			text : '新增',
		    iconCls : 'add',
			width : 60,
			action: 'add'
		}, {
			text : '修改',
			iconCls : 'edit',
			width : 60,
			action: 'edit'
		},
		{
			text : '刷新',
			iconCls : 'refresh',
			width : 60,
			action: 'refresh'
			
		}, {
			text : '删除',
			iconCls : 'delete',
			width : 60,
			action: 'remove'
		}/*, {
			text : '用户权限设置',
			iconCls : 'priv',
			width : 120,
			action: 'priv'
		}*/
	]
});

//Ext.onReady(function(){
//	Ext.getCmp('accountGrid').on('beforerender',function() {
//		this.getStore().load();
//	});
//});

