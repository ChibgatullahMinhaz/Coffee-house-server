const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
        size: String,
    }],
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "BDT" },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ["stripe", "paypal", "sslcommerz", "cod"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: { type: String, enum: ["pending", "processing", "out_for_delivery", "delivered", "cancelled"], default: "pending" },
    riderId: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });
export default mongoose.model("Order", orderSchema);