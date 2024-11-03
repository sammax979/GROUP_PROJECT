const { User } = require("../models/index");
const { Order } = require("../models/index");
const { OrderItem } = require("../models/index");
const { Stock } = require("../models/index");
const { Model } = require("../models/index");
const { Brand } = require("../models/index");

const HttpError = require("../services/HttpError");

// select one Order by Id
const getting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    if (!order) {
      return next(new HttpError("Couldn't find order", 404));
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// select all Orders
const gettingAll = async (req, res, next) => {
  try {
    const order = await Order.findAll();
    if (!order || order.length === 0) {
      return next(new HttpError("No order found", 404));
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// insert a new Order record
const creating = async (req, res, next) => {
  try {
    const { date, userId } = req.body;
    if (!date || !userId) {
      return next(new HttpError("Not enough data for creating Order", 500));
    }
    // cheack if there is an existing User with userId
    const user = await User.findByPk(userId);
    if (!user) {
      return next(new HttpError("Couldn't find user with given Id", 404));
    }
    // OK - create a new Order entry
    const order = await Order.create({ date: date, UserId: userId });
    if (!order) {
      return next(new HttpError("Error creating Order", 500));
    }
    res.status(201).json(order); 
  } catch (err) {
    next(err);
  }
};

// apdate an Order
const updating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { date, userId } = req.body;
    const [updated] = await Order.update(
      { date, userId },
      {
        where: { id },
      }
    );
    if (updated === 0) {
      return next(new HttpError("Order not found or no updates made", 404));
    }
    res.status(200).json("Oredr updated successfully");
  } catch (err) {
    next(err);
  }
};

// delete an Order with all its OrderItems if there are any
const deleting = async (req, res, next) => {
  try {
    const id = req.params.id;

    // check OrderId in table OrderItem
    // const orderItem = await OrderItem.findOne({ where: { orderId: id } });
    //     if ( orderItem ) {
    // return res.status(500).json({ message: "Cannot delete Order because it is associated with OrderItem. First you need to delete OrderId in OrderItem" });
    // }    

    // delete child OrderItems
    const deletedItems = await OrderItem.destroy({ where: { orderId: id } });  
    
    // delete Order record
    const deleted = await Order.destroy({ where: { id } });
    if (deleted === 0) {
      return next(
        new HttpError("Order not found or could not be deleted", 404)
      );
    }
    res.status(200).json(`Successfully deleted order #${id} and its ${deletedItems} Order Items.`);
  } catch (err) {
    next(err);
  }
};

// select all OrderItems
const allItems = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
      attributes: ["id", "date"],
      include: [
        {
          model: OrderItem,
          attributes: ["price", "count"],
          include: [
            {
              model: Stock,
              attributes: ["size"],
              include: [
                {
                  model: Model,
                  attributes: ["name"],
                  include: [
                    {
                      model: Brand,
                      attributes: ["name"]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]//,
      //raw: true,  // only field
    });

    if (!order) {
      return next(new HttpError("Couldn't find order", 404));
    }
    
    // all summa order
    let totalSum = 0;

    if (order.OrderItems) {
      totalSum = order.OrderItems.reduce((sum, item) => {
        return sum + (item.price * item.count);
      }, 0);
    }
    // Add totalSum to order 
    order.dataValues.totalSum = totalSum;

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getting,
  gettingAll,
  updating,
  deleting,
  creating,
  allItems,
};
