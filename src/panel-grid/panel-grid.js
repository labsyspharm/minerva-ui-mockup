import panelGridCSS from 'panel-grid-css' assert { type: 'css' };
import iconButtonCSS from 'icon-button-css' assert { type: 'css' };
import dialogGridCSS from 'dialog-grid-css' assert { type: 'css' };
import { SimpleIconButtonLite } from 'simple-icon-button-lite';
import { WebDialog } from 'web-dialog';
import { toElement } from 'elements';
import { Dialog } from 'dialog';
import { Panel } from 'panel';
import { Nav } from 'nav';

class IconButton extends SimpleIconButtonLite {
  static get _styleSheet() {
    return iconButtonCSS;
  }
}

class DialogGrid extends WebDialog {
  static get _styleSheet() {
    return dialogGridCSS;
  }
}

class PanelGrid extends HTMLElement {

  get dialogGridTemplate() {
    const dialog_element = this.defineElement(Dialog);
    const dialog_content = toElement(dialog_element)``(
      {}
    );
    return toElement(this.defineElement(DialogGrid))`
      <span>HELLO</span>
      ${dialog_content}
    `({
      open: () => {
        return this.elementState.dialog != '';
      },
      class: 'dialog',
      '@close': () => {
        const { dialog } = this.elementState;
        this.elementState.dialog = '';
      }
    })
  }
  get iconTemplate() {
    const button = this.defineElement(IconButton);
    return toElement(button)``({
      class: 'icon',
      icon: () => {
        const { dialog } = this.elementState;
        if (dialog != '') {
          return 'icons:close';
        }
        return 'icons:expand-more';
      },
      '@click': (event) => {
        const { dialog } = this.elementState;
        if (dialog != '') {
          this.elementState.dialog = '';
          return;
        }
        this.elementState.expanded = (
          !this.elementState.expanded
        );
      },
      close: () => this.elementState.dialog != '',
      expanded: () => this.elementState.expanded
    })
  }
  get elementTemplate() {
    const nav = this.defineElement(Nav);
    const panel = this.defineElement(Panel);
    return toElement('div')`
      <${nav} class="contents"></${nav}>
      <${panel} class="stretch panel grid inner"></${panel}>
      ${this.dialogGridTemplate}
      ${this.iconTemplate}
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
