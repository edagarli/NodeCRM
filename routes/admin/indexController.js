
/*
 * GET home page.
 */
var Tools = require('../../tools');
var Menu = require('../../models/menu.js');
var Role = require('../../models/role.js');
var Account = require('../../models/account.js');
var Fiber = require('fibers');

exports.indexAction = function(req, res){	
  var adminInfo = req.session.adminInfo; 
  var my = '';
  if(adminInfo)
  {
	my = Tools.jsonEncode(adminInfo.userInfo);    
  }
  res.render('index', { title: 'uma', my: my });
};

exports.logoutAction = function(req, res) {
    req.session.adminInfo = null;
    req.flash('success', '登出成功');
    res.redirect('/admin');
};

exports.installAction = function(req, res) {
	Fiber(function(){
		try {
		
			var modelMenu = new Menu();
			var doc = {
				name:'权限管理',
				mid:'00',
				rootname:'',
				children:[],
				created:new Date(),
				expanded:true,
				leaf:false
			};
			var menuinfo = modelMenu.insert(doc);
			menuinfo=menuinfo[0];
			console.info(menuinfo);
			
			doc = {
				name:'账户管理',
				mid:'Account',
				rootname:menuinfo['_id'].toString(),
				children:[],
				created:new Date(),
				expanded:false,
				leaf:true
			};
			var menuAccountInfo =modelMenu.insert(doc);
			menuAccountInfo=menuAccountInfo[0];
			
			doc = {
				name:'菜单管理',
				mid:'Menu',
				rootname:menuinfo['_id'].toString(),
				children:[],
				created:new Date(),
				expanded:false,
				leaf:true
			};
			var menuMenuInfo =modelMenu.insert(doc);
			menuMenuInfo=menuMenuInfo[0];
			
			doc = {
				name:'角色管理',
				mid:'Role',
				rootname:menuinfo['_id'].toString(),
				children:[],
				created:new Date(),
				expanded:false,
				leaf:true
			};
			var menuRoleInfo =modelMenu.insert(doc);
			menuRoleInfo=menuRoleInfo[0];
			
			var modelRole = new Role();
			var acl = modelRole.getAcl();			
			
			doc = {
				roleName:'superAdmin',
				menus:[menuinfo['_id'].toString(),menuAccountInfo['_id'].toString(),menuMenuInfo['_id'].toString(),menuRoleInfo['_id'].toString()],
				permission:acl,
				roleAlias:'superAdmin',
				isActived:'1',
				createTime:new Date()
			};
			var roleinfo = modelRole.insert(doc);
			roleinfo=roleinfo[0];
			
			var modelAccount = new Account();
			doc={
				privileges:[],
				userId:'',
				screenName:'',
				name:'admin',
				description:'admin',
				roleId:roleinfo['_id'].toString(),
				isActived:1,
				mobile:'13513513512',
				phone:'12345678',
				email:'admin@admin.com',
				expireTime:'2018-12-31 00:00:00',
				pwd:'adminadmin',
				fatherNode:'',
				createTime:new Date()
			};
			var accountinfo = modelAccount.insert(doc);
			accountinfo=accountinfo[0];
			
			res.send(Tools.jsonEncode({success:true,msg:'系统构建成功'}));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();

	
};
