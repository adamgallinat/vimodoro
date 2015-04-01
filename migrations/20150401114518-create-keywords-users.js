"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("keywords_users", {
    	keyword_id: {
    		type: DataTypes.INTEGER
    	},
    	user_id: {
    		type: DataTypes.INTEGER
    	}
    }).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable("keywords_users").done(done);
  }
};
