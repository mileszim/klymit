import mongoose from 'mongoose';

const NAME = "Room";

var schema = mongoose.Schema({
  name: { type: String, default: "New Room" },
  temp: { type: Number, default: 0.0        }
});


// Export
export default mongoose.model(NAME, schema);
