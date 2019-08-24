import { Meteor } from 'meteor/meteor';
import {Boxes} from '../lib/collections'

Meteor.startup(() => {
  Meteor.publish('boxes', ()=>{
    return Boxes.find();
  })
});
