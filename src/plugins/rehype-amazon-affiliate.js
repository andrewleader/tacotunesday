/**
 * Rehype plugin that appends the Amazon affiliate tag to any amazon.com links
 * and marks them with a CSS class for the subtle indicator styling.
 *
 * No external dependencies — traverses the HAST tree directly.
 */

const AFFILIATE_TAG = 'roamapps-20';
const AFFILIATE_CLASS = 'amazon-affiliate-link';

/** @param {import('hast').Root} tree */
function visitElements(tree, visitor) {
  if (tree.type === 'element') {
    visitor(tree);
  }
  if (tree.children) {
    for (const child of tree.children) {
      visitElements(child, visitor);
    }
  }
}

/** @type {() => import('unified').Transformer} */
function rehypeAmazonAffiliate() {
  return (tree) => {
    visitElements(tree, (node) => {
      if (
        node.tagName === 'a' &&
        node.properties?.href &&
        /amazon\.com/i.test(String(node.properties.href))
      ) {
        try {
          const url = new URL(String(node.properties.href));
          url.searchParams.set('tag', AFFILIATE_TAG);
          node.properties.href = url.toString();
          node.properties.className = [
            ...(node.properties.className ?? []),
            AFFILIATE_CLASS,
          ];
          // Browser tooltip on hover — no extra markup needed
          node.properties.title =
            node.properties.title ?? 'Amazon affiliate link';
        } catch {
          // Skip malformed URLs
        }
      }
    });
  };
}

module.exports = rehypeAmazonAffiliate;
