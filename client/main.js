import { Template } from 'meteor/templating';
import {Meteor} from 'meteor/meteor'
import {Boxes} from '../lib/collections'
import './main.html';

let dragged;
let colors=['1 1 1 ','0.7 0.7 0.7','0.5 0.5 0.5','0.2 0.2 0.2','0 0 0'];
let temp=0;
Meteor.subscribe('boxes')
Template.body.helpers({
  boxes(){
    return Boxes.find()
  },
  boxesCount(){
    return Boxes.find().fetch().length;
  }
});
Template.body.events({
  "mousedown x3d": function () {
    dragged = false;
  },
  "mousemove x3d": function () {
    dragged = true;
  },
 'mouseup shape'(evt){
   if(!dragged && evt.button==1){
     try{
      Boxes.insert({
        color: colors[temp],
        x: Math.floor(evt.worldX*2 + evt.normalX/2)*0.5+0.25,
        y: Math.floor(evt.worldY*2 + evt.normalY/2)*0.5+0.25,
        z: Math.floor(evt.worldZ*2 + evt.normalZ/2)*0.5+0.25
      })
      temp==colors.length-1? temp=0: temp++;
     }catch(err){
       console.log(err)
     }
   }else if(!dragged && evt.button==2){
     try{
      Boxes.remove(evt.currentTarget.id)
     }catch(err){
       console.log(err)
     }
   }
 }
});