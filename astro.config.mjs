import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { visit } from "unist-util-visit";

function remarkHexoAssetPath() {
  return (tree) => {
    visit(tree, "image", (node) => {
      if (
        node.url &&
        !node.url.startsWith("http") &&
        !node.url.startsWith("/")
      ) {
        const cleanPath = node.url.replace(/^\.\//, "");
        node.url = `/posts/${cleanPath}`;
      }
    });
  };
}

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkHexoAssetPath],
  },
  integrations: [react()],
});
