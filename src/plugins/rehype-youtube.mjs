import { visit } from 'unist-util-visit';

function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') && u.pathname === '/watch') {
      return u.searchParams.get('v');
    }
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/live/')) {
      return u.pathname.split('/live/')[1];
    }
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1);
    }
  } catch {
    return null;
  }
  return null;
}

export default function rehypeYoutube() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // Match <p> containing only an <a> with a YouTube URL
      if (node.tagName !== 'p' || !parent) return;

      const children = node.children.filter(
        (c) => !(c.type === 'text' && !c.value.trim())
      );

      if (children.length !== 1) return;
      const child = children[0];

      let href = null;
      if (child.tagName === 'a' && child.properties?.href) {
        href = child.properties.href;
      }
      if (!href) return;

      const videoId = extractYouTubeId(href);
      if (!videoId) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { class: 'youtube-embed' },
        children: [
          {
            type: 'element',
            tagName: 'iframe',
            properties: {
              src: `https://www.youtube.com/embed/${videoId}`,
              frameBorder: '0',
              allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
              allowFullscreen: true,
              loading: 'lazy',
            },
            children: [],
          },
        ],
      };
    });
  };
}
