import panelCSS from 'panel-css' assert { type: 'css' };
import collapseCSS from 'collapse-css' assert { type: 'css' };
import { toElement } from 'elements';
import {A11yCollapse} from 'a11y-collapse';

class Collapse extends A11yCollapse {
  static elementProperties = new Map([
    ...A11yCollapse.elementProperties,
    ['ki', Object]
  ])
  static get _styleSheet() {
    return collapseCSS;
  }
  get expanded () {
    const { items={}, ki } = this.elementState;
    return items[ki].expanded || false;
  }
  set expanded (v) {
    const { items={}, ki } = this.elementState;
    if (items && ki in items) {
      items[ki].expanded = v;
      this.requestUpdate();
    }
    return true;
  }
}

class PanelContent extends HTMLElement {
  get elementTemplate() {
    const { items } = this.elementContents;
    const { itemsTemplate } = this.elementContents;
    return itemsTemplate(items || []);
  }
  get elementContents() {
    const itemsTemplate = (items) => {
      const details = this.defineElement(Collapse, {
        constants: { items }, 
        defaults: { ki: 0 }
      });
      return items.map((item, i) => {
        return toElement(details)`
          <p slot="heading">${() => item.summary}</p>
          <div>${() => item.content}</div>
        `({
          accordion: true, ki: i,
          expanded: () => {
            return item.expanded
          },
          class: () => {
            if (i+1 == items.length) {
              return 'end';
            }
            return ''
          }
        });
      });
    }
    return { itemsTemplate };
  }
  static get _styleSheet() {
    return panelCSS;
  }
}

class StoryPanelContent extends PanelContent {
  get elementContents() {
    const { stories } = this.elementState;
    return {
      ...super.elementContents, items: stories 
    };
  }
  static get _styleSheet() {
    return panelCSS;
  }
}

class Panel extends HTMLElement {

  get elementTemplate() {
    const { heading, content } = this.elementContents;
    return toElement('div')`
      <h2 class="indent">${heading}</h2>
      ${content}
    `({
      'class': 'start grid wrapper'
    });
  }

  get elementContents() {
    const default_panel = this.defineElement(PanelContent);
    const story_panel = this.defineElement(StoryPanelContent);
    const { nav_config } = this.elementState;
    return {
      heading: () => {
        const { tab_choice } = this.elementState;
        if (tab_choice == 'STORY') {
          return '_______';
        }
        return nav_config.get(tab_choice).heading
      },
      content: () => {
        const { tab_choice } = this.elementState;
        if (tab_choice == 'STORY') {
          return toElement(story_panel)``({});
        }
        return toElement(default_panel)``({});
      }
    }
  }

  static get _styleSheet() {
    return panelCSS;
  }
}

export { Panel };
