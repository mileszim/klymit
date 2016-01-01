import mongoose from 'mongoose';

const NAME = "Room";

var schema = mongoose.Schema({
  name: { type: String, default: "New Room" },
  temp: { type: Number, default: 0.0        },

  // Relationships
  heaters: [{ type: Schema.Types.ObjectId, ref: 'Heater' }],

  // Slug
  slug: {
    type: String,
    default: function() {
      let number = Math.floor(Math.random() * (1000 - 1)) + 1;
      return `new_room_${number}`;
    }
  }
});


// Export
export default mongoose.model(NAME, schema);
