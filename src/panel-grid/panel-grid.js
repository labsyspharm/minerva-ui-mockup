import panelGridCSS from 'panel-grid-css' assert { type: 'css' };
import iconButtonCSS from 'icon-button-css' assert { type: 'css' };
import { SimpleIconButtonLite } from 'simple-icon-button-lite';
import { toElement } from 'elements';
import { Panel } from 'panel';
import { Nav } from 'nav';

class IconButton extends SimpleIconButtonLite {
  static get _styleSheet() {
    return iconButtonCSS;
  }
}

class PanelGrid extends HTMLElement {

  get elementTemplate() {
    const nav = this.defineElement(Nav);
    const panel = this.defineElement(Panel);
    const button = this.defineElement(IconButton);
    return toElement('div')`
      ${
        toElement(button)``({
          icon: 'icons:expand-more',
          '@click': (event) => {
            this.elementState.expanded = (
              !this.elementState.expanded
            );
          },
          expanded: () => this.elementState.expanded
        })
      }
      <${nav} class="center stretch grid"></${nav}>
      <${panel} class="stretch grid panel"></${panel}>
    `({
      'class': 'wrapper start grid',
      'expanded': () => this.elementState.expanded
    });
  }

  static get _styleSheet() {
    return panelGridCSS;
  }
}

export { PanelGrid };
