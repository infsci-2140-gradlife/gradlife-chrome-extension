let storedEvent = null;

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(msg => {
        console.log('got this from the port', msg);
    })
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message', message);
});

console.log('serviceWorker script loaded');