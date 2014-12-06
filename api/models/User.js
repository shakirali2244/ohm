var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes : {
  	account   : { type: 'integer', autoIncrement: true},
  	group     : { type: 'string', defaultsTo: 'user' },
    username  : { type: 'string', unique: true, required: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
