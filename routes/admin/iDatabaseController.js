
/*
 * GET iDatabase page.
 */
var crypto = require('crypto');
//var IDatabase = require('../../models/iDatabase.js');
var Fiber = require('fibers');
var Tools = require('../../tools');
/**
 * 读取全部角色列表信息
 */
exports.allItemAction = function(req, res) {
		//获取客户端get方式传递过来的值，通过使用req.query
		res.send(Tools.jsonEncode([]));
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
	
	Fiber(function(){
		try {
			var search = req.body.search;			
			var start = req.body.start;
			var limit = req.body.limit;
			
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
					doc['permission'] = JSON.stringify(doc['permission']);
					datas.push(doc);
				});
			}	
			rs = {total:total,result:datas};
			res.send(JSON.stringify(rs));	
		} catch (err) {
			console.info(err);
		}finally{
		}		
	}).run();	*/
};


