exports.validNum = function validNum(num){
	if(this.isEmpty(num)){
		return false;
	}
	var numTest=/^\d+\.{0,1}\d*$/;
	var isNum=numTest.test(num);
	return isNum;
};

exports.isInt = function isInt(num){
	if(this.isEmpty(num)){
		return false;
	}
	var numTest=/^\d*$/;
	var isNum=numTest.test(num);
	return isNum;
};

exports.parseNum = function parseNum(num,defaultVal){
	if(this.validNum(num)){
		return parseInt(num);
	}
	return defaultVal;
};

exports.isValidMobile = function isValidMobile(mobile){
	var pattern = /^1[3,4,5,8]{1}[0-9]{9}$/;
	return pattern.test(mobile);
};
	
exports.isEmail = function isEmail(email){
  var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
  return reg1.test( email );
};

exports.isTel = function isTel(tel){
  var reg = /^[\d|\-|\s|\_]+$/;
  return reg.test( tel );
};

exports.isTime = function isTime(val){
  var reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;
  return reg.test(val);
};

exports.trim = function trim(text) {
	text = text || '';
	if (typeof(text) == "string")
	{
		return text.replace(/^\s*|\s*$/g, "");
	}
	else
	{
		return text;
	}
};

exports.isEmpty = function isEmpty(val){
  switch (typeof(val))
  {
    case 'string':
      return this.trim(val).length == 0 ? true : false;
      break;
    case 'number':
      return val == 0;
      break;
    case 'object':
      return val == null;
      break;
    case 'array':
      return val.length == 0;
      break;
    default:
      return true;
  }
};

exports.htmlEncode = function htmlEncode(val){
	var text = val || '';
	return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

exports.get = function get(val,defaultVal){
	if(this.isEmpty(val))
	{
		return defaultVal;
	}else{
		return val;
	}
};

exports.getString = function getString(val,defaultVal){
	defaultVal = defaultVal || '';
	return this.get(this.trim(val),defaultVal);
};

exports.getBoolean = function getBoolean(val,defaultVal){
	defaultVal = defaultVal || false;
	if(val=='true' || val=='on')
	{
		val = true;
	}else{
		val = defaultVal;
	}
	return val;
};

exports.getInt = function getInt(val,defaultVal){
	defaultVal = defaultVal || 0;
	return this.get(val,defaultVal);
};

exports.getDate = function getDate(val,defaultVal){
	defaultVal = defaultVal || '';
	return this.get(new Date(val),defaultVal);
};

exports.getObject = function getObject(val,defaultVal){
	defaultVal = defaultVal || {};
	return this.get(val,defaultVal);
};

exports.getArray = function getArray(val,defaultVal){
	defaultVal = defaultVal || [];
	return this.get(val,defaultVal);
};

exports.inArray = function inArray(val,arrList){
	if(arrList==null || arrList.length==0 || val==null) return false;
	for(var i=0;i<arrList.length;i++){
		if(arrList[i]==val) return true;			
	}
	return false;
};
//get-acl----->getAcl
exports.wordConvert = function wordConvert(val){
	if(!val) return '';
	var words = val.split('-');
	if(words.length==0) return val;
	var word = '';
	var wordLen = 0;	
	for(var i=1;i<words.length;i++){		
		word = words[i].toLowerCase();
		wordLen = word.length;
		if (wordLen > 0)  {
			word = word.substring(0,1).toUpperCase() + word.substring(1,wordLen);			
		}
		words[i] = word;
	}
	val =words.join("");
	console.info(val);
	return val;
};

exports.jsonEncode = function jsonEncode(val){
	return JSON.stringify(val);
};

exports.jsonDecode = function jsonDecode(val){
	return JSON.parse(val);
};