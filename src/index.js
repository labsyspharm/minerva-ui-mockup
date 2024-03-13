import globalCSS from 'global-css' assert { type: 'css' };
import { toElement, toElementState } from 'elements';
import { nav_config } from 'nav-config';
import { PanelGrid } from 'panel-grid';

const main = async (customSuffix) => {
  document.adoptedStyleSheets = [
    globalCSS
  ];
  const defineElement = toElementState(customSuffix, {
    defaults: {
      content_map: 'content_map',
      stories: [
        { content: 'Story 1 content', summary: 'Story 1', expanded: true },
        { content: 'Story 2 content', summary: 'Story 2', expanded: false },
        { content: 'Story 3 content', summary: 'Story 3', expanded: true }
      ]
    },
    constants: {
      nav_config: new Map(nav_config),
      tab_order: (
        [ 'IMAGE', 'GROUP', 'OVERLAY', 'STORY' ]
      ),
      menu_order: (
        [ 'EXPORT', 'SAVEAS', 'SAVE' ]
      )
    },
    styleSheet: globalCSS
  });
  const panel_grid = defineElement(PanelGrid, {
    attributes: ['expanded'],
    defaults: {
      tab_choice: 'STORY',
      expanded: true
    }
  });
  toElement('div')`
    <img src="data/background.png"/>
    <${panel_grid} class="stretch grid" />
  `({
    class: 'root stretch grid'
  })(document.body);
}

export default main
