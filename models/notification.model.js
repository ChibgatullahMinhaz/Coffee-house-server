const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  type: { type: String, enum: ["order", "system", "promo"], default: "system" },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default model("Notification", notificationSchema);
