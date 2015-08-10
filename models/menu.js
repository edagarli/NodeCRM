var ModelMongo=require('./model_mongo');
var util=require('util');
var Tools = require('../tools');

function Menu() {
	this.tableName = 'menu';
	ModelMongo.call(this);
};
util.inherits(Menu,ModelMongo);

/*
Menu.getMenuTree = function getMenuTree(checkbox, query, fatherNode, callback) {
	
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}	
		db.collection('menu', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}			
			Fiber(function(){
				var datas =[];
				console.info('before getMenuData');
				datas = getMenuData(db,collection,false, null, '');//[collection.pkFactory('5137eb0a7f50ea5010000004')]			
				console.info('after getMenuData');
				mongodb.close();
				callback(null,datas);
			}).run();			
		});
	});

	Fiber(function(){	
		var client = null;
		try {		
			client = mongodb.connect();
			var collection = mongodb.getCollection(client, "menu");
			var datas =[];
			console.info('before getMenuData');
			datas = getMenuData(mongodb,collection,false, null, '');//[collection.pkFactory('5137eb0a7f50ea5010000004')]			
			console.info('after getMenuData');			
			return callback(null,datas);
		} catch (err) {
			console.info(err);
			return callback(err, null);
		}finally{			
			if(client) {
				console.info('finally');
				client.close();
			}
		}
	}).run();	
};
*/

Menu.prototype.getMenuTree = function(checkbox, query, fatherNode){	
	console.info('begin');	
	var condtion = {};
	//if (fatherNode) {
		condtion.rootname = fatherNode?fatherNode:'';
	//}
	var self = this;
	if (query) {
		var _ids = [];
		query.forEach(function(id, index) {
			_ids.push(self.mongoId(id));
		});
		condtion._id = {$in:_ids};
	}
	//console.info(condtion);
	/*
	var cursor = collection.find(condtion).sort({mid: 1});
	var cursorToArrayAsyn = function(cursor,callback)
	{
		cursor.toArray(function(err, docs) {	
			callback(err,docs);
		});
	}
	var cursorToArray = Future.wrap(cursorToArrayAsyn);
	var docs = cursorToArray(cursor).wait();
	*/
	var options = {sort : {mid: 1}};
	var docs = self.find(condtion,options);
	var datas = [];
	if(docs && docs.length>0)
	{	
		console.info(docs);
		docs.forEach(function(doc, index) {
			if (checkbox)
				doc['checked'] = false;
			var children = null;
			console.info('before sub');						
			children = self.getMenuTree(checkbox, query, doc['_id'].toString());
			console.info('after sub');			
			if (children && children.length>0) {
				console.info(children);
				doc['children'] = children;
			}
			datas.push(doc);
		});
	}
	console.info('end');
	return datas;	
};

Menu.prototype.getRoleCheckMenu = function(fatherNode,rolemenus){
	/*
	$cursor = $this->_menuCollection->find(array('rootname' => $fatherNode));
	$cursor->sort(array('mid'=>1));
	if ($cursor->count() == 0)
		return false;
	$datas = array();
	while ($cursor->hasNext()) {
		$row = $cursor->getNext();
		if (in_array($row['_id'], $rolemenus)) {
			$row['checked'] = true;
		} 
		else {
			$row['checked'] = false;
		}
		$children = $this->getRoleCheckMenu($row['_id']->__toString(), $rolemenus);
		if ($children != false) {
			$row['children'] = $children;
		}
		$datas[] = $row;
	}
	return $datas;
	*/
	var self = this;
	var condtion = {};
	condtion.rootname = fatherNode;
	var options = {sort : {mid: 1}};
	var docs = self.find(condtion,options);
	var datas = [];
	if(docs && docs.length>0)
	{	
		console.info(docs);
		docs.forEach(function(doc, index) {
			if (Tools.inArray(doc['_id'].toString(),rolemenus)){
				doc['checked'] = true;
			}else{
				doc['checked'] = false;
			}
			var children = null;
			console.info('before sub');						
			children = self.getRoleCheckMenu(doc['_id'].toString(),rolemenus);
			console.info('after sub');			
			if (children && children.length>0) {
				console.info(children);
				doc['children'] = children;
			}
			datas.push(doc);
		});
	}
	return datas;	
};

module.exports = Menu;
