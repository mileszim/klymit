import express from 'express';
import Room from 'klymit/models/room';

let Router = express.Router();

const ROUTER_PATH = "/rooms";

// Params
Router.param('slug', function(req, res, next, slug) {
  Room.findOne({ slug: slug })
  .then((room) => {
    req.room = room;
    next();
  })
  .catch((error) => {
    next(error);
  });
});


// Routes
Router.get('/', function(req, res) {
  Room.find({})
  .then((rooms) => {
    res.json(rooms);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

Router.get('/:slug', function(req, res) {
  res.json(req.room);
});

Router.put('/:slug/temp', function(req, res) {
  req.room.temp = req.body.temp;
  req.room.save()
  .then((room) => {
    res.json({ temp: room.temp });
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});


// Export
export const path = ROUTER_PATH;
export let router = Router;
