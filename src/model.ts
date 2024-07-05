import { PenpotTheme } from "@penpot/plugin-types";
import { IconEntry, IconStyle } from "@phosphor-icons/core";

export type ThemePluginEvent = {
  type: "theme";
  content: PenpotTheme;
};

export type PluginMessageEvent = ThemePluginEvent;

export type InsertIconEvent = {
  type: "inserticon";
  content: {
    entry: IconEntry;
    svg: string;
    raw: boolean;
    weight: IconStyle;
  };
};

export type UIMessageEvent = InsertIconEvent;
