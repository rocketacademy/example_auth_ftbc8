"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        first_name: "Jason",
        last_name: "Tan",
        phone_num: "98877889",
        email: "jason.tan@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("listings", [
      {
        title: "iPhone 12",
        category: "Electronics",
        condition: "Well Used",
        price: 699,
        description: "Used for 1 year and upgrading",
        shipping_details: "Meet at Bedok MRT",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Switch with 4 Controllers",
        category: "Electronics",
        condition: "Like New",
        price: 499,
        description: "Bought for my nephew but he prefers PlayStation",
        shipping_details: "Same day shipping",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Muji Carry-On Luggage",
        category: "Luggage",
        condition: "Well used",
        price: 49,
        description: "Prefer a bigger luggage, no space to store this at home!",
        shipping_details: "Pickup at my block",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("listings", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
