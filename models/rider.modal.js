const riderSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true },  
  vehicleType: { type: String, enum: ["bike", "bicycle", "car", "van"], required: true },
  vehicleNumber: { type: String },
  licenseNumber: { type: String },
  nidOrIdCard: { type: String },
  address: { type: String },
  
  isActive: { type: Boolean, default: true },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  
  assignedOrders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  completedDeliveriesCount: { type: Number, default: 0 },
  
  totalEarnings: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ["bkash", "nagad", "bank"], default: "bkash" },
  lastPayoutDate: { type: Date }
}, { timestamps: true });

export default model("Rider", riderSchema);





