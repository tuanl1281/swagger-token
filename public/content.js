/* global chrome */
const types = {
  EXECUTE: 'EXECUTE',
};

const embeddedScript = (script) => {
  document.documentElement.setAttribute('onreset', script);
  document.documentElement.dispatchEvent(new CustomEvent('reset'));
  document.documentElement.removeAttribute('onreset');
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
});
