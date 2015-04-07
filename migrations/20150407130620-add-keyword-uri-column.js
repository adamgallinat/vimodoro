"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('keywords', 'uri', DataTypes.STRING).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('keywords', 'uri').done(done);
  }
};
