scrolling = false;

function startScrolling() {
  scrolling = true;

  const finish_msg = "Carga terminada";
  const maxNoNewContentCount = 500; 
  let lastHeight = document.body.scrollHeight;
  let noNewContentCount = 0;

  function scrollStep() {
    if (!scrolling) {
      return; 
    }
    window.scrollTo(0, document.body.scrollHeight);

    const newHeight = document.body.scrollHeight;
    if (newHeight === lastHeight) {
      noNewContentCount++;
    } else {
      noNewContentCount = 0;
      lastHeight = newHeight;
    }

    if (noNewContentCount < maxNoNewContentCount) {
      requestAnimationFrame(scrollStep);
    } else {
      alert(finish_msg);
      new Notification(finish_msg);
      scrolling = false; 
    }
  }
  requestAnimationFrame(scrollStep);
}

function stopScrolling() {
  scrolling = false;
}

// Export 
window.startScrolling = startScrolling;
window.stopScrolling = stopScrolling;

