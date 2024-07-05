import { Component, createSignal } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import Fuse from "fuse.js";
import { type IconEntry, IconStyle, icons } from "@phosphor-icons/core";
import { PluginMessageEvent } from "./model";
import Toolbar from "./Toolbar";
import Grid from "./Grid";
import Footer from "./Footer";
import "./icons";

const fuse = new Fuse(icons, {
  keys: [
    { name: "name", weight: 4 },
    { name: "pascal_name", weight: 4 },
    "tags",
    "categories",
  ],
  threshold: 0.2, // Tweak this to what feels like the right number of results
  // shouldSort: false,
  useExtendedSearch: true,
});


const App: Component = () => {
  const [weight, setWeight] = createSignal<IconStyle>(IconStyle.REGULAR);
  const [raw, setRaw] = createSignal<boolean>(false);
  const [query, setQuery] = createSignal<string>("");
  const [results, setResults] = createSignal<ReadonlyArray<IconEntry>>(icons);

  const debouncedUpdateResults = debounce((query: string) => {
    if (query.trim() === "") {
      setResults(icons);
      return;
    }

    const results = fuse.search(query).map((value) => value.item);
    setResults(results);
  }, 250);

  const performSearch = (query: string) => {
    setQuery(query);
    debouncedUpdateResults(query);
  };
  performSearch.clear = debouncedUpdateResults.clear;

  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get("theme") || "dark";
  const [theme, setTheme] = createSignal(initialTheme);

  window.addEventListener("message", (event: MessageEvent<PluginMessageEvent>) => {
    if (event.data.type === "theme") {
      setTheme(event.data.content);
    }
  });

  return (
    <main data-theme={theme()}>
      <Toolbar
        weight={weight()}
        setWeight={setWeight}
        raw={raw()}
        setRaw={setRaw}
        query={query()}
        setQuery={performSearch}
      />
      <Grid entries={results()} raw={raw()} weight={weight()} />
      <Footer />
    </main>
  );
};

export default App;
