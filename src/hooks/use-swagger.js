import { useMemo, useCallback } from 'react';

const types = {
  INITIAL: 'INITIAL',
  EXECUTE: 'EXECUTE',
  SET_TOKEN_FAVORITE: 'SET_TOKEN_FAVORITE',
};

const useSwagger = () => {
  const browser = useMemo(() => window?.chrome ? window.chrome : window.browser, []);

  const getCurrent = useCallback(() => new Promise((resolve, reject) => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((result) => resolve(result[0]))
      .catch((error) => reject(error));
  }), [browser]);

  const getDomain = useCallback(async () => {
    try {
      const current = await getCurrent();
      if (current?.url) {
        const parser = document.createElement('a');
        parser.href = current.url;

        return parser.host;
      }
    // eslint-disable-next-line no-empty
    } catch (error) {}

    return undefined;
  }, [getCurrent]);

  const getToken = useCallback(async () => {
    const current = await getCurrent();
    if (current?.id) {
      browser.scripting
      .executeScript({
        target: { tabId: current.id },
        function: () => {
        },
      });
    }
  }, [getCurrent, browser]);

  const setToken = useCallback(async (token) => {
    const current = await getCurrent();
    if (current?.id) {
      const scripting = `(function(r){var e={JWT:{name:"JWT",schema:{type:"apiKey",description:"Type into the textbox: Bearer {your JWT token}.",name:"Authorization",in:"header"},value:r}};ui.authActions.authorize(e)})("bearer ${token}")`;
      browser.tabs.sendMessage(current.id, { type: types.EXECUTE, message: scripting });
    }
  }, [getCurrent, browser]);

  const setFavoriteToken = useCallback(async (token) => {
    try {
      const domain = await getDomain();
      browser.runtime.sendMessage({ type: types.SET_TOKEN_FAVORITE, message: JSON.stringify({ domain, token }) });
    // eslint-disable-next-line
    } catch (error) {}
  // eslint-disable-next-line
  }, [getCurrent]);

  return {
    browser,
    getCurrent,
    getDomain,
    getToken,
    setToken,
    setFavoriteToken,
  };
};

export default useSwagger;
