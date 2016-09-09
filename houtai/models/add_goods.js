/**
 * Created by geek on 16-8-4.
 */
var mongodb = require('./db');

function Add_goods(goods_name,goods_count,unit_price,unit) {
    this.goods_name = goods_name;
    this.goods_count = goods_count;
    this.unit_price = unit_price;
    this.unit = unit;
};

module.exports = Add_goods;
//存储商品信息
Add_goods.prototype.save = function(callback) {
    var add_goods = {
        goods_name: this.goods_name,
        goods_count: this.goods_count,
        unit_price: this.unit_price,
        unit: this.unit
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //将用户数据插入 users 集合
            collection.insert(add_goods, {
                safe: true
            }, function (err, add_goods) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, add_goods[0]);//成功！err 为 null，并返回存储后的商品数组
            });
        });


    });
}
//读取商品信息
Add_goods.get = function(goods_name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            var query = {};
            if (goods_name) {
                query.goods_name = goods_name;
            }
            //根据 query 对象查询文章
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};
//更新商品信息
Add_goods.prototype.update = function(goods_name,goods_count,callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            var query = {
                goods_name:goods_name
            };
            var updateStr = {
                $set:{goods_count:goods_count}
            };
            collection.update(query,updateStr,function(err,result) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
}
//删除商品信息
Add_goods.prototype.remove = function(goods_name,callback) {
    //打开数据库
    mongodb.close();
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            var query = {
                goods_name: goods_name
            };
            collection.remove(query, function (err, result) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    });
}























