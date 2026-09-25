import { IconStyle } from "@phosphor-icons/core";
import type {
  PluginMessageEvent,
  UIMessageEvent,
  InsertIconEvent,
} from "./model";

penpot.ui.open("Phosphor Icons", `/penpot/?theme=${penpot.theme}`, {
  width: 350,
  height: 580,
});

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

penpot.ui.onMessage<unknown>(async (message) => {
  const data = parseUIMessage(message);
  if (!data) {
    return;
  }
  switch (data.type) {
    case "inserticon":
      await handleInsertIcon(data);
      break;
    default:
      return;
  }
});

// Penpot may deliver messages that did not originate from our UI (and are not
// JSON strings), so parse defensively and ignore anything we don't recognize.
function parseUIMessage(message: unknown): UIMessageEvent | null {
  let data: unknown = message;
  if (typeof message === "string") {
    try {
      data = JSON.parse(message);
    } catch (_) {
      return null;
    }
  }
  if (typeof data !== "object" || data === null || !("type" in data)) {
    return null;
  }
  return data as UIMessageEvent;
}

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}

async function handleInsertIcon(data: InsertIconEvent) {
  const { entry, svg, raw, weight } = data.content;
  const markup = raw
    ? await (async () => {
        try {
          const text = await fetchRawIcon(entry.name, weight);
          return text;
        } catch (_) {
          // TODO: notify somehow?
          return svg;
        }
      })()
    : svg;

  const center = penpot.viewport.center;
  const shape = penpot.createShapeFromSvg(markup);
  if (!shape) {
    return;
  }

  shape.name = entry.pascal_name;
  shape.proportionLock = true;
  if (!raw) shape.resize(24, 24);
  shape.x = center.x;
  shape.y = center.y;
}

async function fetchRawIcon(name: string, weight: IconStyle): Promise<string> {
  const fileName = name + (weight === "regular" ? "" : `-${weight}`);
  const res = await fetch(
    `https://raw.githubusercontent.com/phosphor-icons/core/main/raw/${weight}/${fileName}.svg`
  );
  return res.text();
}
