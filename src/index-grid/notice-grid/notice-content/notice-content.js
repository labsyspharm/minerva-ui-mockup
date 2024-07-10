import noticeContentCSS from 'notice-content-css' assert { type: 'css' };
import { Form } from 'form';
import { Field } from 'field';
import { toElement } from 'elements';

class NoticeContent extends HTMLElement {

  static get _styleSheet() {
    return noticeContentCSS;
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
    const { nav_config, notice } = this.elementState;
    const config = nav_config.get(notice) || {};
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

export { NoticeContent }
