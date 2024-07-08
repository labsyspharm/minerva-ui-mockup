import dialogCSS from 'dialog-css' assert { type: 'css' };
import { Form } from 'form';
import { Field } from 'field';
import { toElement } from 'elements';

class Dialog extends HTMLElement {

  static get _styleSheet() {
    return dialogCSS;
  }

  get elementTemplate() {
    const form = this.defineElement(Form);
    const field = this.defineElement(Field);
    return toElement(form)`
      <${field} label="First Name" value="Jane">hi</${field}>
      <${field} label="Last Name" value="Doe">hi</${field}>
      <${field} label="Email" value="jane.doe@example.com">hi</${field}>
    `(
      {}
    );
  }
}

export { Dialog }
