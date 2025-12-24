const isLocalhost = Boolean(
  window.location.hostname === "localhost" || window.location.hostname.match(/^127(?:\.\d+){0,2}\.\d+$/),
);

export function register(config) {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL("/", window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker === null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log("New update available, please refresh the page.");
            } else {
              console.log("Content is cached for offline access.");
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during registration Service Worker:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (response.status === 404 || (contentType !== null && contentType.indexOf("javascript") === -1)) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log("No internet connection. Unable to register Service Worker.");
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}
