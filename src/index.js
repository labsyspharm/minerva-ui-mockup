import globalCSS from 'global-css' assert { type: 'css' };
import { toElement, toElementState } from 'elements';
import { IndexGrid } from 'index-grid';
import { nav_config } from 'nav-config';

const main = async (customSuffix) => {
  document.adoptedStyleSheets = [
    globalCSS
  ];
  const defineElement = toElementState(customSuffix, {
    defaults: {
      content_map: 'content_map',
      stories: [
        { content: 'Waypoint 1 content', summary: 'Waypoint 1', expanded: true },
        { content: 'Waypoint 2 content', summary: 'Waypoint 2', expanded: false },
        { content: 'Waypoint 3 content', summary: 'Waypoint 3', expanded: true }
      ]
    },
    constants: {
      nav_config,
      tab_order: (
        [ 'IMAGE', 'OVERLAY', 'GROUP', 'STORY' ]
      ),
      menu_order: (
        [ 'EXPORT', 'SAVEAS', 'SAVE' ]
      )
    },
    styleSheet: globalCSS
  });
  const index = defineElement(IndexGrid, {
    defaults: {
      notice: '', dialog: '', tab: 'STORY'
    }
  });
  toElement(index)``({
    class: 'contents'
  })(document.body);
}

export default main
