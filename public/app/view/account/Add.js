Ext.define('UMA.view.account.Add', {
	extend : 'UMA.window.Window',
	alias : 'widget.accountAdd',
	requires : [
		'UMA.view.role.Combobox', 'UMA.view.radio.Actived'
	],
	layout:'border',
	title: '新增帐户',
	initComponent:function() {

		this.items = [
			{
				xtype : 'form',
				frame : true,
				bodyPadding : 5,
				region : 'center',
				url : '/admin/account/insert',
				fieldDefaults : {
					labelAlign : 'left',
					labelWidth : 100,
					anchor : '100%'
				},
				items : [
					{
						xtype : 'combobox',
						name : 'sns',
						fieldLabel : '认证社区',
						store:[['1','新浪微博']],
						allowBlank : true
					},
					{
						xtype : 'textfield',
						name : 'screenName',
						fieldLabel : '社区昵称',
						allowBlank : true
					}, {
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
						fieldLabel : '过期时间',
						allowBlank : false,
						format: 'Y-m-d H:i:s',
						minValue: new Date()
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
						name : 'fatherNode',
						fieldLabel : '父ID'
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
				accountid:''
			}
		];
	    this.callParent();
	}
});
