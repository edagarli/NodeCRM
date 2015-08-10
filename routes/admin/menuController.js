
/*
 * GET menu page.
 */
var crypto = require('crypto');
var Menu = require('../../models/menu.js');
var Role = require('../../models/role.js');
var Fiber = require('fibers');
var Tools = require('../../tools');

exports.indexAction = function(req, res) {
	/*
    Menu.getMenuTree(false, null,'', function(err, menus) {
		res.send(Tools.jsonEncode(menus));
    });	*/
	
	Fiber(function(){
		try {
			var modelMenu = new Menu();
			var datas =[];
			console.info('before getMenuTree');
			var adminInfo = req.session.adminInfo;
			datas = modelMenu.getMenuTree(false, adminInfo.roleInfo['menus'], '');//[collection.pkFactory('5137eb0a7f50ea5010000004')]			
			console.info('after getMenuTree');			
			res.send(Tools.jsonEncode(datas));
		} catch (err) {
			console.info(err);
		}finally{
		}
	}).run();
};
    
exports.allmenuAction = function(req, res) {
	/*
	$roleInfo = null;
	if (g('roleid') != '') {
		$roleInfo = $this->_menuCollection->db->role->findOne(array('_id' => new MongoId(g('roleid'))));
		$aa = $this->getRoleCheckMenu('', $roleInfo['menus']);
	} 
	else {
		$aa = $this->getMenuTree(g('checkbox'));
	}
	echo json_encode(array_values($aa));
	*/
	Fiber(function(){
		try {
			var modelMenu = new Menu();
			//获取客户端get方式传递过来的值，通过使用req.query
			var roleid = Tools.getString(req.query.roleid);
			var checkbox = Tools.getBoolean(req.query.checkbox,false);			
			var datas = [];
			if(roleid){
				var modelRole = new Role();
				var roleInfo = modelRole.findOne({_id:modelRole.mongoId(roleid)});
				datas = modelMenu.getRoleCheckMenu('',roleInfo['menus']);
			}else{
				datas = modelMenu.getMenuTree(checkbox,null,'');
			}		
			res.send(Tools.jsonEncode(datas));
		} catch (err) {
			console.info(err);
		}finally{
		}
	}).run();
};
    
