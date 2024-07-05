import type { IconAttrs } from "@phosphor-icons/webcomponents";
import "@phosphor-icons/webcomponents"

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "ph-bounding-box": IconAttrs;
      "ph-hand-heart": IconAttrs;
      "ph-phosphor-logo": IconAttrs;
      "ph-square": IconAttrs;
    }
  }
}

