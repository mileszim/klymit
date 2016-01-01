import mongoose from 'mongoose';
import particle from 'klymit/lib/particle';

const NAME = "Heater";

var schema = mongoose.Schema({
  name:      { type: String,  default: "New Heater" },
  state:     { type: Boolean, default: false        },
  device_id: { type: String,  default: ""           },

  // Relationships
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],

  // Slug
  slug: {
    type: String,
    default: function() {
      let number = Math.floor(Math.random() * (1000 - 1)) + 1;
      return `new_heater_${number}`;
    }
  }
});


// Methods
schema.methods.turnOn = function() {
  console.log(`Heater (${this.name}): Turning on - trying...`);
  particle.getDevice(this.device_id)
  .then((device) => {
    return device.callFunction('turnHeater', 'on');
  })
  .then((res) => {
    console.log(`Heater (${this.name}): Turning on - Success!`);
    this.state = true;
    return this.save();
  })
  .catch((error) => {
    console.log(`Heater (${this.name}): Turning on - Failure! "${error}"`);
  });
}

schema.methods.turnOff = function() {
  console.log(`Heater (${this.name}): Turning off - trying...`);
  particle.getDevice(this.device_id)
  .then((device) => {
    return device.callFunction('turnHeater', 'off');
  })
  .then((res) => {
    console.log(`Heater (${this.name}): Turning off - Success!`);
    this.state = false;
    return this.save();
  })
  .catch((error) => {
    console.log(`Heater (${this.name}): Turning off - Failure! "${error}"`);
  });
}


// Export
export default mongoose.model(NAME, schema);
