const couponSchema = new Schema({
  code: { type: String, unique: true, required: true },
  discountType: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
  discountValue: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 },
  usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default model("Coupon", couponSchema);