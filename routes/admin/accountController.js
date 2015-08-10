
/*
 * GET account page.
 */
var crypto = require('crypto');
var Account = require('../../models/account.js');
var Role = require('../../models/role.js');
var Fiber = require('fibers');
var Tools = require('../../tools');
/**
 * 获取账户登录链接
 */
exports.loginAction = function(req, res) {
    var name = Tools.getString(req.body.accountName);
	var pwd = Tools.getString(req.body.pwd);
	/*
    Account.get(name, pwd, function(err, account) {
        if (!account) {
			var failure = {success: false, msg: '用户不存在或密码错误'}; 
			res.send(Tools.jsonEncode(failure));
			return;
        }
        req.session.adminInfo = {userInfo: account};
		//console.info(req.session.adminInfo);
		var success = {success: true, msg: '登录成功'};
		res.send(Tools.jsonEncode(success));
    });
	*/	
	Fiber(function(){
		try {
			//find
			var modelAccount = new Account();
			var account = modelAccount.findOne({name: name, pwd: pwd});
			if (!account) {
				var failure = {success: false, msg: '用户不存在或密码错误'}; 
				res.send(Tools.jsonEncode(failure));
				return;
			}
			var modelRole = new Role();
			var roleInfo = modelRole.findOne({_id: modelRole.mongoId(account['roleId'])});
			req.session.adminInfo = {userInfo: account,roleInfo:roleInfo};

			//console.info(req.session.adminInfo);
			var success = {success: true, msg: '登录成功'};
			res.send(Tools.jsonEncode(success));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
	
};

/**
* 保持登录状态
*/
exports.keepAction = function(req, res) {
  res.send('Keep session is OK!');
};

/**
 * 读取全部权限列表信息
 */
exports.readAction = function(req, res) {
	/*echo json_encode($this->getAccountTree());*/
	Fiber(function(){
		try {
			var modelAccount = new Account();
			var datas = modelAccount.getAccountTree('');
			res.send(Tools.jsonEncode(datas));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};

    
/**
 * 添加用户信息
 */
exports.insertAction = function(req, res) {
	/*
	if (isset($_POST)) {
		$config = Zend_Registry::get('config');
		
		$datas = array();
		$datas['name']        = isset($_POST['name'])        ? trim($_POST['name'])        : ''; // 真实姓名或者英文名或者昵称
		$datas['phone']       = isset($_POST['phone'])       ? trim($_POST['phone'])       : '';
		$datas['mobile']      = isset($_POST['mobile'])      ? trim($_POST['mobile'])      : '';
		$datas['email']       = isset($_POST['email'])       ? trim($_POST['email'])       : '';
		$datas['description'] = isset($_POST['description']) ? trim($_POST['description']) : ''; // 描述或者备注信息
		$datas['roleId']      = isset($_POST['roleId'])      ? trim($_POST['roleId'])      : '';
		$datas['isActived']   = isset($_POST['isActived'])   ? intval($_POST['isActived']) : 0;
		$datas['fatherNode']  = (isset($_POST['fatherNode']) && empty($_POST['fatherNode'])) ? '' : trim($_POST['fatherNode']);
		$datas['createTime']  = new MongoDate();
		$datas['expireTime']  = isset($_POST['expireTime'])  ? new MongoDate(strtotime($_POST['expireTime'])) : new MongoDate();
		$privilegeid = array();
		if(count($_POST['privileges'])>0){
			foreach ($_POST['privileges'] as $k => $v) {
				$privilegeid[] = new MongoId($v);
			}
		}
		$datas['privileges'] = $privilegeid;
		$datas['pwd']        = isset($_POST['pwd'])        ? trim($_POST['pwd'])        : '' ;
		$datas['userId'] = "";
		if (!empty($_POST['sns'])) {
			$client     = new SoapClient($config['weibo']['WB_SERVICE']);
			$screenName = isset($_POST['screenName']) ? trim($_POST['screenName']) : '';
			$userInfo   = $client->get($_SESSION['umaId'], 'users/show', array('screen_name' => $screenName));
			if (isset($userInfo[id])) {
				// 检测用户是否存在
//                     debugVar($userInfo);
//                     debugVar($userInfo['UMA_userId']);
				$check = $this->_model->findOne(array('userId' => $userInfo['UMA_userId']));
				if ($check == null) {
					$datas['userId']      = $userInfo['UMA_userId'];                        
					$this->_model->insert($datas);
					$return = array(SUCCESS => true, MSG => '添加帐户成功');
				} 
				else {
					$return = array(SUCCESS => false, MSG => '您添加的帐户已存在');
				}
			} 
			else {
				$return = array(SUCCESS => false, MSG => '添加帐户失败，原因：该新浪微博帐户不存在或者请求次数过于频繁');
			}
		} 
		else {
			//$return = array(SUCCESS => false, MSG => '添加帐户失败，原因：认证社区类型不存在');
			$this->_model->insert($datas);
			$return = array(SUCCESS => true, MSG => '添加帐户成功');
		}
		echo json_encode($return);
	}
	*/
	Fiber(function(){
		try {			
			var modelAccount = new Account();
			var name = Tools.getString(req.body.name);
			var phone = Tools.getString(req.body.phone);
			var mobile = Tools.getString(req.body.mobile);
			var email = Tools.getString(req.body.email);
			var description = Tools.getString(req.body.description);
			var roleId = Tools.getString(req.body.roleId);
			var isActived = Tools.parseNum(req.body.isActived,0);
			var fatherNode = Tools.getString(req.body.fatherNode);
			var createTime = new Date();
			var expireTime = Tools.getDate(req.body.expireTime);			
			var privilegeid = [];			
			var privileges = Tools.getArray(req.body.privileges);
			if(privileges && privileges.length>0){
				privileges.forEach(function(row, index) {
					var _id = modelAccount.mongoId(row);
					privilegeid.push(_id);
				});
			}
			var pwd = Tools.getString(req.body.pwd);			
			var sns = Tools.getString(req.body.sns);
			var userId = "";
			var screenName = Tools.getString(req.body.screenName);
			if(sns){
			//;
			}
			var doc = {
				name:name,
				phone:phone,
				mobile:mobile,
				email:email,
				description:description,
				roleId:roleId,
				isActived:isActived,
				fatherNode:fatherNode,
				createTime:createTime,
				expireTime:expireTime,
				privileges:privilegeid,
				pwd:pwd,
				userId:userId,
				screenName:screenName
			};
			modelAccount.insert(doc);
			res.send(Tools.jsonEncode({success:true,msg:'添加帐户成功'}));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};
    
/**
 * 更新用户信息
 */
exports.updateAction = function(req, res) {
	/*
	if (isset($_POST)) {
		$_id = isset($_POST['_id']) ? trim($_POST['_id']) : '';
		$datas = array();
		$datas['name']        = isset($_POST['name'])        ? trim($_POST['name'])        : '' ; // 真实姓名或者英文名或者昵称
		$datas['phone']       = isset($_POST['phone'])       ? trim($_POST['phone'])       : '' ;
		$datas['mobile']      = isset($_POST['mobile'])      ? trim($_POST['mobile'])      : '' ;
		$datas['email']       = isset($_POST['email'])       ? trim($_POST['email'])       : '' ;
		$datas['description'] = isset($_POST['description']) ? trim($_POST['description']) : '' ; // 描述或者备注信息
		$datas['roleId']      = isset($_POST['roleId'])      ? trim($_POST['roleId'])      : '' ;
		$datas['isActived']   = isset($_POST['isActived'])   ? intval($_POST['isActived']) : 0 ;
		$datas['fatherNode']  = isset($_POST['fatherNode'])  ? trim($_POST['fatherNode'])  : '' ;
		$datas['expireTime']  = isset($_POST['expireTime'])  ? new MongoDate(strtotime($_POST['expireTime'])) : '';
		$privilegeid = array();
		if(count($_POST['privileges'])>0){
			foreach ($_POST['privileges'] as $k => $v) {
				$privilegeid[] = new MongoId($v);
			}
		}
		$datas['privileges'] = $privilegeid;
		$datas['pwd']        = isset($_POST['pwd'])        ? trim($_POST['pwd'])        : '' ;
		$this->_model->update(array('_id' => new MongoId($_id)), array('$set' => $datas));
		echo '{success:true,msg:"编辑帐户成功"}';
	}
	*/
	Fiber(function(){
		try {						
			var modelAccount = new Account();
			var _id = Tools.getString(req.body._id);
			var name = Tools.getString(req.body.name);
			var phone = Tools.getString(req.body.phone);
			var mobile = Tools.getString(req.body.mobile);
			var email = Tools.getString(req.body.email);
			var description = Tools.getString(req.body.description);
			var roleId = Tools.getString(req.body.roleId);
			var isActived = Tools.parseNum(req.body.isActived,0);
			var fatherNode = Tools.getString(req.body.fatherNode);
			var expireTime = Tools.getDate(req.body.expireTime);			
			var privilegeid = [];			
			var privileges = Tools.getArray(req.body.privileges);
			if(privileges && privileges.length>0){
				privileges.forEach(function(row, index) {
					var _id = modelAccount.mongoId(row);
					privilegeid.push(_id);
				});
			}
			var pwd = Tools.getString(req.body.pwd);			
			
			var doc = {
				name:name,
				phone:phone,
				mobile:mobile,
				email:email,
				description:description,
				roleId:roleId,
				isActived:isActived,
				fatherNode:fatherNode,
				expireTime:expireTime,
				privileges:privilegeid,
				pwd:pwd
			};
			modelAccount.update({_id:modelAccount.mongoId(_id)},{$set:doc});
			res.send(Tools.jsonEncode({success:true,msg:'编辑帐户成功'}));
			
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};

/**
 * 更新元素所在的父节点
 */
exports.dropAction = function(req, res) {
	/*
	$_id = isset($_POST['_id']) ? trim($_POST['_id']) : '';
    	$data = array();
        $data['fatherNode'] = isset($_POST['taggetid']) ? $_POST['taggetid'] : '';
        $this->_model->update(array('_id' => new MongoId($_id)), array('$set' => $data));
        echo '{success:true,msg:"更新已成功"}';
	*/
	 Fiber(function(){
		try {
			var _id = Tools.getString(req.body._id);
			var fatherNode = Tools.getString(req.body.taggetid);
			var datas = {fatherNode:fatherNode};
			var modelAccount = new Account();
			modelAccount.update({_id:modelAccount.mongoId(_id)},{$set:datas});
			res.send(Tools.jsonEncode({success:true,msg:'更新已成功'}));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};

	
/**
 * 删除无效的帐户
 */
exports.removeAction = function(req, res) {
	/*
	$_ids = isset($_POST['_id']) ? trim($_POST['_id']) : '';
	$datas = json_decode($_ids, true);
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
			var modelAccount = new Account();
			datas.forEach(function(row, index) {
				var _id = modelAccount.mongoId(row);
				modelAccount.remove({_id:_id});
			});
			res.send(Tools.jsonEncode({success:true,msg:'删除成功'}));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();
};
 
exports.allAction = function(req, res) {
	/*
	$query = array();
	if (isset($_GET['search'])) {
		$search = new MongoRegex('/' . trim($_GET['search']) . '/i');
		$query = array(
			'$or' => array(
				array('name'   => $search), 
				array('phone'  => $search), 
				array('mobile' => $search), 
				array('email'  => $search)
			)
		);
	}
	$cursor = $this->_model->find($query);
	$rs = array();
	$rs['total'] = $cursor->count();

	$start = isset($_GET['start']) ? intval($_GET['start']) : 0;
	$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
	$cursor->sort(array('createTime' => - 1))->skip($start)->limit($limit);
	$rs['result'] = iterator_to_array($cursor, false);
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
				query = {$or:{name:searchRegx,phone:searchRegx,mobile:searchRegx,email:searchRegx}};
			}
			
			//find
			var modelAccount = new Account();
			var total = modelAccount.count(query);
			var docs = modelAccount.find(query,{skip:start,limit:limit,sort:{createTime:-1}});
			var datas = [];
			if(docs && docs.length>0)
			{	
				console.info(docs);
				docs.forEach(function(doc, index) {
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

