var ModelMongo=require('./model_mongo');
var util=require('util');
var fs = require('fs');
var path = require('path');

function Role() {
	this.tableName = 'role';
	ModelMongo.call(this);
};
util.inherits(Role,ModelMongo);

/**
 * 获取module下的全部权限列表
 */
Role.prototype.getAcl = function getAcl() {
	var resourceList = {}; 
	function walk(dir){
		var dirList = fs.readdirSync(dir);
		dirList.forEach(function(item){
			if(fs.statSync(dir + '/' + item).isDirectory()){
				walk(dir + '/' + item);
			}else{
				var file = dir + '/' + item;
				if(path.extname(file) ==='.js'){
					var modelName = path.basename(file, '.js');
					//console.info(modelName);
					if(modelName.indexOf('Controller')>0){//modelName.substr(-10,10)
						var resource = require(file);
						var actionNames = [];
						for(var actionName in resource){
							if(actionName.indexOf('Action')>0){//actionName.substr(-6,6)
								//console.info(actionName);
								actionNames.push(actionName.substring(0,actionName.length-6));
							}							
						}						
						resourceList[modelName.substring(0,modelName.length-10)]	= actionNames;	
					}					
				}
			}
		});
	};
	walk(__dirname + '/../routes/admin');
	//console.info(resourceList);
	return resourceList;
};

module.exports = Role;