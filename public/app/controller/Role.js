Ext.define('UMA.controller.Role', {

	extend : 'Ext.app.Controller',

	models : [
		'Role','DataMenu'
	],
	stores : [
		'Role', 'ActiveStatus','DataCheckMenu'
	],
	views : [
		'role.Add', 'role.Edit', 'role.Grid','role.EditMenuTree','menu.AllMenuTree'
	],

	refs : [
	{	
			ref : 'DataCheckMenu',
			selector : 'DataCheckMenu'
		},
		{	
			ref : 'allMenuTree',
			selector : 'allMenuTree'
		},
		{
			ref : 'roleAdd',
			selector : 'roleAdd'
		}, {
			ref : 'roleEdit',
			selector : 'roleEdit'
		}, {
			ref : 'Role',
			selector : 'Role'
		}
	],
	init : function() {
		this.control({
			'roleAdd button[action=reset]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					form.reset();
				}
			},
			'roleAdd button[action=submit]' : {
				click : function(button) {
					//var records = ;
					
					    var records =this.getAllMenuTree().getChecked();
						if(records.length==0)
					  	{
					  		Ext.Msg.alert('提示','请选择可用菜单');
					  		return;
					  	}
					  	
                      names = [];
		  			    Ext.Array.each(records, function(rec){
                       
                        names.push(rec.get('_id'));
                    });
                	
					var store	= this.getRoleStore();
					var form = button.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							params : {'menus[]':names},
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
			'roleEdit button[action=reset]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					form.reset();
				}
			},
			'roleEdit button[action=submit]' : {
				click : function(button) {
						var records =this.getAllMenuTree().getChecked();
					  	if(records.length==0)
					  	{
					  		Ext.Msg.alert('提示','请选择可用菜单');
					  		return;
					  	}
					  	
                            names = [];
		  			    Ext.Array.each(records, function(rec){
                      		names.push(rec.get('_id'));
                    });
					var store	= this.getRoleStore();
					
					var form = button.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							params : {'menus[]':names},
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
			'Role button[action=add]' : {
				
				click : function() {
					
					Ext.Ajax.request({
						url : '/admin/role/get-acl',
						success : function(response) {
							var text = response.responseText;
							var json = Ext.decode(text);
							var promissAll = [];
							for(key in json) {
								var cellItem = [];
								for(i in json[key]) {
									cellItem.push({
							               xtype      : 'checkboxfield',
							               name       : key+'[]',
							               inputValue : json[key][i],
							               boxLabel   : json[key][i]
							        });
								}
								
								var promissCheckBoxs = [];
								promissCheckBoxs.push({
						            xtype: 'checkboxgroup',
						            fieldLabel: '',
						            columns: 1,
						            items: cellItem
						        });
								var promissList = {
						        	xtype: 'fieldset',
						            title: key,
						            items: promissCheckBoxs
						        };
									promissAll.push(promissList);
							}
							
							var roleItems = [{
								xtype:'textfield',
								name : 'roleName',
								fieldLabel : '角色名称',
								allowBlank : false
							},{
								xtype:'textfield',
								name : 'roleAlias',
								fieldLabel : '角色别名',
								vtype: 'alpha',
								allowBlank : false
							},{
					            xtype      : 'radiogroup',
					            fieldLabel : '是否活跃',
					            defaultType: 'radiofield',
					            allowBlank : false,
					            defaults: {
					                flex: 1
					            },
					            layout: 'hbox',
					            items: [
					                {
					                    boxLabel  : '活跃',
					                    name      : 'isActived',
					                    inputValue: '1',
					                    id        : 'isActivedRadio1'
					                }, {
					                    boxLabel  : '禁用',
					                    name      : 'isActived',
					                    inputValue: '0',
					                    id        : 'isActivedRadio2'
					                }
					            ]
					        },{
					        	xtype: 'fieldset',
					            title: '权限控制',
					            items: promissAll
					        }];	
							
							var window = Ext.widget('roleAdd', {roleItems: roleItems});
							
							window.show();
						}
					});	
				}
			},
			'Role button[action=edit]' : {
				click : function(button) {
					var grid	= button.up('gridpanel');
					var records = this.getRoleStore();
					var selections = grid.getSelectionModel().getSelection();
					if (selections.length > 0) {
						var role	= selections[0];
						
						Ext.Ajax.request({
							url : '/admin/role/get-acl',
							success : function(response) {
								var text = response.responseText;
								var json = Ext.decode(text);
								var promissAll = [];
								for(key in json) {
									var cellItem = [];
									for(i in json[key]) {
										cellItem.push({
								               xtype      : 'checkboxfield',
								               id         : key+json[key][i],
								               name       : key+'[]',
								               inputValue : json[key][i],
								               boxLabel   : json[key][i]
								        });
									}
									
									var promissCheckBoxs = [];
									promissCheckBoxs.push({
							            xtype: 'checkboxgroup',
							            fieldLabel: '',
							            columns: 3,
							            items: cellItem
							        });
									
									var promissList = {
							        	xtype: 'fieldset',
							            title: key,
							            items: promissCheckBoxs
							        };
									
									promissAll.push(promissList);
								}
								
								var roleItems = [{
									xtype:'hiddenfield',
									name : '_id',
									fieldLabel : 'ID',
									allowBlank : false
								},{
									xtype:'textfield',
									name : 'roleName',
									fieldLabel : '角色名称',
									allowBlank : false
								},{
									xtype:'textfield',
									name : 'roleAlias',
									fieldLabel : '角色别名',
									vtype: 'alpha',
									allowBlank : false
								},{
						            xtype      : 'radiogroup',
						            fieldLabel : '是否活跃',
						            defaultType: 'radiofield',
						            allowBlank : false,
						            defaults: {
						                flex: 1
						            },
						            layout: 'hbox',
						            items: [
						                {
						                    boxLabel  : '活跃',
						                    name      : 'isActived',
						                    inputValue: '1',
						                    id        : 'isActivedRadio1'
						                }, {
						                    boxLabel  : '禁用',
						                    name      : 'isActived',
						                    inputValue: '0',
						                    id        : 'isActivedRadio2'
						                }
						            ]
						        },{
						        	xtype: 'fieldset',
						            title: '权限控制',
						            items: promissAll
						        }];	
								
							
							
								var window = Ext.widget('roleEdit', {roleItems: roleItems,roleid:role.get('_id')});
								var form =window.down('form').getForm();
								form.setValues({
									_id : role.get('_id'),
									roleName : role.get('roleName'),
									roleAlias : role.get('roleAlias'),
									isActived : role.get('isActived')
								});
								
								var formValues = [];
								var permission = Ext.decode(role.get('permission'));
								for(key in permission){
									for(k in permission[key]) {
										formValues.push({id : key+permission[key][k] , value : true});
									}
								}
								form.setValues(formValues);
						
							
								window.show();
							}
						});

					}
				}
			},
			'Role button[action=save]' : {
				click : function(button) {
                    var records = this.getRoleStore().getNewRecords();
                    var recordsNumber = records.length;
                    if(recordsNumber==0) {
                    	Ext.Msg.alert('提示信息', '未发现信息修改');
                    }
                    var updateList = [];
                    for(var i=0;i<recordsNumber;i++) {
                        record = records[i];
                        if(record.dirty==true) {
                            for(var key in record.data) {
                            	console.info(key);
                            	console.info(record.data[key]);
                            }
                            updateList.push(record.data);
                        }
                    }

                    Ext.Ajax.request({
                        url: '/admin/role/update',
                        params: {
                            jsonInfos: Ext.encode(updateList)
                        },
                        scope:this,
                        success: function(response){
                            var text = response.responseText;
                            if(parseInt(text)==1) {
                                Ext.Msg.alert('提示信息', '更新操作已成功');
                                this.getRoleStore().load();
                            }
                            else {
                                Ext.Msg.alert('提示信息', '更新操作失败');
                            }
                        }
                    });
					
				}
			},
			'Role button[action=remove]' : {
				click : function(button) {
					var grid	= button.up('gridpanel');
					var selections = grid.getSelectionModel().getSelection();
					if (selections.length > 0) {
						Ext.Msg.confirm('提示信息','请确认是否要删除您选择的信息?',function(btn){
								if (btn == 'yes') {
									var id = [];
	                                for(var i=0;i<selections.length;i++) {
	                                    selection = selections[i];
	                                    grid.store.remove(selection);
	                                    id.push(selection.get('_id'));
	                                }
	                                
									Ext.Ajax.request({
										url : '/admin/role/remove',
										params : {
											_id : Ext.encode(id)
										},
										scope:this,
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
							},this);
					}
					else {
						 Ext.Msg.alert('提示信息', '请选择您要删除的项目');
					}
				}
			}
		});
	}
});