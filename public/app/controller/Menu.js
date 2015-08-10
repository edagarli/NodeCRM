Ext.define('UMA.controller.Menu', {

	extend : 'Ext.app.Controller',
	models : [
		'Menu','DataMenu'
	],
	views : [
		'MenuTree', 'Main','menu.Grid','menu.Add','menu.Edit'
	],
	
	stores : [
		'Menu','DataMenu','AllMenu'
	],

	refs : [
		{	
			ref : 'edit',
			selector : 'edit'
		},
		{
			ref : 'menuTree',
			selector : 'menuTree'
		}, {
			ref : 'main',
			selector : 'main'
		}
	],

	init : function() {
		this.control({
			
			'menuTree' : {
				itemclick : function(tree, item) {
					var id = item.get('mid');
					if (id != null && id !='') {
						var ptn = /^[0-9]+$/i;
						if(!ptn.test(id)) {
							var controller = 'UMA.controller.' + id;
							if(!Ext.ClassManager.isCreated(controller)) {
								var version = Ext.getVersion('core');
								if(version.isLessThan('4.2.0')) {
									ctl = app.getController(controller);
									ctl.init();
								}
								else {
									ctl = this.getApplication().getController(controller);
								}
							}
							id = id.replace('.', '');
							var view = this.getMain().getComponent(id);
							if (view == null) {
								view = Ext.widget(id, {
									id : id,
									title: item.get('name')
								});
								this.getMain().add(view);
							}
							this.getMain().setActiveTab(id);
							tree.up('panel').toggleCollapse();
						}
					}
				}
			},
			'Menu button[action=add]' : {
				click : function() {
					var window = Ext.widget('menuAdd');
					window.show();
				}
			},
			'Menu button[action=edit]' : {
				click : function(button) {
					var grid	= button.up('treepanel');
					var selections = grid.getSelectionModel().getSelection();
					if (selections.length > 0) {
						var record = selections[0];
						var window = Ext.widget('menuEdit');
						window.down('form').getForm().setValues({
							_id : record.get('_id'),
							name : record.get('name'),
							mid : record.get('mid'),
							leaf : record.get('leaf'),
							expanded : record.get('expanded')
						});
						window.show();
					}
				}
			},
			'Menu button[action=rootadd]' : {
				click : function() {
					var window = Ext.widget('rootmenuAdd');
					window.show();
				}
			},
			'menuEdit button[action=closewin]' : {
				click : function(button) {
						var win = button.up('window');
					win.close();
					}
				
			},
			'menuAdd button[action=closewin]' : {
				click : function(button) {
						var win = button.up('window');
					   	win.close();
					}
				
			},
			'menuAdd button[action=reset]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					form.reset();
				}
			},
			'menuAdd button[action=submit]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							success : function(form, action) {
								Ext.Msg.alert('成功提示', action.result.msg);
								form.reset();
								Ext.data.StoreManager.lookup('DataMenu').load();
							},
							failure : function(form, action) {
								Ext.Msg.alert('失败提示', action.result.msg);
							}
						});
					}
				}
			},
			'rootmenuAdd button[action=submit]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							success : function(form, action) {
								Ext.Msg.alert('成功提示', action.result.msg);
								form.reset();
								Ext.data.StoreManager.lookup('DataMenu').load();
							},
							failure : function(form, action) {
								Ext.Msg.alert('失败提示', action.result.msg);
							}
						});
					}
				}
			},
			'rootmenuAdd button[action=closewin]' : {
				click : function(button) {
						var win = button.up('window');
					   	win.close();
					}
				
			},
			'rootmenuAdd button[action=reset]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					form.reset();
				}
			},
			'menuEdit button[action=submit]' : {
				click : function(button) {
					var form = button.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							success : function(form, action) {
								Ext.Msg.alert('成功提示', action.result.msg);
								form.reset();
								var win = button.up('window');
								win.close();
								Ext.data.StoreManager.lookup('DataMenu').load();
							},
							failure : function(form, action) {
								Ext.Msg.alert('失败提示', action.result.msg);
							}
						});
					}
				}
			},
			'Menu button[action=remove]' : {
				click : function(button) {
					var grid = button.up('treepanel');
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
										url : '/admin/menu/remove',
										params : {
											_id :  Ext.encode(id)
										},
										success : function(response) {
											var text = response.responseText;
											var json = Ext.decode(text);
											Ext.Msg.alert('提示信息', json.msg);
											if (json.success) {
												Ext.data.StoreManager.lookup('DataMenu').load();
											}
										}
									});
								}
							},
							icon : Ext.window.MessageBox.QUESTION
						});
					}
					else
					{
						Ext.Msg.alert('失败提示',"请至少选择一跳记录!");
					}
					

				}
			}
		});
	}
});