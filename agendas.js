Items = new Meteor.Collection("items");

if (Meteor.isClient) {
  Template.agenda.date = function() {
    return 'May 15, 2013'
  };

  Template.agenda.items = function () {
    return Items.find();
  };

  Template.item.events({
    'click i.icon-remove': function () {
      Items.remove({_id: this._id});
    }
  });

  var inflateEstimate = function (estimate) {
    var splitEstimate = estimate.split(' ');
    var minutes = splitEstimate[0];
    var text = splitEstimate[1];
    minutes *= 3;
    return [minutes, text].join(' ');
  };

  var addNewItem = function () {
    var owner = $("#owner").val();
    var estimate = $("#estimate").val();

    if (owner.toLowerCase() == 'chapin') {
      estimate = inflateEstimate(estimate);
    }

    Items.insert({
      description: $("#description").val(),
      estimate: estimate,
      owner: owner
    });
  };

  var clearInputForm = function () {
    $("#description").val("");
    $("#estimate").val("");
    $("#owner").val("");
  };

  var focusOnDescription = function () {
    $("#description").focus();
  };

  Template.add.events({
    'keypress': function(keyEvent) {
      if (keyEvent.keyCode == 13) {
        $('i.icon-plus').click();
      }
    },

    'click i.icon-plus': function () {
      addNewItem();
      clearInputForm();
      focusOnDescription();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
