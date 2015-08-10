
var routes = require('./routes');
var Tools = require('./tools');
var adminController = require('./routes/admin/indexController');
var accountController = require('./routes/admin/accountController');
var menuController = require('./routes/admin/menuController');
var roleController = require('./routes/admin/roleController');
var iDatabaseController = require('./routes/admin/iDatabaseController');
var url = require('url');

module.exports = function (app) {
	app.get('/(index)?', routes.index);
	app.get('/install', routes.install);
	
	/*
	*下面这块逻辑最好做成活的，因为除了权限判断处理之外，可能还有其他的逻辑处理	
	*/
	app.all('/admin/?*', function(req, res, next) {		
		var permissionFilter = function(req, res, next){
			var pathName = url.parse(req.url).pathname;
			var pathNameArr = pathName.split('/');
			var moduleName = pathNameArr[1];//'admin';
			var controllerName = pathNameArr[2]?Tools.wordConvert(pathNameArr[2]):'index';//'index';
			var actionName = pathNameArr[3]?Tools.wordConvert(pathNameArr[3]):'index';//'index';
			
			//console.info(pathNameArr);
			var adminInfo = req.session.adminInfo;
			var roleAlias = 'guest';
			var permission = {};
			if(adminInfo){//登陆之后
				roleAlias = adminInfo.roleInfo['roleAlias'];
				permission = adminInfo.roleInfo['permission'];				
			}else{//未登陆
				permission['index'] = ['index','install'];
				permission['account'] = ['login'];
			}
			//console.info(permission);
			var isAllowed = true;
			// 角色判断,当用户角色为非超级管理员时，进行权限判断
			if (roleAlias != 'superAdmin') {
				var actionList = permission[controllerName]?permission[controllerName]:[];
				console.info(actionList);
				isAllowed = Tools.inArray(actionName,actionList);//是否存在
				if (!isAllowed) {
					console.info('deny');
					res.send(Tools.jsonEncode({success:false,access:'deny',msg:"很抱歉，您无权访问本资源!请重新登录、或者联系技术部开通管理权限"}));
				}
			}
			return isAllowed;			
		};
		if (!permissionFilter(req, res, next)) {//权限判断处理
			return;
		}
		/* 另外的处理
		var filter2 = function(req, res, next){
			console.info('filter2');
			var adminInfo = req.session.adminInfo;
			if(adminInfo){//登陆之后
				return;
			}
		}*/ 
		next();
	});
	
	app.get('/admin(/index)?(/index)?', adminController.indexAction);
	app.get('/admin/index/logout', adminController.logoutAction);
	app.get('/admin/index/install', adminController.installAction);
	
	app.post('/admin/account/login', accountController.loginAction);
	app.get('/admin/account/keep', accountController.keepAction);
	app.get('/admin/account/read', accountController.readAction);
	app.get('/admin/account/all', accountController.allAction);
	app.post('/admin/account/insert', accountController.insertAction);
	app.post('/admin/account/update', accountController.updateAction);
	app.post('/admin/account/remove', accountController.removeAction);
	app.post('/admin/account/drop', accountController.dropAction);
	
	app.get('/admin/menu(/index)?', menuController.indexAction);
	app.get('/admin/menu/allmenu', menuController.allmenuAction);
	app.get('/admin/menu/allrootmenu', menuController.allrootmenuAction);
	app.post('/admin/menu/add', menuController.addAction);
	app.post('/admin/menu/edit', menuController.editAction);
	app.post('/admin/menu/remove', menuController.removeAction);

	app.get('/admin/role/read', roleController.readAction);
	app.get('/admin/role/get-acl', roleController.getAclAction);
	app.get('/admin/role/read-one', roleController.readOneAction);
	app.post('/admin/role/insert', roleController.insertAction);
	app.post('/admin/role/update', roleController.updateAction);
	app.post('/admin/role/remove', roleController.removeAction);

	app.get('/admin/iDatabase/allItem', iDatabaseController.allItemAction);
};