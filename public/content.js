const types = {
  INITIAL: 'INITIAL',
  EXECUTE: 'EXECUTE',
};

const browser = window?.chrome ? window.chrome : window.browser;

const embeddedScript = (script) => {
  document.documentElement.setAttribute('onreset', script);
  document.documentElement.dispatchEvent(new CustomEvent('reset'));
  document.documentElement.removeAttribute('onreset');
};

const parseResponse = (request, sender, sendResponse) => {
  if (request?.type) {
    const { type, message } = request;

    switch (type) {
      case types.EXECUTE: {
        if (message) {
          embeddedScript(message);
          sendResponse('Roger that 🤘');
        }
        break;
      }
      default:
        sendResponse('Roger that 🤘');
        break;
    }
  }
};

/* Initial */
document.addEventListener('DOMContentLoaded', () => {
  browser.runtime.sendMessage({ type: types.INITIAL, message: window.location.host });
  // eslint-disable-next-line no-console
  console.log('Initial swager token 🚀🚀🚀');
});

/* Listen */
browser.runtime.onMessage.addListener(parseResponse);
