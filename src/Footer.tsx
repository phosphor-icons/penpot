import { Component } from "solid-js";
import pkg from "../package.json";

const Footer: Component = () => {
  return (
    <footer class="flex">
      <a href="https://phosphoricons.com" target="_blank" class="flex">
        <ph-phosphor-logo weight="fill" size="1.4em"></ph-phosphor-logo>
        <span>phosphoricons.com</span>
      </a>
      <div class="flex">
        <a href="https://buymeacoffee.com/phosphoricons" target="_blank" class="flex">
          <ph-hand-heart weight="regular" size="1.4em"></ph-hand-heart>
          <span>Donate</span>
        </a>
        <span
          id="version"
          title={`Based on @phosphor-icons/webcomponents@${pkg.dependencies["@phosphor-icons/webcomponents"]}`}
        >
          v{pkg.version}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
