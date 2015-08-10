var ModelMongo=require('./model_mongo');
var util=require('util');

function Account() {
	this.tableName = 'account';
	ModelMongo.call(this);
};
util.inherits(Account,ModelMongo);

Account.get = function get(accountname, pwd, callback) {
	/*
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('account', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}			
			//find
			collection.findOne({name: accountname, pwd: pwd}, function(err, doc) {
				mongodb.close();
				if (doc) {
					var account = new Account(doc);
					callback(err, account);
				} else {
					callback(err, null);
				}
			});
		});
	});
	*/
	Fiber(function(){	
		var client = null;
		try {		
			client = mongodb.connect();
			var collection = mongodb.getCollection(client, "account");
			//find
			var account = mongodb.findOne(collection,{name: accountname, pwd: pwd});			
			/* 更新 
			var result = mongodb.update(
				collection,
				{ "adminname" : "XadillaX" },
				{ $set : { "adminname" : "XadillaX1" } },
				{ w : 1 }
			);*/ 
			return callback(null, account);
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


/**
 *
 * 获取账户信息树列表
 * 
 * @param string $parentId            
 */
Account.prototype.getAccountTree = function getAccountTree (fatherNode)
{
	var self = this;
	/*
	$cursor = $this->_model->find(array('fatherNode' => $fatherNode));
	if ($cursor->count() == 0)
		return false;
	$datas = array();
	while ($cursor->hasNext()) {
		$row = $cursor->getNext();
		$row['expanded'] = 'true';
		$children = $this->getAccountTree($row['_id']->__toString());
		if ($children != false) {
			$row['children'] = $children;
		} 
		else {
			$row['leaf'] = 'true';
		}
		$datas[] = $row;
	}
	return $datas;*/
	
	var docs = self.find({fatherNode:fatherNode});
	var datas = [];
	if(docs && docs.length>0)
	{	
		console.info(docs);
		docs.forEach(function(doc, index) {
			doc['expanded'] = 'true';			
			var children = null;					
			children = self.getAccountTree(doc['_id'].toString());		
			if (children && children.length>0) {
				console.info(children);
				doc['children'] = children;
			}else {
				doc['leaf'] = 'true';
			}
			datas.push(doc);
		});
	}
	return datas;
}
	
module.exports = Account;
