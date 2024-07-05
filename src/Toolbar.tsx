import { Component, For, Show, Setter } from "solid-js";
import { Scheduled } from "@solid-primitives/scheduled";
import { IconStyle } from "@phosphor-icons/core";

type ToolbarProps = {
  raw: boolean;
  setRaw: Setter<boolean>
  weight: IconStyle;
  setWeight: Setter<IconStyle>;
  query: string;
  setQuery: Scheduled<[string]>;
}

const Toolbar: Component<ToolbarProps> = (props) => {

  return (
    <header id="toolbar">
      <input
        class="input"
        type="search"
        size="1"
        placeholder="Search icons..."
        value={props.query}
        onInput={(e) => props.setQuery(e.target.value)}
      />
      <select
        class="select"
        value={props.weight}
        onChange={(e) => props.setWeight(e.target.value as IconStyle)}
      >
        <For each={Object.values(IconStyle)}>
          {(weight, index) => {
            const displayWeight = weight.replace(/^\w/, (c) => c.toUpperCase());
            return (
              <option data-index={index} value={weight}>
                {displayWeight}
              </option>
            );
          }}
        </For>
      </select>
      {/* Disabled; unclear if raw SVG can be proportionally scaled in-app? */}
      <Show when={false}>
        <label for="raw" class="input flex">
          <input
            name="raw"
            id="raw"
            class="checkbox nodisplay"
            type="checkbox"
            onChange={(e) => props.setRaw(e.target.checked)}
            checked={props.raw}
          />
          {props.raw
            ? <ph-bounding-box size="1.25em" weight="fill"></ph-bounding-box>
            : <ph-square size="1.25em" weight="fill"></ph-square>
          }
          <span>{props.raw ? "Raw" : "Flat"}</span>
        </label>
      </Show>
    </header >
  );
}

export default Toolbar;
