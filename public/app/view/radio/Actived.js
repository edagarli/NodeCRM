Ext.define('UMA.view.radio.Actived', {
	extend : 'Ext.form.RadioGroup',
	alias : 'widget.activedRadio',
	name : 'actived',
	fieldLabel : '是否活跃',
	layout : 'hbox',
	defaultType : 'radiofield',
	items : [
		{
			boxLabel : '活跃',
			name : 'isActived',
			inputValue : 1,
			checked : true
		}, {
			boxLabel : '禁用',
			name : 'isActived',
			inputValue : 0
			
		}
	]
});