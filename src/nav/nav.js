import navCSS from 'nav-css' assert { type: 'css' };
import { toElement } from 'elements';

class Nav extends HTMLElement {

  get elementTemplate() {
    const {
      nav_config, menu_order, tab_order
    } = this.elementState;
    const menu_items = this.itemsTemplate(
      nav_config, menu_order, 'small button'
    );
    const tab_items = this.itemsTemplate(
      nav_config, tab_order, 'tab'
    );
    return toElement('div')`
      <div class="stretch grid menu">
        ${() => menu_items}
      </div>
      <div class="stretch grid menu tabs">
        ${() => tab_items}
      </div>
    `({
      'class': 'actionable stretch grid wrapper'
    });
  }
  itemsTemplate(item_map, item_list, kind) {
    return item_list.map((item_id, i) => {
      const item = item_map.get(item_id);
      const item_class = () => {
        return `center grid menu ${kind}`;
      }
      return toElement('div')`
      <div class="${item_class}">
        <div>
          ${() => item.heading}
        </div>
      </div>`({
        'class': () => {
          const { tab_choice } = this.elementState;
          return `stretch grid menu ${
            item_id == tab_choice ? 'chosen' : ''
          }`;
        },
        '@click': () => {
          this.elementState.tab_choice = item.id;
        },
      });
    })
  }

  static get _styleSheet() {
    return navCSS;
  }
}

export { Nav };
