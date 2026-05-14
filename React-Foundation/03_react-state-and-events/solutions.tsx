import { useState } from "react";

function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  return (
    <section>
      <p>
        Logged In: {isLoggedIn ? "Yes" : "No"}
      </p>

      <button
        onClick={() => setIsLoggedIn(true)}
      >
        Login
      </button>
    </section>
  );
}

function NotificationCounter() {
  const [
    notificationCount,
    setNotificationCount,
  ] = useState(0);

  return (
    <section>
      <p>
        Notifications: {notificationCount}
      </p>

      <button
        onClick={() =>
          setNotificationCount(
            (currentCount) =>
              currentCount + 1
          )
        }
      >
        Add Notification
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <LoginStatus />
      <NotificationCounter />
    </main>
  );
}

export default App;
