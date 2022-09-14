const BaseController = require("./baseController");

class ListingsController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */
  // Create listing. Requires authentication.
  async insertOne(req, res) {
    const {
      title,
      category,
      condition,
      price,
      description,
      shippingDetails,
      sellerEmail,
      firstName,
      lastName,
    } = req.body;

    console.log(sellerEmail);

    try {
      const [user, created] = await this.userModel.findOrCreate({
        where: { email: sellerEmail },
        defaults: {
          firstName: firstName,
          lastName: lastName,
          phoneNum: 9384723896,
        },
      });

      await created;
      console.log("current user:", user.id);

      const newListing = await this.model.create({
        title: title,
        category: category,
        condition: condition,
        price: price,
        description: description,
        shippingDetails: shippingDetails,
        buyerId: null,
        sellerId: user.id,
      });

      // Respond with new listing
      return res.json(newListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific listing. No authentication required.
  async getOne(req, res) {
    const { listingId } = req.params;
    try {
      const output = await this.model.findByPk(listingId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async oneThrough(req, res) {
    console.log("getting one");
    console.log(req.params.listingId);
    try {
      const output = await this.model.findOne({
        where: { id: req.params.listingId },
        include: [
          { model: this.userModel, as: "buyer" },
          { model: this.userModel, as: "seller" },
        ],
      });
      console.log(output);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async allThrough(req, res) {
    console.log("getting all");
    try {
      const output = await this.model.findAll({
        include: [
          { model: this.userModel, as: "buyer" },
          { model: this.userModel, as: "seller" },
        ],
      });
      console.log(output);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Buy specific listing. Requires authentication.
  async buyItem(req, res) {
    console.log("BUYING!");
    // get the user information out of the request.body and then update the correct table accordingly.
    // Do not just hard code 1
    const { listingId } = req.params;
    const { buyerEmail, firstName, lastName } = req.body;
    console.log(req.body);
    try {
      const data = await this.model.findByPk(listingId);

      console.log(data);

      const [user, created] = await this.userModel.findOrCreate({
        where: { email: buyerEmail },
        defaults: {
          firstName: firstName,
          lastName: lastName,
          phoneNum: 9384723896,
        },
      });

      await created;
      console.log("current user:", user.id);

      // TODO: Get buyer email from auth, query Users table for buyer ID
      await data.update({ buyerId: user.id }); // TODO: Replace with buyer ID of authenticated buyer

      // Respond to acknowledge update
      return res.json(data);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ListingsController;
