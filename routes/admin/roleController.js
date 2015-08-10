
/*
 * GET role page.
 */
var crypto = require('crypto');
var Role = require('../../models/role.js');
var Fiber = require('fibers');
var Tools = require('../../tools');
/**
 * 读取全部角色列表信息
 */
exports.readAction = function(req, res) {
	/*
		$query = array();
        if ($_GET['search']) {
            $search = new MongoRegex('/' . $_GET['search'] . '/i');
            $query = array(
            '$or' => array(array('roleName' => $search), 
            array('roleAlias' => $search)));
        }
        $cursor = $this->_model->find($query);
        $rs = array();
        $rs['total'] = $cursor->count();
        $cursor->skip($_GET['start'])->limit($_GET['limit'])->sort(array('createTime' => - 1));
        $datas = array();
        while ($cursor->hasNext()) {
            $row = $cursor->getNext();
            $row['permission'] = json_encode($row['permission']);
            $datas[] = $row;
        }
        $rs['result'] = $datas;
        echo json_encode($rs);
	*/	
	Fiber(function(){
		try {
			//获取客户端get方式传递过来的值，通过使用req.query
			var search = Tools.getString(req.query.search);			
			var start = Tools.getInt(req.query.start,0);
			var limit = Tools.getInt(req.query.limit,10);
			
			var query = {};
			if (search) {
				searchRegx = '/' + search + '/i';
				query = {$or:{roleName:searchRegx,roleAlias:searchRegx}};
			}
			
			//find
			var modelRole = new Role();
			var total = modelRole.count(query);
			var docs = modelRole.find(query,{skip:start,limit:limit,sort:{createTime:-1}});
			var datas = [];			
			if(docs && docs.length>0)
			{	
				console.info(docs);
				docs.forEach(function(doc, index) {
					doc['permission'] = Tools.jsonEncode(doc['permission']);
					datas.push(doc);
				});
			}	
			rs = {total:total,result:datas};
			res.send(Tools.jsonEncode(rs));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();	
};


/**
 * 返回该module下全部权限的json数组
 */
exports.getAclAction = function(req, res) {
	/*
	echo json_encode($this->getAcl());
	*/
	Fiber(function(){
		try {
			var modelRole = new Role();
			var datas = modelRole.getAcl();
			res.send(Tools.jsonEncode(datas));
		} catch (err) {
			console.info(err);
		}finally{
		}
	}).run();
};

/**
 * 读取某一个角色的权限
 */
exports.readOneAction = function(req, res) {
	/*
	$roleInfo = $this->_model->findOne(
	array('_id' => new MongoId($_GET['_id'])));
	if ($roleInfo == null) {
		return false;
	}
	*/
	Fiber(function(){
		try {
			var modelRole = new Role();
			//获取客户端get方式传递过来的值，通过使用req.query
			var _id = Tools.getString(req.query._id);
			var roleInfo = modelRole.findOne({_id:modelRole.mongoId(_id)});			
			if(roleInfo==null){
				return false;
			}
		} catch (err) {
			console.info(err);
		}finally{
		}
	}).run();
};
/**
 * 插入新数据
 */
exports.insertAction = function(req, res) {
	/*
	if ($_POST) {
		$datas = array();
		$datas['roleName'] = $_POST['roleName'];
		$datas['roleAlias'] = $_POST['roleAlias'];
		foreach ($_POST['menus'] as $k => $v) {
			$menuid[] = new MongoId($v);
		}
		$datas['menus'] = $menuid;
		$acl = array();
		foreach ($this->getAcl() as $key => $value) {
			if (isset($_POST[$key]) && count($_POST[$key]) > 0) {
				$acl[$key] = $_POST[$key];
			}
		}
		$datas['permission'] = $acl;
		$datas['isActived'] = $_POST['isActived'];
		$datas['createTime'] = new MongoDate();
		$this->_model->insert($datas);
		echo '{success:true,msg:"添加角色成功"}';
	}
	*/
	Fiber(function(){
		try {			
			var modelRole = new Role();
			var roleName = Tools.getString(req.body.roleName);
			var menus = Tools.getArray(req.body.menus);
			var menuid = [];
			menus.forEach(function(row, index) {
				var menu_id = modelRole.mongoId(row);
				menuid.push(menu_id);
			});
			var acl = {};
			var aclList = modelRole.getAcl();
			for(var key in aclList){
				var value = aclList[key];
				console.info('key:'+key+' value:'+value);
				var permissions = Tools.getArray(req.body[key]);
				if(permissions && permissions.length>0){
					acl[key] = permissions;
				}
			}
			var roleAlias = Tools.getString(req.body.roleAlias);
			var isActived = Tools.getString(req.body.isActived);
			
			var doc = {
				roleName:roleName,
				menus:menuid,
				permission:acl,
				roleAlias:roleAlias,
				isActived:isActived,
				createTime:new Date()
			};
			modelRole.insert(doc);
			res.send(Tools.jsonEncode({success:true,msg:'添加角色成功'}));			
			
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};
/**
 * 更新全部数据
 */
exports.updateAction = function(req, res) {
	/*
	if ($_POST['_id']) {
		$_id = new MongoId($_POST['_id']);
		$datas = array();
		$datas['roleName'] = $_POST['roleName'];
		foreach ($_POST['menus'] as $k => $v) {
			$menuid[] = new MongoId($v);
		}
		$datas['menus'] = $menuid;
		$datas['roleAlias'] = $_POST['roleAlias'];
		$acl = array();
		foreach ($this->getAcl() as $key => $value) {
			if (isset($_POST[$key]) && count($_POST[$key]) > 0) {
				$acl[$key] = $_POST[$key];
			}
		}
		$datas['permission'] = $acl;
		$datas['isActived'] = $_POST['isActived'];
		$this->_model->update(array('_id' => $_id), array('$set' => $datas));
		echo '{success:true,msg:"编辑角色成功"}';
	} 
	else {
		$datas = json_decode($_POST['jsonInfos'], true);
		foreach ($datas as $row) {
			$_id = new MongoId($row['_id']);
			unset($row['_id'], $row['createTime'], $row['permission']);
			$this->_model->update(array('_id' => $_id), array('$set' => $row));
		}
		echo 1;
		exit();
	}
	*/
	Fiber(function(){
		try {						
			var modelRole = new Role();
			var _id = Tools.getString(req.body._id);
			if(_id){
				var roleName = Tools.getString(req.body.roleName);
				var menus = Tools.getArray(req.body.menus);
				var menuid = [];
				menus.forEach(function(row, index) {
					var menu_id = modelRole.mongoId(row);
					menuid.push(menu_id);
				});
				var acl = {};
				var aclList = modelRole.getAcl();
				for(var key in aclList){
					var value = aclList[key];
					console.info('key:'+key+' value:'+value);
					var permissions = Tools.getArray(req.body[key]);
					if(permissions && permissions.length>0){
						acl[key] = permissions;
					}
				}
				var roleAlias = Tools.getString(req.body.roleAlias);
				var isActived = Tools.getString(req.body.isActived);
				
				var doc = {
					roleName:roleName,
					menus:menuid,
					permission:acl,
					roleAlias:roleAlias,
					isActived:isActived
				};
				modelRole.update({_id:modelRole.mongoId(_id)},{$set:doc});
				res.send(Tools.jsonEncode({success:true,msg:'修改成功'}));
			
			}else{
				var jsonInfos = Tools.getString(req.body.jsonInfos);
				var datas = Tools.jsonDecode(jsonInfos);
				datas.forEach(function(row, index) {
					var role_id = modelRole.mongoId(row['_id']);
					delete row['_id'];
					delete row['createTime'];
					delete row['permission'];
					/*
					var doc = {
						roleName:roleName,
						menus:menuid,
						roleAlias:roleAlias,
						isActived:isActived
					};*/
					modelRole.update({_id:role_id},{$set:row});
				});
				res.send('1');
			}			
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};
/**
 * 删除全部数据
 */
exports.removeAction = function(req, res) {
	/*
	$datas = json_decode($_POST['_id'], true);
	foreach ($datas as $row) {
		$_id = new MongoId($row);
		$this->_model->remove(array('_id' => $_id));
	}
	echo json_encode(array('success' => true, 'msg' => '删除成功'));
	exit();
	*/
	Fiber(function(){
		try {
			var _ids = Tools.getString(req.body._id);
			var datas = Tools.jsonDecode(_ids);
			var modelRole = new Role();
			datas.forEach(function(row, index) {
				var _id = modelRole.mongoId(row);
				modelRole.remove({_id:_id});
			});
			res.send(Tools.jsonEncode({success:true,msg:'删除成功'}));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};


