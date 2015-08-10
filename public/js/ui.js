/**
 * Updated 2010-11-03
 * 
 * @author Jack, mail: xiaoyuelang at gmail.com
 * 
 */
var UI = {
		
	xml: function (tag, a) {
		if(typeof(a) == 'object') {
			var c = a.c;
			delete a.c;
		
			var html = '<';
			html += tag;
			if(a != null) {
				for(var k in a) {
					html += ' ';
					html += k;
					html += '="';
					html += a[k];
					html += '"';
				}
			}
			if( c != null) {
				html += '>';
				html += c;
				html += '</';
				html += tag;
				html += '>';
			}
			else {
				html += '/>';
			}
			a.c = c;
			return html;
		}
		else {
			var html = '<';
			html += tag;
			html += '>';
			html += a;
			html += '</';
			html += tag;
			html += '>';
			return html;
		}
	},
	a:function (a) {
		return UI.xml('a', a);
	},
	b:function (a) {
		return UI.xml('b', a);
	},
	cite:function(a) {
		return UI.xml('cite', a);
	},
	dd:function (a) {
		return UI.xml('dd', a);
	},
	div:function (a) {
		return UI.xml('div', a);
	},
	dl:function (a) {
		return UI.xml('dl', a);
	},
	
	dt:function (a) {
		return UI.xml('dt', a);
	},
	
	em:function (a) {
		return UI.xml('em', a);
	},
	
	fieldset:function (a) {
		return UI.xml('fieldset', a);
	},
	
	form: function(a) {
		return UI.xml('form', a);
	},
	
	label:function(a) {
		return UI.xml('label', a);
	},
	
	legend:function (a) {
		return UI.xml('legend', a);
	},
	li:function (a) {
		return UI.xml('li', a);
	},
	p:function (a) {
		return UI.xml('p', a);
	},
	i:function (a) {
		return UI.xml('i', a);
	},
	img:function (a) {
		return UI.xml('img', a);
	},
	
	input:function (a) {
		return UI.xml('input', a);
	},
	
	ol:function (a) {
		return UI.xml('ol', a);
	},
	
	span:function(a) {
		return UI.xml('span', a);
	},
	
	table:function (a) {
		return UI.xml('table', a);
	},
	tbody:function (a) {
		return UI.xml('tbody', a);
	},
	td:function (a) {
		return UI.xml('td', a);
	},
	
	textarea: function(a) {
		return UI.xml('textarea', a);
	},
	
	th: function (a) {
		return UI.xml('th', a);
	},
	thead:function (a) {
		return UI.xml('thead', a);
	},
	tr:function (a) {
		return UI.xml('tr', a);
	},
	ul:function (a) {
		return UI.xml('ul', a);
	}
};

/**
 * 列表
 */
var Select = {
	create: function(o) {
		var value = o.value;
		delete o.value;
		
		var options = o.options;
		delete o.options;
		
		o.c = this.createOptions(options, value);
		return UI.xml('select', o);
	},
	createOptions:function(o, value) {
		var c = '';
		for(var i = 0; i < o.length; i ++) {
			c += this.createOption(o[i], value);
		}
		return c;
	},
	createOptgroup:function(o, value) {
		o.c = this.createOptions(o.options, value);
		delete o.options;
		return UI.xml('optgroup', o);
	},
	createOption:function(o, value) {
		if(typeof(o) == 'object') {
			if(o.tag == 'optgroup') {
				delete o.tag;
				return this.createOptgroup(o, value);
			}
			else {
				if(o.value == value) {
					o.selected = 'selected';
				}
				if(o.c == null) {
					o.c = o.value;
				}
				delete o.label;
				return UI.xml('option', o);
			}			
		}
		else {
			o = {label: o, value: o, c: o};
			if(o.value == value) {
				o.selected = 'selected';
			}
			return UI.xml('option', o);
		}
	}
};

/**
 * 
 * Created on 2010-11-03
 * 
 * @returns {UICore}
 */

function UICore() {
	
	this.className	= null;
	this.id			= null;
	this.style		= null;
	
	this.getClassName = function() {
		return this.className;
	};
	
	this.getID = function() {
		return this.id;
	};
	
	this.getStyle = function() {
		return this.style;
	};
	
	this.setClassName = function(className) {
		this.className = className;
		return this;
	};
	
	this.setID = function(id) {
		this.id = id;
		return this;
	};
	
	this.setStyle = function(style) {
		this.style = style;
		return this;
	};
}

