const api = typeof browser !== 'undefined' ? browser : chrome;

document.getElementById('start').addEventListener('click', () => {
  api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    api.runtime.sendMessage({ action: "startScrolling", tabId: activeTab.id });
  });
});

document.getElementById('stop').addEventListener('click', () => {
  api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    api.runtime.sendMessage({ action: "stopScrolling", tabId: activeTab.id });
  });
});
