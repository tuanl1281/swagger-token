/* global chrome */
/* global browser */
const storages = {
  SWAGGER_TOKEN: 'SWAGGER_TOKEN',
};

const types = {
  INITIAL: 'INITIAL',
  EXECUTE: 'EXECUTE',
  SET_TOKEN_FAVORITE: 'SET_TOKEN_FAVORITE',
};

if (typeof browser === 'undefined') {
  var browser = chrome;
}

const parseResponse = (request, sender, sendResponse) => {
  if (request?.type) {
    const { type, message } = request;

    switch (type) {
      case types.INITIAL: {
        // eslint-disable-next-line no-unused-expressions
        browser?.storage?.local?.get(storages.SWAGGER_TOKEN, (result) => {
          let storage = result[storages.SWAGGER_TOKEN];
          if (!storage || !Array.isArray(storage))
            storage = [];

          const token = storage.find((s) => s.domain === message)?.token;
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
        const parser = JSON.parse(message);
        // eslint-disable-next-line no-unused-expressions
        browser?.storage?.local?.get(storages.SWAGGER_TOKEN, (result) => {
          let storage = result[storages.SWAGGER_TOKEN];
          if (!storage || !Array.isArray(storage))
            storage = [];

          let newestStorage = [];
          if (!storage.find((s) => s.domain === parser.domain)?.token)
            newestStorage = [...storage, parser];
          else {
            newestStorage = storage.reduce((result, { domain, token }) => {
              if (domain === parser.domain)
                return [...result, { domain, token: parser.token }];
              return [...result, { domain, token }];
            }, []);
          }

          result[storages.SWAGGER_TOKEN] = newestStorage;
          // eslint-disable-next-line no-unused-expressions
          browser?.storage?.local?.set(result, () => {});
        });
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
browser?.runtime?.onMessage.addListener(parseResponse);