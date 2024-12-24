import { Theme } from "@penpot/plugin-types";
import { IconEntry, IconStyle } from "@phosphor-icons/core";

export type ThemePluginEvent = {
  type: "theme";
  content: Theme;
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
