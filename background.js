const api = typeof browser !== 'undefined' ? browser : chrome;

api.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

api.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScrolling") {
    api.scripting.executeScript({
      target: { tabId: request.tabId },
      files: ['content.js']
    }, () => {
      api.scripting.executeScript({
        target: { tabId: request.tabId },
        func: () => {
          if (typeof window.startScrolling === 'function') {
            window.startScrolling();
          } else {
            console.error('startScrolling function is not available.');
          }
        }
      });
    });
  } else if (request.action === "stopScrolling") {
    api.scripting.executeScript({
      target: { tabId: request.tabId },
      func: () => {
        if (typeof window.stopScrolling === 'function') {
          window.stopScrolling();
        } else {
          console.error('stopScrolling function is not available.');
        }
      }
    });
  }
});
