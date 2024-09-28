const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true,
            maxlength: [20, 'name can not be more than 20 characters'],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
          type: Number,
          required: [true, 'product price must be provided'],
        },
        featured: {
          type: Boolean,
          default: false,
        },
        rating: {
          type: Number,
          default: 4.5,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        company: {
          type: String,
          enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
          },
          // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
        },
      
        image: {
          type: String,
          required: false,
        },
    },
        {
          timestamps: true,
        }
)

const Product = mongoose.model("Product", productSchema)
module.exports = Product
