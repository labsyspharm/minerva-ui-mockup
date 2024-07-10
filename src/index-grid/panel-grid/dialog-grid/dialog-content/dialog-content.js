import dialogContentCSS from 'dialog-content-css' assert { type: 'css' };
import { Form } from 'form';
import { Field } from 'field';
import { toElement } from 'elements';

class DialogContent extends HTMLElement {

  static get _styleSheet() {
    return dialogContentCSS;
  }

  get elementTemplate() {
    const form = this.defineElement(Form);
    const field = this.defineElement(Field);
    return toElement(form)`
      ${() => this.fieldTemplate}
    `(
      {}
    );
  }

  get fieldTemplate() {
    const form = this.defineElement(Form);
    const field = this.defineElement(Field);
    const { nav_config, dialog } = this.elementState;
    const config = nav_config.get(dialog) || {};
    if (!('fields' in config)) {
      return '';
    }
    const fields = config.fields.map((x) => {
      return toElement(field)``({
        label: x.label, value: x.placeholder || ''
      })
    })
    return toElement(form)`${() => fields}`(
      {}
    );
  }
}

export { DialogContent }