/**
 * 表格的列
 * 
 * Updated on 2010-11-03
 * 
 * @param name
 * @param title
 * @returns {TableColumn}
 */
function TableColumn(name, title) {
	
	this.name	= name;
	this.title	= title;
	this.width	= null;
	this.align	= null;
	
	this.getAlign	= function() {
		return this.align;
	};
	
	this.getName = function() {
		return this.name;
	};
	
	this.getTitle = function() {
		return this.title;
	};
	
	this.getWidth = function() {
		return this.width;
	};
	
	this.setAlign	= function(align) {
		this.align	= align;
	}
	
	this.setName = function(name) {
		this.name = name;
	};
	
	this.setTitle = function(title) {
		this.title = title;
	};
	
	this.setWidth = function(width) {
		this.width = width;
	};
	
	this.toString = function() {
		var c = {};
		c.c = this.title;
		if(this.width != null) {
			if(this.style != null) {
				c.style	= this.style + '; width: ' + this.width; 
			}
			else {
				c.style = 'width: ' + this.width;	
			}
		}
		return UI.th(c);
	};
}

TableColumn.prototype = new UICore();

/**
 * 表格类
 * 
 * Updated on 2010-11-03
 * 
 * @param objects
 * @returns {Table}
 */
function Table(objects) {
	
	this.objects = objects;
	
	this.columns = new Array();
	
	this.addColumn = function(column) {
		this.columns.push(column);
		return this;
	};
		
	this.toString = function() {
		var rows = new Array();
		var r = new Array();
		
		for(var i = 0; i < this.columns.length; i ++) {
			var c = this.columns[i];
			r.push(c);
		}
		var thead = UI.thead(UI.tr(r.join('')));
		
		for(var j = 0; j < this.objects.length; j ++) {
			r = new Array();
			var o = this.objects[j];
			for(var i = 0; i < this.columns.length; i ++) {
				var c		= this.columns[i];
				var value	= null;
				if(o[c.getName()] === undefined) {
					value = '&nbsp;';
				}
				else {
					value = {c: o[c.getName()]};
					if(c.getClassName() != null) {
						value['class'] = c.getClassName();
					}
					if(c.getStyle() != null) {
						value['style'] = c.getStyle();
					}
					if(c.getAlign() != null) {
						if(typeof(value['style']) == 'undefined') {
							value['style']	= '';
						}
						else {
							value['style']	+= ';';
						}
						value['style']	+= 'text-align: ' + c.getAlign();
					}
				}
				r.push(UI.td(value));
			}
			rows.push(UI.tr(r.join('')));
		}
		
		var table = {};
		if(this.id != null) {
			table.id = this.id;
		}
		if(this.className != null) {
			table['class'] = this.className;
		}
		table.c = thead + UI.tbody(rows.join(''));
		return UI.table(table);
	};
}

/**
 * Created on 2010-11-03
 * 
 * @param objects
 * @returns {Form}
 */

