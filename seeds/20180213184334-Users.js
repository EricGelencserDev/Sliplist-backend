'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
	  return queryInterface.bulkInsert('Users',
       [
         {
			firstname: "Fernando",
	 		lastname: "Fonzu",
	 		email: "mandrid@yahoo.com",
			password: "hello",
	 		phone: "619-211-1288",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
			firstname: "Orlando",
 	 		lastname: "Fuji",
 	 		email: "landri@yahoo.com",
 			password: "bonjour",
 	 		phone: "619-244-3434",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
			firstname: "Bob",
			lastname: "Tonhy",
			email: "bob21@yahoo.com",
			password: "heck",
			phone: "619-244-2112",
			createdAt: new Date(),
			updatedAt: new Date()
         }
       ]
     )
  },

  down: (queryInterface, Sequelize) => {
	  return queryInterface.bulkDelete('Users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
