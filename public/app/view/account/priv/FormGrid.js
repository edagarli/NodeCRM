Ext.define('UMA.view.account.priv.FormGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.accountPrivFormGrid',
	requires : [ 'UMA.toolbar.Paging' ],
	title : '表列表',
	minTabWidth : 200,
	width : 300,
	border : false,
	collapsible : true,
	split : true,
	multiSelect : false,
	disableSelection : false,
	plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	}) ],
	initComponent: function() {
		var self = this;
		var store = new Ext.data.Store({
			model: 'UMA.model.account.priv.Form',
			autoLoad: true,
			pageSize: 40,
			proxy : {
				type : 'ajax',
				url : '/admin/account/read-priv-form',
				extraParams:{
					projectId : self.projectId,
					accountId : self.accountId
				},
				reader : {
					type : 'json',
					root : 'result',
					totalProperty : 'total'
				}
			}
		});
		
		this.store = store;
		this.bbar =  {
			xtype : 'paging',
			store : store
		};
		
		this.callParent();
	},
	tbar : [{
				text : '保存',
				tooltip : '保存您编辑的内容',
				iconCls : 'save',
				action : 'save'
			}],
	columns : [ {
		text      : "ID",
		sortable  : true,
		dataIndex : '_id',
		flex      : 1,
		editor    : 'textfield',
		hidden    : true
	}, {
		text : "projectId",
		sortable : true,
		dataIndex : 'projectId',
		flex:1,
		editor : 'textfield',
		hidden    : true
	}, {
		text : "formId",
		sortable : true,
		dataIndex : 'formId',
		flex:1,
		editor : 'textfield',
		hidden    : true
	}, {
		text : "accountId",
		sortable : true,
		dataIndex : 'accountId',
		flex:1,
		editor : 'textfield',
		hidden    : true
	}, {
		text      : "表名称",
		sortable  : true,
		flex      : 1,
		dataIndex : 'formAlias'
	},  {
		xtype : 'booleancolumn',
		trueText : '√',
		falseText : '×',
		text : "Select",
		sortable : true,
		dataIndex : 'select',
		flex : 1,
		field : {
			xtype : 'combobox',
			typeAhead : true,
			triggerAction : 'all',
			selectOnTab : true,
			store : 'Radio',
			lazyRender : true,
			listClass : 'x-combo-list-small',
			displayField : 'name',
			valueField : 'value'
		}
	},  {
		xtype : 'booleancolumn',
		trueText : '√',
		falseText : '×',
		text : "Insert",
		sortable : true,
		dataIndex : 'insert',
		flex : 1,
		field : {
			xtype : 'combobox',
			typeAhead : true,
			triggerAction : 'all',
			selectOnTab : true,
			store : 'Radio',
			lazyRender : true,
			listClass : 'x-combo-list-small',
			displayField : 'name',
			valueField : 'value'
		}
	},  {
		xtype : 'booleancolumn',
		trueText : '√',
		falseText : '×',
		text : "Update",
		sortable : true,
		dataIndex : 'update',
		flex : 1,
		field : {
			xtype : 'combobox',
			typeAhead : true,
			triggerAction : 'all',
			selectOnTab : true,
			store : 'Radio',
			lazyRender : true,
			listClass : 'x-combo-list-small',
			displayField : 'name',
			valueField : 'value'
		}
	},  {
		xtype : 'booleancolumn',
		trueText : '√',
		falseText : '×',
		text : "Delete",
		sortable : true,
		dataIndex : 'delete',
		flex : 1,
		field : {
			xtype : 'combobox',
			typeAhead : true,
			triggerAction : 'all',
			selectOnTab : true,
			store : 'Radio',
			lazyRender : true,
			listClass : 'x-combo-list-small',
			displayField : 'name',
			valueField : 'value'
		}
	} ],
	selType : 'rowmodel'
});