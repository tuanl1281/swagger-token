/* global chrome */
const storages = {
  TOKEN: 'TOKEN',
};

const types = {
  INITIAL: 'INITIAL',
  EXECUTE: 'EXECUTE',
  SET_TOKEN_FAVORITE: 'SET_TOKEN_FAVORITE',
};

const parseResponse = (request, sender, sendResponse) => {
  if (request?.type) {
    const { type, message } = request;

    switch (type) {
      case types.INITIAL: {
        // eslint-disable-next-line no-unused-expressions
        chrome?.storage?.local?.get(storages.TOKEN, (result) => {
          const token = result[storages.TOKEN];
          if (token) {
            chrome?.tabs?.query({ active: true, currentWindow: true }).then((result) => {
              const [tab] = result;
              if (tab?.id) {
                const scripting = `(function(r){var e={JWT:{name:"JWT",schema:{type:"apiKey",description:"Type into the textbox: Bearer {your JWT token}.",name:"Authorization",in:"header"},value:r}};ui.authActions.authorize(e)})("bearer ${token}")`;
                chrome?.tabs?.sendMessage(tab.id, { type: types.EXECUTE, message: scripting });
              }
            });
          }
        });
        browser?.storage?.local?.get(storages.TOKEN, (result) => {
          const token = result[storages.TOKEN];
          if (token) {
            browser?.tabs?.query({ active: true, currentWindow: true }).then((result) => {
              const [tab] = result;
              if (tab?.id) {
                const scripting = `(function(r){var e={JWT:{name:"JWT",schema:{type:"apiKey",description:"Type into the textbox: Bearer {your JWT token}.",name:"Authorization",in:"header"},value:r}};ui.authActions.authorize(e)})("bearer ${token}")`;
                browser?.tabs?.sendMessage(tab.id, { type: types.EXECUTE, message: scripting });
              }
            });
          }
        });
        break;
      }
      case types.SET_TOKEN_FAVORITE: {
        const storage = {};
        storage[storages.TOKEN] = message;
        // eslint-disable-next-line no-unused-expressions
        chrome?.storage?.local?.set(storage);
        browser?.storage?.local?.set(storage);
        break;
      }
      default:
        break;
    }

    /* Response */
    sendResponse('Roger that 🤘');
  }
};

/* Listen */
chrome?.runtime?.onMessage.addListener(parseResponse);
browser?.runtime?.onMessage.addListener(parseResponse);
