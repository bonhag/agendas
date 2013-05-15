Agendas = new Meteor.Collection("agendas");
Items = new Meteor.Collection("items");

if (Meteor.isClient) {
  Template.agenda.date = function() {
    return 'Wednesday, May 15'
  };

  Template.agenda.items = function () {
    return Items.find();
  };

  Template.agenda.events({
    'click button.previous': function () {
      Session.set("current_agenda", Session.get("current_agenda") - 1);
    },
    'click button.next': function () {
      Session.set("current_agenda", Session.get("current_agenda") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
