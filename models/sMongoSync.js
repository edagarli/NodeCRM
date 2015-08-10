//========================================================
//         ______________________________________
// ________|                                      |_______
// \       | SevenzJS :                           |      /
//  \      |   A light weighted Node.JS framework |     /
//  /      |______________________________________|     \
// /__________)                                (_________\
//
// @author  : xadillax
//
// @file    : sMongoSync.prototype.js
// @create  : 13-3-28 下午2:29
//
// @brief   :
//   同步Mongodb方案
//========================================================
var settings = require('../settings');
var Future = require('fibers/future');
var wait = Future.wait;
var mongodb = require("mongodb");

function sMongoSync() 
{
	this.prefix = "";
};

/**
 * @brief 创建一个服务器连接
 * @param addr
 * @param port
 * @returns {mongodb.Server}
 */
sMongoSync.prototype.getServer = function(addr, port, options) {
    return new mongodb.Server(addr, port, options);
}

/**
 * @brief 获取一个collection
 * @param client
 * @param table
 * @returns {mongodb.Collection}
 */
sMongoSync.prototype.getCollection = function(client,table) {
    return new mongodb.Collection(client, this.prefix + table);
}

/**
 * @brief 连接数据库（实现）
 * @param server
 * @param dbname
 * @param callback
 * @private
 */
sMongoSync.prototype._connect = function(server, dbname, callback) {
    var client = new mongodb.Db(dbname, server);
    client.open(callback);
}

/**
 * @brief 连接数据库（接口）
 * @param server
 * @param dbname
 * @returns {*}
 */
sMongoSync.prototype.connect = function(server, dbname) {
    if(server === null || server === undefined)
    {
		/**
		 * 创建服务器对象
		*/ 
        server = this.getServer(settings.host, settings.port, {
			auto_reconnect : settings.auto_reconnect,
			w : settings.w
		});
    }

    if(dbname === "" || dbname === undefined)
    {
		/**
		 * 设置默认数据库
		 */
        dbname = settings.db;
    }

	/**
	* 设置表前缀
	 */
	this.prefix = "";
	
    var connWrapper = Future.wrap(this._connect);

    return connWrapper(server, dbname).wait();
}

/**
 * @brief 查找函数（实现）
 * @param client
 * @param prefix
 * @param table
 * @param selector
 * @param fields
 * @param skip
 * @param limit
 * @param timeout
 * @param callback
 * @private
 */
sMongoSync.prototype._find = function(collection, selector, options, callback) {
    if(selector === undefined)
    {
        collection.find().toArray(callback);
    }
    else if(options === undefined)
    {
        collection.find(selector).toArray(callback);
    }
    else
    {
        collection.find(selector, options).toArray(callback);
    }
}

/**
 * @brief 查找函数（接口）
 * @param client
 * @param table
 * @param selector
 * @param fields
 * @param skip
 * @param limit
 * @param timeout
 * @returns {*}
 */
sMongoSync.prototype.find = function(collection, selector, options) {
    var findWrapper = Future.wrap(this._find);
    return findWrapper(collection, selector, options).wait();
}

/**
 * @brief 查找函数单个（实现）
 * @param client
 * @param prefix
 * @param table
 * @param selector
 * @param fields
 * @param skip
 * @param limit
 * @param timeout
 * @param callback
 * @private
 */
sMongoSync.prototype._findOne = function(collection, selector, options, callback) {
    if(selector === undefined)
    {
        collection.findOne(callback);
    }
    else if(options === undefined)
    {
        collection.findOne(selector,callback);
    }
    else
    {
        collection.findOne(selector, options,callback);
    }
}

/**
 * @brief 查找函数单个（接口）
 * @param client
 * @param table
 * @param selector
 * @param fields
 * @param skip
 * @param limit
 * @param timeout
 * @returns {*}
 */
sMongoSync.prototype.findOne = function(collection, selector, options) {
    var findWrapper = Future.wrap(this._findOne);
    return findWrapper(collection, selector, options).wait();
}

/**
 * @brief 插入数据（实现）
 * @param collection
 * @param doc
 * @param options
 * @param callback
 * @private
 */
sMongoSync.prototype._insert = function(collection, doc, options, callback) {
    collection.insert(doc, options, callback);
}

/**
 * @brief 插入数据（接口）
 * @param collection
 * @param doc
 * @param options
 * @returns {*}
 */
sMongoSync.prototype.insert = function(collection, doc, options) {
    var insertWrapper = Future.wrap(this._insert);

    if(options === undefined) options = { };
    return insertWrapper(collection, doc, options).wait();
}

/**
 * @brief 删除数据（实现）
 * @param collection
 * @param selector
 * @param options
 * @param callback
 * @private
 */
sMongoSync.prototype._remove = function(collection, selector, options, callback) {
    collection.remove(selector, options, callback);
}

/**
 * @brief 删除数据（接口）
 * @param collection
 * @param selector
 * @param options
 * @returns {*}
 */
sMongoSync.prototype.remove = function(collection, selector, options) {
    var removeWrapper = Future.wrap(this._remove);

    if(undefined === selector) selector = { };
    if(options === undefined) options = { };
    return removeWrapper(collection, selector, options).wait();
}

/**
 * @brief 重命名Collection（实现）
 * @param collection
 * @param newName
 * @param options
 * @param callback
 * @private
 */
sMongoSync.prototype._renameCollection = function(collection, newName, options, callback) {
    collection.rename(newName, options, callback);
}

/**
 * @brief 重命名Collection（接口）
 * @param collection
 * @param newName
 * @param options
 * @returns {*}
 */
