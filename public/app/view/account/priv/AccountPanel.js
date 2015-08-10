Ext.define('UMA.view.account.priv.AccountPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.accountPrivAccountPanel',
	requires : [ ],
	title : '用户权限',
	id: 'accountPrivAccountPanel',
	border : true,
	collapsible : true,
	split : true,
	floatable: false,
	initComponent: function() {
		var self = this;
		var account_priv = self.account_priv;
		this.items = [
		{
			xtype : 'hiddenfield',
			name : '_id',
			id : '_id',
			value: account_priv._id
		}, 
		{
			xtype : 'hiddenfield',
			name : 'accountId',
			id : 'accountId',
			value: account_priv.accountId
		},		
		{
			xtype: 'checkboxgroup',
			fieldLabel: '',
			columns: 8,
			items: [ 			
			{
			   xtype      : 'checkboxfield',
			   name       : 'select',
			   id         : 'select',
			   inputValue : '1',
			   uncheckedValue : '0',
			   boxLabel   : 'Select',
			   checked    : account_priv.select
			},{
			   xtype      : 'checkboxfield',
			   name       : 'insert',
			   id         : 'insert',
			   inputValue : '1',
			   uncheckedValue : '0',
			   boxLabel   : 'Insert',
			   checked    : account_priv.insert
			},{
			   xtype      : 'checkboxfield',
			   name       : 'update',
			   id         : 'update',
			   inputValue : '1',
			   uncheckedValue : '0',
			   boxLabel   : 'Update',
			   checked    : account_priv.update
			},{
			   xtype      : 'checkboxfield',
			   name       : 'delete',
			   id         : 'delete',
			   inputValue : '1',
			   uncheckedValue : '0',
			   boxLabel   : 'Delete',
			   checked    : account_priv.delete
			}]
		}];
		this.bbar = [
			{
				text: 'Select All',
				handler: function() {
					Ext.getCmp('select').setValue(true);
					Ext.getCmp('insert').setValue(true);
					Ext.getCmp('update').setValue(true);
					Ext.getCmp('delete').setValue(true);
				}
			},
			{
				text: 'Deselect All',
				handler: function() {
					Ext.getCmp('select').setValue(false);
					Ext.getCmp('insert').setValue(false);
					Ext.getCmp('update').setValue(false);
					Ext.getCmp('delete').setValue(false);
				}
			}
		];
		this.tbar = [{
			text : '保存',
			tooltip : '保存您编辑的内容',
			iconCls : 'save',
			action : 'save'
		}];
		this.callParent();
	}	
});