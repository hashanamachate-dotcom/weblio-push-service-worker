importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey:
    "AIzaSyD5XhPV7yGhrCPUiYj3TSWuHF8OVWVAcXk",

  authDomain:
    "weblio-push-hub-64689.firebaseapp.com",

  projectId:
    "weblio-push-hub-64689",

  storageBucket:
    "weblio-push-hub-64689.firebasestorage.app",

  messagingSenderId:
    "240629203108",

  appId:
    "1:240629203108:web:38e2e2d1f9884cefef2631",

  measurementId:
    "G-ME77G36Z4S"
});

const messaging =
  firebase.messaging();

messaging.onBackgroundMessage(
  function(payload) {

    console.log(
      "Background message received:",
      payload
    );

    const notificationTitle =
      payload.notification?.title ||
      "Weblio Philippines";

    // Extract target redirect URL sent from Apps Script
    const clickLink =
      payload.fcmOptions?.link ||
      payload.data?.link ||
      payload.notification?.click_action ||
      "https://weblio-tutor-notifications.vercel.app/";

    const notificationOptions = {
      body:
        payload.notification?.body ||
        "You have a new Weblio notification.",
      data: {
        url: clickLink
      }
    };

    self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  }
);

/*
 * HANDLE NOTIFICATION CLICK REDIRECT
 */
self.addEventListener(
  "notificationclick",
  function(event) {

    event.notification.close();

    const targetUrl =
      event.notification.data?.url ||
      "https://weblio-tutor-notifications.vercel.app/";

    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
    );
  }
);

/*
 * SERVICE WORKER INSTALLATION
 */
self.addEventListener(
  "install",
  function() {

    console.log(
      "Weblio notification service worker installed."
    );

    self.skipWaiting();

  }
);

/*
 * SERVICE WORKER ACTIVATION
 */
self.addEventListener(
  "activate",
  function(event) {

    console.log(
      "Weblio notification service worker activated."
    );

    event.waitUntil(
      self.clients.claim()
    );

  }
);
