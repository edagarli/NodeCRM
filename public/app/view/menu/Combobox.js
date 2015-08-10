Ext.define('UMA.view.menu.Combobox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.menuCombobox',
	name : 'rootmenu',
	fieldLabel : '上级目录',
	store :  'AllMenu',
	queryMode : 'remote',
	forceSelection:true,
	editable : true,
	pageSize:10,
	queryParam:'search',
	typeAhead:true,
	valueField:'_id',
	displayField : 'name',
	allowBlank:false
	
});