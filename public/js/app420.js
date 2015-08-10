if (typeof console == "undefined" || typeof console.log == "undefined") {
	var console = {
		log : function() {
			return false;
		},
		info : function() {
			return false;
		}
	};
}
var disableCache = true;

Ext.Loader.setConfig({
	disableCaching:disableCache, 
	enabled : true
});

Ext.Loader.setPath('Ext.ux', '/app/ux421');
Ext.Loader.setPath('app', '/app');

Ext.require([
    'Ext.ux.RowExpander',
    'Ext.selection.CheckboxModel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.form.HtmlEditor.imageUpload',
    'Ext.ux.form.HtmlEditor.ImageCropDialog',
    'Ext.ux.form.HtmlEditor.ImageDialog'
]);


Ext.override(Ext.data.proxy.Ajax, { timeout:600000 });
//Ext.override(Ext.Ajax.extraParams, { _dc : '201305241217' });
//Ext.Ajax.extraParams = {_dc: '201305241217'};

//解决form.loadRecord(rec)中combobox不能自动加载选择的问题,只能处理字符串型，无法处理_id等对象型的数据
Ext.form.field.ComboBox.override({
    setValue: function(v) {
        if(!this.store.isLoaded && this.queryMode == 'remote') {
        	if(typeof(v)==='string'||typeof(v)==='number') {
        		try {
	        		//给store添加额外参数，获取当前选中项目的值到列表中
	        		this.store.proxy.extraParams.idbComboboxSelectedValue = v;
        		}
        		catch(e) {
            		if (typeof console != "undefined")
            			console.info(typeof(e));
        		}
        		
        		try {
	                this.store.addListener('load', function() {
	                	try {
		                    this.store.isLoaded = true;
		                    this.setValue(v);
	                	}
	                	catch(e) {
	                		if (typeof console != "undefined")
	                			console.info(this,e);
	                	}
	               }, this);
	               this.store.load();
        		}
        		catch(e) { console.info(e);}
        	}
        	else {
        		this.callOverridden(arguments);
        	}
        } 
        else {
            this.callOverridden(arguments);
        }
    }
});

//自定义字段类型
Ext.apply(Ext.form.field.VTypes, {
    mongoField:  function(v) {
    	var ptn = /^[a-z0-9\._\-]+$/i;
        return ptn.test(v);
    },
    mongoFieldText: 'Must be a numeric IP address',
    mongoFieldMask: /^[a-z0-9\._\-]+$/i
});


Ext.application('app.application.UMA');
