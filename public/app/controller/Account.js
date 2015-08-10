Ext.define('UMA.controller.Account', {

	extend : 'Ext.app.Controller',

	models : [
		'Account', 'Role','DataPrivilege'//,'account.priv.Form', 'account.priv.Project', 'account.priv.Structure'
	],
	stores : [
		'Account', 'AllAccount', 'AllRole','DataCheckPrivilege'//,'account.priv.Form', 'account.priv.Project', 'account.priv.Structure','Radio'
	],
	views : [
		'account.Add', 'account.Edit', 'account.Grid', 'account.AllPrivilegeTree'
		//,'account.Priv','account.priv.ProjectTabPanel','account.priv.FormTabPanel','idatabase.Structure', 'account.priv.FormMain','account.priv.FormGrid','account.priv.AccountPanel'
	],

	refs : [
		{	
			ref : 'allPrivilegeTree',
			selector : 'allPrivilegeTree'
		},
		/*
		{
			ref : 'accountPrivProjectTabPanel',
			selector : 'accountPrivProjectTabPanel'
		} ,
		{
			ref : 'accountPriv',
			selector : 'accountPriv'
		},
		*/
		{
			ref : 'accountAdd',
			selector : 'accountAdd'
		}, {
			ref : 'accountEdit',
			selector : 'accountEdit'
		}, {
			ref : 'Account',
			selector : 'Account'
		}
	],
	init : function() {
		this.control({
			'accountAdd button[action=reset]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					form.reset();
				}
			},
			'accountAdd button[action=submit]' : {
				click : function(button) {
					var records =this.getAllPrivilegeTree().getChecked();
					/*if(records.length==0)
					{
						Ext.Msg.alert('提示','请选择可用权限');
						return;
					}*/
					  	
                    names = [];
		  			Ext.Array.each(records, function(rec){
                        names.push(rec.get('_id'));
                    });
					
					var store	= this.getAccountStore();
					var form = button.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							params : {'privileges[]':names},
							waitTitle : "系统提示"/*系统提示*/,
							waitMsg : "您请求的操作正在进行中,请稍候..."/*您请求的操作正在进行中,请稍候...*/,
							success : function(form, action) {
								Ext.Msg.alert('成功提示', action.result.msg);
								form.reset();
								store.load();
							},
							failure : function(form, action) {
								Ext.Msg.alert('失败提示', action.result.msg);
							}
						});
					}
				}
			},
			'accountEdit button[action=reset]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					form.reset();
				}
			},
			'accountEdit button[action=submit]' : {
				click : function(button) {
					var records =this.getAllPrivilegeTree().getChecked();
					/*if(records.length==0)
					{
						Ext.Msg.alert('提示','请选择可用权限');
						return;
					}*/
					  	
                    names = [];
		  			Ext.Array.each(records, function(rec){
                        names.push(rec.get('_id'));
                    });
					
					var store	= this.getAccountStore();
					var allStore = this.getAllAccountStore();
					var form = button.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							params : {'privileges[]':names},
							waitTitle : "系统提示"/*系统提示*/,
							waitMsg : "您请求的操作正在进行中,请稍候..."/*您请求的操作正在进行中,请稍候...*/,
							success : function(form, action) {
								Ext.Msg.alert('成功提示', action.result.msg);
								store.load();
							},
							failure : function(form, action) {
								Ext.Msg.alert('失败提示', action.result.msg);
							}
						});
					}
				}
			},
			'Account button[action=add]' : {
				click : function() {
					var window = Ext.widget('accountAdd');
					window.show();
				}
			},
			'Account button[action=refresh]' : {
				click : function(button) {
					var grid = button.up('treepanel');
					grid.store.load();
				}
			},
			'Account button[action=edit]' : {
				click : function(button) {
					var grid	= button.up('treepanel');
					var selections = grid.getSelectionModel().getSelection();
					if (selections.length > 0) {
						var account = selections[0];
						var window = Ext.widget('accountEdit', {accountid:account.get('_id')});
						
						window.down('form').getForm().setValues({
							_id : account.get('_id'),
							name : account.get('name'),
							phone : account.get('phone'),
							mobile : account.get('mobile'),
							email : account.get('email'),
							pwd : account.get('pwd'),
							description : account.get('description'),
							roleId : account.get('roleId'),
							fatherNode : account.get('fatherNode'),
							isActived : account.get('isActived'),
							expireTime : account.get('expireTime'),
							userId : account.get('userId')
						});
						window.show();
					}
				}
			},
			'Account button[action=remove]' : {
				click : function(button) {
					var grid	= button.up('treepanel');
					var selections = grid.getSelectionModel().getSelection();
					if (selections.length > 0) {
						Ext.Msg.confirm({
							title : '提示信息',
							msg : '请确认是否要删除该信息?',
							buttons : Ext.Msg.YESNO,
							fn : function(btn) {
								if (btn == 'yes') {
									var id = [];
	                                for(var i=0;i<selections.length;i++) {
	                                    selection = selections[i];
	                                    id.push(selection.get('_id'));
	                                }
	                                
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
												grid.store.load();
											}
										}
									});
								}
							},
							icon : Ext.window.MessageBox.QUESTION
						});
					}
					else {
						Ext.Msg.alert('提示信息', '请选择您要删除的帐户');
					}
				}
			}
			/*,'Account button[action=priv]' : {
				click : function(button) {
					var grid	= button.up('treepanel');
					var selections = grid.getSelectionModel().getSelection();
					if (selections.length > 0) {
						var account = selections[0];
						Ext.Ajax.request({
							url : '/admin/account/read-priv-account',
							params : {
								accountId : account.get('_id')
							},
							success : function(response) {
								var text = response.responseText;
								var account_priv = Ext.decode(text);
								var window = Ext.widget('accountPriv', {
									id        : account.get('_id'),
									name      : account.get('_id'),
									title     : account.get('name')+'-权限设置',
									accountId : account.get('_id'),
									account_priv : account_priv
								});
								window.show();
							}
						});					
						
					}else {
						Ext.Msg.alert('提示信息', '请选择您要设置权限的帐户');
					}
				}
			},
			'accountPriv button[action=cancel]' : {
				click : function(button) {
					var win = button.up('window');
					win.close();
				}
			},
			'accountPriv button[action=apply]' : {
				click : function(button) {
					
					var _id  = Ext.getCmp('_id').getValue();
					var accountId  = Ext.getCmp('accountId').getValue();
					var selectable  = Ext.getCmp('select').getSubmitValue();
					var insertable  = Ext.getCmp('insert').getSubmitValue();
					var updateable  = Ext.getCmp('update').getSubmitValue();
					var deleteable = Ext.getCmp('delete').getSubmitValue();
					Ext.Ajax.request({
						url : '/admin/account/update-priv-account',
						params : {
							_id : _id,
							accountId : accountId,
							select : selectable,
							insert : insertable,
							update : updateable,
							delete : deleteable
						},
						success : function(response) {
							var rs = Ext.JSON.decode(response.responseText);
							//Ext.Msg.alert('提示信息',rs.msg);
							if(rs.success){
								Ext.getCmp('_id').setValue(rs._id);
							}
						}
					});
					
					var window = button.up('window');
					var grid = window.down('accountPrivProjectGrid');
					var records = grid.store.getUpdatedRecords();
					var recordsNumber = records.length;
					var processNumber = 0;
					if (recordsNumber == 0) {
						//Ext.Msg.alert('提示信息', '未发现信息修改');
					}
					else {
						var updateList = [];
						for ( var i = 0; i < recordsNumber; i++) {
							var record = records[i];
							updateList.push(record.data);
						}

						Ext.Ajax.request({
							url : '/admin/account/update-priv-project',
							params : {
								jsonInfos : Ext.JSON.encode(updateList)
							},
							success : function(response) {
								var rs = Ext.JSON.decode(response.responseText);
								Ext.Msg.alert('提示信息',rs.msg);
								if(rs.success){
									grid.store.load();
								}
							}
						});
					}
					processNumber += recordsNumber;
					var projectTabPanel =this.getAccountPrivProjectTabPanel();
					projectTabPanel.items.each(function(item,index,len){
						var grid = item.down('gridpanel');
						var records = grid.store.getUpdatedRecords();
						var recordsNumber = records.length;
						processNumber += recordsNumber;
						if (recordsNumber == 0) {
							//Ext.Msg.alert('提示信息', '未发现信息修改');
						}
						else {
							var updateList = [];
							for ( var i = 0; i < recordsNumber; i++) {
								var record = records[i];
								updateList.push(record.data);
							}

							Ext.Ajax.request({
								url : '/admin/account/update-priv-form',
								params : {
									jsonInfos : Ext.JSON.encode(updateList)
								},
								success : function(response) {
									var rs = Ext.JSON.decode(response.responseText);
									//Ext.Msg.alert('提示信息',rs.msg);
									if(rs.success){
										grid.store.load();
									}
								}
							});
						}
					},this);
					
					if (processNumber == 0) {
						Ext.Msg.alert('提示信息', '未发现信息修改');
					}
				}
			},
			'accountPrivProjectGrid' : {
				selectionchange : function(selectionModel, records) {
						if (records[0]) {
							var record = records[0];
							var id = record.get('projectId');
							var projectName = record.get('projectName');
							var projectTabPanel =this.getAccountPrivProjectTabPanel();
							var panel = projectTabPanel.getComponent(id);
							if (panel == null) {
								panel = Ext.widget('accountPrivFormMain', {
									id        : id,
									name      : id,
									title     : projectName+'-集合列表',
									projectId : record.get('projectId'),
									accountId : record.get('accountId'),
									closable:false,
									autoDestroy:false
								});
								projectTabPanel.add(panel);
							}
							projectTabPanel.setActiveTab(id);
							
						}
					}
			},
			'accountPrivProjectTabPanel' : {
				tabchange : function(tabPanel, newCard, oldCard, eOpts) {
						var grid = newCard.down('gridpanel');
						//alert(grid.isLayoutSuspended());						
						//alert(grid.isVisible());
					}
			},
			'accountPrivProjectGrid button[action=save]' : {
				click : function(button) {
					
					var grid = button.up('gridpanel');
					var records = grid.store.getUpdatedRecords();
					var recordsNumber = records.length;
					if (recordsNumber == 0) {
						Ext.Msg.alert('提示信息', '未发现信息修改');
					}
					else {
						var updateList = [];
						for ( var i = 0; i < recordsNumber; i++) {
							var record = records[i];
							updateList.push(record.data);
						}

						Ext.Ajax.request({
							url : '/admin/account/update-priv-project',
							params : {
								jsonInfos : Ext.JSON.encode(updateList)
							},
							success : function(response) {
								var rs = Ext.JSON.decode(response.responseText);
								Ext.Msg.alert('提示信息',rs.msg);
								if(rs.success){
									grid.store.load();
								}
							}
						});
					}
				}
			},
			'accountPrivFormGrid button[action=save]' : {
				click : function(button) {
					
					var grid = button.up('gridpanel');
					var records = grid.store.getUpdatedRecords();
					var recordsNumber = records.length;
					if (recordsNumber == 0) {
						Ext.Msg.alert('提示信息', '未发现信息修改');
					}
					else {
						var updateList = [];
						for ( var i = 0; i < recordsNumber; i++) {
							var record = records[i];
							updateList.push(record.data);
						}

						Ext.Ajax.request({
							url : '/admin/account/update-priv-form',
							params : {
								jsonInfos : Ext.JSON.encode(updateList)
							},
							success : function(response) {
								var rs = Ext.JSON.decode(response.responseText);
								Ext.Msg.alert('提示信息',rs.msg);
								if(rs.success){
									grid.store.load();
								}
							}
						});
					}
				}
			},
			'accountPrivAccountPanel button[action=save]' : {
				click : function(button) {
					var panel = button.up('panel');
					var _id  = Ext.getCmp('_id').getValue();
					var accountId  = Ext.getCmp('accountId').getValue();
					var selectable  = Ext.getCmp('select').getSubmitValue();
					var insertable  = Ext.getCmp('insert').getSubmitValue();
					var updateable  = Ext.getCmp('update').getSubmitValue();
					var deleteable = Ext.getCmp('delete').getSubmitValue();
					Ext.Ajax.request({
						url : '/admin/account/update-priv-account',
						params : {
							_id : _id,
							accountId : accountId,
							select : selectable,
							insert : insertable,
							update : updateable,
							delete : deleteable
						},
						success : function(response) {
							var rs = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('提示信息',rs.msg);
							if(rs.success){
								Ext.getCmp('_id').setValue(rs._id);
							}
						}
					});
				}
			}*/
		});
	}
});