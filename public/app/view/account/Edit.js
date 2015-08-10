Ext.define('UMA.view.account.Edit', {
	extend : 'UMA.window.Window',
	alias : 'widget.accountEdit',
	title : '编辑帐户',
	layout:'border',
	initComponent:function() {
		var accountid=this.accountid;
		this.items = [
			{
				xtype : 'form',
				frame : true,
				bodyPadding : 5,
				region : 'center',
				url : '/admin/account/update',
				fieldDefaults : {
					labelAlign : 'left',
					labelWidth : 90,
					anchor : '100%'
				},
				items : [
					{
						xtype : 'textfield',
						name : 'name',
						fieldLabel : '姓名',
						allowBlank : false
					}, {
						xtype : 'textareafield',
						name : 'description',
						fieldLabel : '描述',
						allowBlank : false
					}, {
						xtype : 'roleCombobox'
					}, {
						xtype : 'activedRadio'
					}, {
						xtype : 'textfield',
						name : 'mobile',
						fieldLabel : '手机',
						allowBlank : false
					}, {
						xtype : 'textfield',
						name : 'phone',
						fieldLabel : '电话',
						allowBlank : false
					}, {
						xtype : 'textfield',
						name : 'email',
						fieldLabel : 'Email',
						vtype:'email',
						allowBlank : false
					}, {
						xtype : 'datefield',
						name : 'expireTime',
						format: 'Y-m-d H:i:s',
						fieldLabel : '过期时间',
						minValue: new Date(),
						allowBlank : false
					}, {
						xtype : 'textfield',
						fieldLabel: '密码',
						name: 'pwd',
						itemId: 'pwd',
						//inputType: 'password',
						minLength: 8,
						allowBlank: false/*,
						listeners: {
							validitychange: function(field){
								field.next().validate();
							},
							blur: function(field){
								field.next().validate();
							}
						}*/
					}, /*{
						xtype : 'textfield',
						fieldLabel: '确认密码',
						inputType: 'password',
						name: 'pass-cfrm',
						vtype: 'password',
						initialPassField: 'pass' // id of the initial password field
					},*/ {
						xtype : 'hiddenfield',
						name : '_id'
					}, {
						xtype : 'hiddenfield',
						name : 'fatherNode'
					}, {
						xtype : 'hiddenfield',
						name : 'userId'
					}
				],
				buttons : [
					{
						text : '重置',
						  iconCls : 'reset',
						action : 'reset'
					}, {
						text : '提交',
						  iconCls : 'save',
						formBind : true,
						disabled : true,
						action : 'submit'
					}
				]
			},
			{
				region : 'west',
				xtype : 'allPrivilegeTree',
				accountid:accountid
			}
		];
		
	    this.callParent();
	}
});