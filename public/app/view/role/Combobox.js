Ext.define('UMA.view.role.Combobox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.roleCombobox',
	name : 'roleId',
	fieldLabel : '角色',
	store :  'AllRole',
	queryMode : 'remote',
	forceSelection:true,
	editable : true,
	pageSize:10,
	queryParam:'search',
	typeAhead:true,
	valueField:'_id',
	displayField : 'roleName',
	allowBlank:false
});