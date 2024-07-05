import { render } from "solid-js/web";
import App from "./App";
import "@penpot/plugin-styles/styles.css";
import "./style.css";

const root = document.getElementById("app")!
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root!);
