const settingsSchema = new Schema({
  siteName: { type: String, default: "Coffee Shop" },
  banners: [{ type: String }],
  contactEmail: String,
  openingHours: String,
  deliveryZones: [String],
}, { timestamps: true });

export default model("Setting", settingsSchema);
