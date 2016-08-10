var Add_goods = require('../models/add_goods.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
  Add_goods.get(null, function (err, users) {
    if (err) {
      users = [];
    }
    res.render('admin', {
      title: 'Home',
      add_goods: req.session.add_goods,
      users: users,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});
router.post('/admin', function(req, res, next) {
  var add = new Add_goods(
      req.body.goods_name, req.body.goods_count);
  if(req.body.goods_count!=null) {
    add.update(req.body.goods_name, req.body.goods_count, function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/admin');
      }
      req.flash('error', err);
      res.redirect('/admin');
    });
  }else {
    add.remove(req.body.goods_name,function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/admin');
      }
      req.flash('error', err);
      res.redirect('/admin');
    });
  }
});

router.get('/add_goods', function(req, res, next) {
  res.render('add_goods', { title: 'Add_goods',
    add_goods: req.session.add_goods,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.post('/add_goods', function(req, res, next) {
  if(req.body.goods_name == "") {
    return false;
  }else if(req.body.unit_price == "") {
    return false;
  }else if(req.body.unit == "") {
    return false;
  }
  var add = new Add_goods(req.body.goods_name, req.body.goods_count, req.body.unit_price, req.body.unit);
  add.save(function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/admin');
    }
    req.flash('success', '');
    res.redirect('/admin');//存储成功跳转到主页
  });
});

router.get('/add_type', function(req, res, next) {
  res.render('add_type', { title: 'Add_type' });
});
router.post('/add_type', function(req, res, next) {});

router.get('/goods_details', function(req, res, next) {
  res.render('goods_details', { title: 'Goods_details' });
});
router.post('/goods_details', function(req, res, next) {});

router.get('/delete_type', function(req, res, next) {
  res.render('delete_type', { title: 'Delete_type' });
});
router.post('/delete_type', function(req, res, next) {});


module.exports = router;
