import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener((message) => {
  if(message.request == 'get-tab') {
    return browser.tabs.query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT })
      .then(tab => tab[0].url);
  }
  return Promise.resolve("Got your message, thanks!");
});