sMongoSync.prototype.renameCollection = function(collection, newName, options) {
    var renameWrapper = Future.wrap(this._renameCollection);

    if(undefined === options) options = {  };
    return renameWrapper(collection, this.prefix + newName, options).wait();
}

/**
 * @brief 编辑数据（实现）
 * @param collection
 * @param doc
 * @param options
 * @param callback
 * @private
 */
sMongoSync.prototype._save = function(collection, doc, options, callback) {
    collection.save(doc, options, callback);
}

/**
 * @brief 编辑数据（接口）
 * @param collection
 * @param doc
 * @param options
 * @returns {*}
 */
sMongoSync.prototype.save = function(collection, doc, options) {
    var saveWrapper = Future.wrap(this._save);

    if(options === undefined) options = { };
    return saveWrapper(collection, doc, options).wait();
}

/**
 * @brief 更新数据（实现）
 * @param collection
 * @param selector
 * @param doc
 * @param options
 * @param callback
 * @private
 */
sMongoSync.prototype._update = function(collection, selector, doc, options, callback) {
    collection.update(selector, doc, options, callback);
}

/**
 * @brief 更新数据（接口）
 * @param collection
 * @param selector
 * @param doc
 * @param options
 * @returns {*}
 */
sMongoSync.prototype.update = function(collection, selector, doc, options) {
    var updateWrapper = Future.wrap(this._update);

    if(options === undefined) options = { };
    return updateWrapper(collection, selector, doc, options).wait();
}

sMongoSync.prototype._distinct = function(collection, key, query, options, callback) {
    collection.distinct(key, query, options, callback);
}

sMongoSync.prototype.distinct = function(collection, key, query, options) {
    var distinctWrapper = Future.wrap(this._distinct);

    if(query === undefined) query = { };
    if(options === undefined) options = { };

    return distinctWrapper(collection, key, query, options).wait();
}

sMongoSync.prototype._count = function(collection, query, options, callback) {
    collection.count(query, options, callback);
}

sMongoSync.prototype.count = function(collection, query, options) {
    var countWrapper = Future.wrap(this._count);

    if(query === undefined) query = { };
    if(options === undefined) options = { };

    return countWrapper(collection, query, options).wait();
}

sMongoSync.prototype._drop = function(collection, callback) {
    collection.drop(callback);
}

sMongoSync.prototype.drop = function(collection) {
    var dropWrapper = Future.wrap(this._drop);

    return dropWrapper(collection).wait();
}

sMongoSync.prototype._findAndModify = function(collection, query, sort, doc, options, callback) {
    collection.findAndModify(query, sort, doc, options, callback);
}

sMongoSync.prototype.findAndModify = function(collection, query, sort, doc, options) {
    var findWrapper = Future.wrap(this._findAndModify);

    if(options === undefined) options = { };
    return findWrapper(collection, query, sort, doc, options).wait();
}

sMongoSync.prototype._findAndRemove = function(collection, query, sort, options, callback) {
    collection.findAndRemove(query, sort, options, callback);
}

sMongoSync.prototype.findAndRemove = function(collection, query, sort, options) {
    var findWrapper = Future.warp(this._findAndRemove);

    if(options === undefined) options = { };
    return findWrapper(collection, query, sort, options).wait();
}

sMongoSync.prototype._createIndex = function(collection, fieldOrSpec, options, callback) {
    collection.createIndex(fieldOrSpec, options, callback);
}

sMongoSync.prototype.createIndex = function(collection, fieldOrSpec, options) {
    var cIdxWrapper = Future.wrap(this._createIndex);

    if(options === undefined) options = { };
    return cIdxWrapper(collection, fieldOrSpec, options).wait();
}

sMongoSync.prototype._ensureIndex = function(collection, fieldOrSpec, options, callback) {
    collection.ensureIndex(fieldOrSpec, options, callback);
}

sMongoSync.prototype.ensureIndex = function(collection, fieldOrSpec, options) {
    var eIdxWrapper = Future.wrap(this._ensureIndex);

    if(options === undefined) options = { };
    return eIdxWrapper(collection, fieldOrSpec, options).wait();
}

sMongoSync.prototype._indexInformation = function(collection, options, callback) {
    collection.indexInformation(options, callback);
}

sMongoSync.prototype.indexInformation = function(collection, options) {
    var iInfoWrapper = Future.wrap(this._indexInformation);

    if(options === undefined) options = { };
    return iInfoWrapper(collection, options).wait();
}

sMongoSync.prototype._dropIndex = function(collection, name, callback) {
    collection.dropIndex(name, callback);
}

sMongoSync.prototype.dropIndex = function(collection, name) {
    var dropIdxWrapper = Future.wrap(this._dropIndex);
    return dropIdxWrapper(collection, name).wait();
}

sMongoSync.prototype._dropAllIndexes = function(collection, callback) {
    collection.dropAllIndexes(callback);
}

sMongoSync.prototype.dropAllIndexes = function(collection) {
    var dAIdxWrapper = Future.wrap(this._dropAllIndexes);
    return dAIdxWrapper(collection).wait();
}

sMongoSync.prototype._reIndex = function(collection, callback) {
    collection.reIndex(callback);
}

sMongoSync.prototype.reIndex = function(collection) {
    var reidxWrapper = Future.wrap(this._reIndex);
    return reidxWrapper(collection).wait();
}

/**
 *
 * @TODO: mapReduce, group, options, isCapped, indexExists, geoNear,
 *        geoHaystackSearch, indexes, aggregate, stats
 */
module.exports = new sMongoSync();