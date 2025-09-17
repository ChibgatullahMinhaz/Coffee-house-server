import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userEmail: { type: String, ref: "User", required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
        size: String,
    }],
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);

