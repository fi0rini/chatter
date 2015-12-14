var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageConstants = require('../constants/MessageConstants');


var CHANGE_EVENT = 'change';

var _messages = {};

function create (text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _messages[id] = {
        id: id,
        text: text,
        creation: new Date(),
        user: null
    };
}

function destroy (id) {
    delete _messages[id];
}

var MessageStore = assign({}, EventEmitter.prototype, {
    getAll: function () {
        return _messages;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register( function(action) {
    var text;

    switch (action.actionType) {
        case MessageConstants.COMMENT_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
                MessageStore.emitChange();
            }
            break;

        case MessageConstants.COMMENT_DELETE:
            destroy(action.id);
            break;

        default:
            // no op
    }
});

module.exports = MessageStore;
