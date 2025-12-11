# 💬 docvia

**A simple, embeddable React component for integrating the Docvia Chat Widget into your application.**

`docvia` provides the `ChatWidget` component, allowing you to easily add a contextual AI chat interface powered by Docvia to your web project.

## ✨ Features

- **Easy Integration:** Add the chat widget with a single React component.
- **Customizable:** Configure the widget using simple props like `apiKey`.
- **Minimal Setup:** Get up and running in minutes.

## 📦 Installation

To start using `docvia`, install it via npm or yarn:

```bash
# Using npm
npm install docvia

# Using yarn
yarn add docvia
```

```js
import { ChatWidget } from "docvia";

const App = () => {
  const apiKey = import.meta.env.VITE_DOCVIA_API_KEY;
  return <ChatWidget apiKey={apiKey} />;
};
```
