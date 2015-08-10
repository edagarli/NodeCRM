Ext.define('UMA.view.account.priv.FormMain', {
	extend : 'Ext.panel.Panel',
	requires : [
		'UMA.view.account.priv.FormGrid', 'UMA.view.account.priv.FormTabPanel', 'Ext.layout.container.Border'
	],
	alias : 'widget.accountPrivFormMain',
	id: 'accountPrivFormMain',
	layout : 'border',
	resizeTabs : false,
	closable : true,
	minTabwidth : 100,
	tabwidth : 100,
	enableTabScroll : false,
	defaults : {
		autoHeight : true,
		autoScroll : true
	},
	initComponent: function() {
		var self = this;
		this.items = [
	 		{
	 			region : 'center',
	 			xtype : 'accountPrivFormGrid',
	 			projectId:self.projectId,
	 			accountId:self.accountId
	 		}
			/*
			, {
	 			region : 'center',
	 			xtype : 'accountPrivFormTabPanel',
	 			projectId:self.projectId,
	 			accountId:self.accountId
	 		}*/
	 	];
		this.callParent();
	}
});