var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('restaurant', 'rating', {
      type: 'decimal', defaultValue: 0
  }, callback());
};

exports.down = function(db, callback) {
  db.removeColumn('restaurant', 'rating', callback());
};