exports.editAction = function(req, res) {
	/*
	$return = null;
	$object = array('mid' => g('mid'), 'name' => g('name'));
	if (g('expanded') == "on") {
		$object['expanded'] = true;
	} 
	else {
		$object['expanded'] = false;
	}
	
	$flag = false;
	$query = array('_id' => new MongoId(g('_id')));
	$result = $this->_menuCollection->update($query, array(SET => $object));
	echo json_encode(array(SUCCESS => true, MSG => '修改成功'));
	*/
	Fiber(function(){
		try {						
			var modelMenu = new Menu();
			var mid = Tools.getString(req.body.mid);
			var name = Tools.getString(req.body.name);
			var leaf = Tools.getString(req.body.leaf);
			var expanded = Tools.getString(req.body.expanded);
			var _id = Tools.getString(req.body._id);
			if(expanded=='on'){
				expanded = true;
			}else{
				expanded = false;
			}
			if(leaf=='on'){
				leaf = true;
			}else{
				leaf = false;
			}
			var doc = {
				name:name,
				mid:mid,
				expanded:expanded,
				leaf:leaf
			};
			modelMenu.update({_id:modelMenu.mongoId(_id)},{$set:doc});
			res.send(Tools.jsonEncode({success:true,msg:'修改成功'}));
			
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};

exports.addAction = function(req, res) {
	/*
	$return   = null;
	$name     = g('mid');
	$menutype = g('menutype');
	if ($this->_menuCollection->count(array('mid' => g('mid'))) == 0) {
		$object = array(
			'mid'      => g('mid'), 
			'name'     => g('name'), 
			'rootname' => g('rootmenu'), 
			'children' => array(), 
			'created'  => new MongoDate()
		);
		if (g('expanded') == "on") {
			$object['expanded'] = true;
		} 
		else {
			$object['expanded'] = false;
		}
		if ($menutype == "0") {
			$object['leaf'] = false;
		} 
		else {
			$object['leaf'] = true;
		}
		$result = $this->_menuCollection->insert($object);
		$return = array(SUCCESS => true, MSG => '新增成功！');

	}
	else {
		$return = array(SUCCESS => false, MSG => '新增失败，菜单编号 "' . $name . '" 已经存在于菜单列表！');
	}
	echo json_encode($return);
	*/
	Fiber(function(){
		try {			
			var modelMenu = new Menu();
			var mid = Tools.getString(req.body.mid);
			var menutype = Tools.getString(req.body.menutype);
			var name = Tools.getString(req.body.name);
			var expanded = Tools.getString(req.body.expanded);			
			var rootmenu = Tools.getString(req.body.rootmenu);
			var count = modelMenu.count({mid:mid});
			if(count===0){
				if(expanded=='on'){
					expanded = true;
				}else{
					expanded = false;
				}
				if(menutype=='0'){
					leaf = true;
				}else{
					leaf = false;
				}
				
				var doc = {
					name:name,
					mid:mid,
					rootname:rootmenu,
					children:[],
					created:new Date(),
					expanded:expanded,
					leaf:leaf
				};
				modelMenu.insert(doc);
				res.send(Tools.jsonEncode({success:true,msg:'新增成功'}));	
			}else{
				res.send(Tools.jsonEncode({success:false,msg:'新增失败，菜单编号 "'+name+'" 已经存在于菜单列表！'}));
			}			
			
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};

exports.removeAction = function(req, res) {
	/*
	$datas = json_decode($_POST['_id'], true);
	foreach ($datas as $row) {
		$_id = new MongoId($row);
		$this->_menuCollection->remove(array('_id' => $_id));
	}
	echo json_encode(array('success' => true, 'msg' => '删除成功'));
	exit();
	*/
	Fiber(function(){
		try {
			var _ids = Tools.getString(req.body._id);
			var datas = Tools.jsonDecode(_ids);
			var modelMenu = new Menu();
			datas.forEach(function(row, index) {
				var _id = modelMenu.mongoId(row);
				modelMenu.remove({_id:_id});
			});
			res.send(Tools.jsonEncode({success:true,msg:'删除成功'}));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};

exports.rolemenuAction = function(req, res) {
	/*
	$roleInfo = $this->_menuCollection->db->role->findOne(array('_id' => new MongoId("4f509c124336cce41400001f")));
	print_r($this->getMenuTree(false, $roleInfo['menus']));
	*/
};

exports.allrootmenuAction = function(req, res) {
	/*
	$cursor = $this->_menuCollection->find(array("leaf" => false));
	$rs = array();
	$rs['total'] = $cursor->count();
	$cursor = $cursor->skip($_GET['start'])->limit($_GET['limit'])->sort(array('mid' => 1));
	$datas = array();
	while ($cursor->hasNext()) {
		$row = $cursor->getNext();
		$datas[] = $row;
	}
	$rs['result'] = $datas;
	echo json_encode($rs);
	*/
	Fiber(function(){
		try {
			var modelMenu = new Menu();
			//获取客户端get方式传递过来的值，通过使用req.query
			var start = Tools.getInt(req.query.start,0);
			var limit = Tools.getInt(req.query.limit,25);
			var query = {leaf:false};
			var total = modelMenu.count(query);
			var options = {skip:start,limit:limit,sort : {mid: 1}};
			var docs = modelMenu.find(query,options);
			var datas = [];
			if(docs && docs.length>0)
			{
				docs.forEach(function(doc, index) {					
					datas.push(doc);
				});
			}
			var rs = {total:total,result:datas};
			res.send(Tools.jsonEncode(rs));
		} catch (err) {
			console.info(err);
		}finally{
		}
	}).run();
};

