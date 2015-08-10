Ext.define('UMA.view.Viewport', {
	extend : 'Ext.container.Viewport',

	requires : [
		'UMA.view.Main', 'UMA.view.MenuTree', 'Ext.panel.Panel', 'Ext.layout.container.Border'
	],

	layout : 'border',
	
	initComponent : function() {
		document.getElementById('header').style.display = 'block';
		document.getElementById('loading').style.display = 'none';
		
		if (typeof (my) == 'undefined') {
			var win = null;

			var resize = function() {
				if (win != null) {
					win.center();
				}
			};

			Ext.EventManager.onWindowResize(resize);

			win = new Ext.Window({
				//title : '登录',
				modal : true,
				closable : false,
				width : 330,
				height : 190,
				border : false,
				plain : false,
				layout: 'fit',
				header:false,
				items :[{ 
					xtype : 'tabpanel',
					defaults :{
						bodyPadding: 5,
						autoScroll: true
					},
					items :[
						{
							xtype : 'form',
							frame : false,
							bodyPadding : 10,
							url : '/admin/account/login',
							title: '账户登录',
							fieldDefaults : {
								labelAlign : 'left',
								labelWidth : 80,
								anchor : '100%'
							},
							items : [
								{
									xtype : 'textfield',
									name : 'accountName',
									fieldLabel : '用户姓名',
									allowBlank : false,
									emptyText: '请输入您的用户姓名'
								},{
									xtype : 'textfield',
									name : 'pwd',
									fieldLabel : '授权密码',
									allowBlank : false,
									inputType: 'password',
									minLength: 8,
									emptyText: '请输入您的授权密码'
								}
							],
							buttons : [
								{
									text    : '重置',
									iconCls : 'reset',
									action  : 'reset',
									handler : function() {
										var form = this.up('form').getForm();
										form.reset();
									}
								}, {
									text : '登录',
									iconCls : 'login',
									formBind : true,
									disabled : true,
									action : 'submit',
									handler: function() {
										var form = this.up('form').getForm();
										if (form.isValid()) {
											form.submit({
												success : function(form, action) {
													Ext.Msg.alert('成功提示', action.result.msg);
													window.location.href = '/admin';
												},
												failure : function(form, action) {
													Ext.Msg.alert('失败提示', action.result.msg);
												}
											});
										}
									}
								}
							]
						}
					]
				}]
			});

			win.addListener('beforeshow', function(o) {
				win = o;
			});

			win.addListener('destroy', function(o) {
				win = null;
			});

			win.show();
			win.center();

			this.items = [
				{
					region : 'center',
					xtype : 'panel',
					bbar : [
						'->', '沪ICP备09067636号 '
					],
					html : '&nbsp;'
				}
			];
		}
		else {
		    Ext.create('Ext.Button', {
		        text    : ' 注 销 登 录 ',
		        width   : 100,
		        renderTo: 'logout',
		        handler : function() {
		            window.location.href='/admin/index/logout';
		        }
		    });
			
			this.items = [
				{
					xtype: 'component',
					region : 'north',
					el: 'header'
				}, {
					region : 'west',
					xtype : 'menuTree'
				}, {
					region : 'center',
					xtype : 'main',
					el:'main'
				}
			];
		}
		this.callParent(arguments);
	}

});