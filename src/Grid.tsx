import { Component, For, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { IconStyle, type IconEntry } from "@phosphor-icons/core";
import type { UIMessageEvent } from "./model";

type GridProps = {
  entries: ReadonlyArray<IconEntry>;
  raw: boolean;
  weight: IconStyle;
}

const Grid: Component<GridProps> = (props) => {
  const insertIcon = (entry: IconEntry, svg: SVGSVGElement) => {
    const message: UIMessageEvent = {
      type: "inserticon",
      content: {
        entry,
        svg: svg.outerHTML,
        raw: props.raw,
        weight: props.weight,
      },
    };
    parent.postMessage(JSON.stringify(message), "*");
  };

  return (
    <div id="grid">
      <For each={props.entries}>
        {(entry, _index) => {
          return (
            <GridItem
              entry={entry}
              weight={props.weight}
              onClick={insertIcon}
            />);
        }}
      </For>
    </div>
  );
}

type GridItemProps = {
  entry: IconEntry;
  weight: IconStyle;
  onClick: (entry: IconEntry, svg: SVGSVGElement) => void;
}

const GridItem: Component<GridItemProps> = (props) => {
  const wcName = `ph-${props.entry.name}`;

  const onClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
    const svg = event
      .currentTarget
      .firstElementChild!
      .shadowRoot!
      .firstElementChild as SVGSVGElement;
    props.onClick(props.entry, svg);
  }

  return (
    <div
      class="grid-item"
      title={props.entry.pascal_name}
      onClick={onClick}
    >
      <Dynamic
        component={wcName}
        weight={props.weight}
        size="24px"
      />
    </div>
  );
}

export default Grid;
