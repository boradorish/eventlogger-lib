# EventLogger

An extendable, declarative event logging library for **Next.js + Django + ClickHouse** based applications.

## 🚀 Features

- 🔍 **Automatic Page View Tracking**
- 🖱️ **Declarative Click & Hover Event Logging**
- 👥 **User Context Injection**
- 📱 **Device Type Detection (Mobile / PC)**

---

## 📦 Installation

This package is not yet published on NPM. You can install it locally:

```bash
npm install /path/to/event-logger
```

---

## 💡 Usage

### 1️⃣ **Setup in `_app.tsx`**

First, wrap your application with the required providers:

```tsx
import {
  LoggerProvider,
  UserProvider,
  DeviceProvider,
  AutoTrack,
} from 'event-logger';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <DeviceProvider>
        <LoggerProvider
          config={{
            endpoint: process.env.NEXT_PUBLIC_CLICKHOUSE_URL as string,
            batchInterval: 5000,
          }}
        >
          <AutoTrack />
          <Component {...pageProps} />
        </LoggerProvider>
      </DeviceProvider>
    </UserProvider>
  );
}
```

---

### 2️⃣ **Automatic Page View Tracking**

- Page views are automatically tracked when navigation occurs.
- Includes `document.title` and `device type`.

---

### 3️⃣ **Click Event Tracking**

Wrap any component with `<Track>` to automatically capture click events.

```tsx
import { Track } from 'event-logger';

export default function HomePage() {
  return (
    <Track
      eventName="ClickButton"
      on="click"
      attributes={{ buttonId: 'cta', source: 'homepage' }}
    >
      <button>Click Me!</button>
    </Track>
  );
}
```

---

### 4️⃣ **User Information Management**

- Easily sync user data across tracked events.

```tsx
import { useUser } from 'event-logger';

const LoginButton = () => {
  const { setUser } = useUser();

  const handleLogin = () => {
    setUser('user123');
  };

  return <button onClick={handleLogin}>Login</button>;
};
```

---

### 5️⃣ **Device Information**

Get the current device type (`Mobile`, `PC`).

```tsx
import { useDevice } from 'event-logger';

const DeviceInfo = () => {
  const { device } = useDevice();
  return <div>Current Device: {device}</div>;
};
```

---

## ⚙️ Configuration

| Option          | Description                                 |
| --------------- | ------------------------------------------- |
| `endpoint`      | The URL for sending logs to ClickHouse.     |
| `batchInterval` | The interval in milliseconds to batch logs. |

---

## 🔍 **ClickHouse Integration**

Add your ClickHouse endpoint in your `.env.local`:

```
NEXT_PUBLIC_CLICKHOUSE_URL=https://clickhouse.yourdomain.com
```

---

## ✅ **To Do**

- [ ] SPA history.pushState support
- [ ] Error logging and retry mechanism
- [ ] Network failover handling
- [ ] Customizable tracking filters

---

## 🛠️ **Development**

```bash
npm run dev
```

To run tests:

```bash
npm test
```
