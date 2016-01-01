import mongoose from 'mongoose';
import particle from 'klymit/lib/particle';

const NAME = "Heater";

var schema = mongoose.Schema({
  name:      { type: String,  default: "New Heater" },
  state:     { type: Boolean, default: false        },
  device_id: { type: String,  default: ""           }
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
