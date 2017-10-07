const vscode = require('vscode');

// TODO: Add more notification types
const NOTIFICATION_TYPES = {
    Info: 'info'
};

const NOTIFICATION_ACTIONS = {
    Undo: 'Undo'
};

module.exports = {
    NotificationTypes: NOTIFICATION_TYPES,
    Actions: NOTIFICATION_ACTIONS,
    notifyOptionMissing,
    notifyUndoAction,
    notify
};

function notifyOptionMissing(missingOption) {
    notify(
        NOTIFICATION_TYPES.Info,
        `Option ${missingOption} is not set or the value is not correct`
    );
}

function notifyUndoAction(message, undoHandler) {
    notify(NOTIFICATION_TYPES.Info, message, [NOTIFICATION_ACTIONS.Undo])
        .then(action => {
            if (action === NOTIFICATION_ACTIONS.Undo) {
                undoHandler();
            }
        });
}

function notify(type, message, actions) {
    switch (type) {
        case NOTIFICATION_TYPES.Info:
            return info(message, actions);

        default:
            return info(message, actions);
    }
}

function info(message, actions) {
    return vscode.window.showInformationMessage(message, ...actions);
}