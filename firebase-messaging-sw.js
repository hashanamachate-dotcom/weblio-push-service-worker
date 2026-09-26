importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);


firebase.initializeApp({

  apiKey:
    "AIzaSyDHa8Asn_C2YbNEpLdzQur5abUA_L5cI74",

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


    const notificationOptions = {

      body:
        payload.notification?.body ||
        "You have a new Weblio notification."

    };


    self.registration.showNotification(
      notificationTitle,
      notificationOptions

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
