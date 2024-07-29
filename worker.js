let scrolling = false;
const finish_msg = "Carga terminada";
const maxNoNewContentCount = 500; 
let lastHeight = 0;
let noNewContentCount = 0;

self.onmessage = function(event) {
  if (event.data.action === 'startScrolling') {
    scrolling = true;
    lastHeight = event.data.lastHeight || document.body.scrollHeight;
    scrollStep();
  } else if (event.data.action === 'stopScrolling') {
    scrolling = false;
  }
};

function scrollStep() {
  if (!scrolling) {
    self.postMessage({status: 'stopped'});
    return;
  }
  self.postMessage({status: 'scrolling', scrollHeight: document.body.scrollHeight});
  window.scrollTo(0, document.body.scrollHeight);

  const newHeight = document.body.scrollHeight;
  if (newHeight === lastHeight) {
    noNewContentCount++;
  } else {
    noNewContentCount = 0;
    lastHeight = newHeight;
  }

  if (noNewContentCount < maxNoNewContentCount) {
    setTimeout(scrollStep, 100);
  } else {
    self.postMessage({status: 'completed'});
    scrolling = false;
  }
}
