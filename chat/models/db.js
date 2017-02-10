
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema = new Schema({
  username: String,
  password: String
});
var Admin = mongoose.model('Admin', adminSchema);

exports.connect = function(callback){
  mongoose.connect('mongodb://localhost:27017/admin', function(err){
    if(err){
      console.log('connect failed');
    }else{
      callback();
    }
  });
}
exports.disconnect = function(){
  mongoose.disconnect();
}
exports.search = function(admin, callback){
  Admin.find({username: admin.username }, function(err, docs){
    if(err){
      console.log('find error');
    }else{
      if(docs.length > 0){
        if(admin.password === docs[0].password){
          exports.errMsg = '';
        }else{
          exports.errMsg = '登陆密码有误，请重新输入';
        }
        callback();
      }else {
        exports.errMsg = '该用户不存在，请先注册';
        callback();
      }
    }
  });
}
exports.findAll = function(callback){
  Admin.find({}, {'username':1, '_id':0}, function(err, docs){
    if(err){
      console.log('find error');
    }else{
      exports.users = docs;
      callback();
    }
  });
}
exports.add = function(admin, callback){
  Admin.find({username: admin.username }, function(err, docs){
    if(err){
      console.log('find error');
    }else{
      if(docs.length > 0){
        exports.errMsg = '该用户已存在，请直接登陆';
        callback();
      }else {
        Admin.create(admin, function(err){
          if(err){
            console.log('add error');
          }else{
            exports.errMsg = '';
            callback();
          }
        });
      }
    }
  });
}