function Form(objects, values) {
	
	this.objects	= objects;
	this.values		= values;
	
	this.getAction	= function() {
		return this.action;
	};
	
	this.getName	= function() {
		return this.name;
	};
	
	this.getValue	= function(name) {
		return document.forms[this.name].name.value;
	};
	
	this.setAction	= function(action) {
		this.action = action;
		return this;
	};
	
	this.setName	= function(name) {
		this.name = name;
		return this;
	};
	
	this.warn		= function(name, warn) {
		
		return this;
	};
	
	this.validate	= function() {
		var error = false;
		for(var i = 0; i < this.objects.length; i ++) {
			var o = objects[i];
			if(o.validate != null) {
				if(o.validate instanceof RegExp) {
					var value = this.getValue(o.name);
					var warn = null;
					if(!value.match(o.validate)) {
						warn = o.warn;
					}
					if(warn != null) {
						error = true;
						this.warn(o.name, warn);
					}
				}
				else if(typeof(o.validate) == 'function') {
					var warn = o.validate(this.getValue(o.name));
					if(warn != null) {
						error = true;
						this.warn(o.name, warn);
					}
				}
			}
		}
		return error;
	};
	
	this.randomID = function() {
		return new String((Math.random())).substring(2);
	};
	
	this.input	= function(o) {
		if(o.label == null) {
			return UI.input(o);
		}
		else {
			var id = this.randomID();
			var a = clone(o);
			a.id = id;
			delete a.validate;
			delete a.label;
			return UI.label({
				c: 		o.label,
				'for':	id
			})
			+ UI.input(a);
		}
	};
	
	this.dl = function(dt, dl) {
		return UI.dl(
			UI.dt(dt)
			+
			UI.dd(dl)
		);	
	};
	
	this.item = function(o) {
		if(typeof(o) == 'Array') {
			var html = '';
			for(var i = 0; i < o.length; i ++) {
				html += this.input(o[i]);
			}
			return html;
		}
		else {
			var id = new String((Math.random())).substring(2);
			var a = clone(o);
			a.id = id;
			delete a.validate;
			delete a.label;
			switch(o.type) {
				case 'select':
					delete a.type;
					return this.dl(
							UI.label({
								c: 		o.label,
								'for':	id
							}),
							Select.create(a)
						);
				case 'textarea':
					delete a.type;
					return this.dl(
						UI.label({
							c: 		o.label,
							'for':	id
						}),
						UI.textarea(a)
					);
				default:
					return this.dl(
						UI.label({
							c: 		o.label,
							'for':	id
						}),
						UI.input(a)
					);
			}
		}
	};
	
	this.toString = function() {
		var form		= {};
		form.method		= 'POST';
		if(this.action == null){
			form.action		= '/';
		}
		else {
			form.action		= this.action;
		}
		if(this.name 		!= null)	form.name		= this.name;
		if(this.id 			!= null)	form.id			= this.id;
		if(this.className 	!= null)	form.className	= this.className;
		
		var items	= [];
		for(var i = 0; i < this.objects.length; i ++) {
			var	o		= this.objects[i];
			var type	= o.type;
			switch(type) {
				
				case 'file':
					form.enctype	= 'multipart/form-data';
					items[i]		= this.input(o);
					break;
					
				case 'checkbox':
					var html	= '';
					var a		= clone(o);
					var value	= o.value;
					delete 		a.value;
					delete		a.label;
					for(var j = 0; j < value.length; j ++) {
						var id		= this.randomID();
						var label	= value[j]['label'];
						a.value		= value[j]['value'];
						a.id		= id;
						if(this.values != null && this.values[o.name] != null && this.values[o.name].inArray(a.value)) {
							a.checked = 'checked';
						}
						else {
							delete a.checked;
						}
						html	+= this.input(a) + UI.label({c: label, 'for': id});
					}
					var id		= this.randomID();
					items[i]	= this.dl(
						UI.label({c: o.label, 'for': id}),
						{c: html, id: id}
					);
					break;
					
				case 'radio':
					var html	= '';
					var a		= clone(o);
					var value	= o.value;
					delete 		a.value;
					delete		a.label;
					for(var j = 0; j < value.length; j ++) {
						var id		= this.randomID();
						var label	= value[j]['label'];
						a.value		= value[j]['value'];
						a.id		= id;
						if(this.values != null && this.values[o.name] == a.value) {
							a.checked = 'checked';
						}
						html	+= this.input(a) + UI.label({c: label, 'for': id});
					}
					var id		= this.randomID();
					items[i]	= this.dl(
						UI.label({c: o.label, 'for': id}),
						{c: html, id: id}
					);
					break;
					
				case 'text':
					if(this.values != null && this.values[o.name] != null) {
						o.value = this.values[o.name];
					}
					items[i]		= this.item(o);
					break;
					
				case 'select':
					if(this.values != null && this.values[o.name] != null) {
						o.value = this.values[o.name];
					}
					items[i]		= this.item(o);
					break;
					
				case 'textarea':
					if(this.values != null && this.values[o.name] != null) {
						o.c = this.values[o.name];
					}
					else {
						o.c = '&nbsp;';
					}
					items[i]		= this.item(o);
					break;
					
				default:
				//	items[i]		= UI[o.type](o);
			}
		}
		form.c = UI.ul(items.map(UI.li).join(''));
		return UI.form(form);
	};
}

Form.prototype = new UICore();