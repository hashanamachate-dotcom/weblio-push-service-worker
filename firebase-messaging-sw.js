importScripts("https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD9w4J1DXetD38XQkT35mKLS82M4lY2UM",
  authDomain: "weblio-push-hub.firebaseapp.com",
  projectId: "weblio-push-hub",
  storageBucket: "weblio-push-hub.firebasestorage.app",
  messagingSenderId: "179761031104",
  appId: "1:179761031104:web:aeb6b9492069df93904a25",
  measurementId: "G-5JM7C3V1Z8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Background message received:", payload);

  const notificationTitle =
    payload.notification?.title || "Weblio Philippines";

  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/weblio-push-service-worker/icon.png"
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
