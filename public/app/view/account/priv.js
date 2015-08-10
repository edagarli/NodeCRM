Ext.define('UMA.view.account.Priv', {
	extend : 'UMA.window.Window',
	alias : 'widget.accountPriv',
	requires : [
		'UMA.view.account.priv.ProjectGrid', 'UMA.view.account.priv.ProjectTabPanel'
	],
	title: '帐户权限设置',
	width:800,
	height:600,
	layout: {
		type: 'border',
		padding: 5
	},
	initComponent: function() {
		var self = this;		
		this.items = [
			{
				region: 'north',
				xtype: 'container',
				layout: {
					type: 'anchor'
				},
				title: '权限控制',
				items: [
				{
					xtype: 'fieldset',
					title: "用户权限控制",
					anchor: '100% 30%',
					items: [{
						xtype: 'accountPrivAccountPanel',
						account_priv : self.account_priv,
						anchor: '100% 100%',
						border:1
					}]
				},
				{
					region: 'center',
					xtype: 'fieldset',
					layout: {
						type: 'anchor'
					},
					anchor: '100% 70%',
					title: '项目权限控制',
					items: [{
						xtype : 'accountPrivProjectGrid',
						accountId : self.accountId,
						anchor: '100% 100%',
						border:1
					}]
				}]				
			}, {
				region: 'center',
				xtype: 'fieldset',
				layout: {
					type: 'anchor'
				},
				title: '表权限控制',
				items: [{
					//region: 'center',
					xtype: 'accountPrivProjectTabPanel',
					accountId : self.accountId,
					anchor: '100% 100%'
				}]
			}
		];

		this.dockedItems= [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'end'
            },
            items: [{
                minWidth: 80,
                text: '运用',
				action : 'apply'
            },{
                minWidth: 80,
                text: '取消',
				action : 'cancel'
            }]
        }];
        this.callParent();
    }
	
});
