import { toElement } from 'elements';
import { StyledNotice } from 'styled-notice';
import { NoticeContent } from 'notice-content';

class NoticeGrid extends HTMLElement {

  get elementTemplate() {
    const notice_element = this.defineElement(NoticeContent);
    const notice_title = () => {
      const { nav_config, notice } = this.elementState;
      const config = nav_config.get(notice) || {};
      return config.notice;
    }
    return toElement(this.defineElement(StyledNotice))`
      <span>${notice_title}</span>
      <${notice_element}></${notice_element}>
    `({
      open: () => {
        return this.elementState.notice != '';
      },
      class: 'notice',
      '@close': () => {
        const { notice } = this.elementState;
        this.elementState.notice = '';
      }
    })
  }
}

export { NoticeGrid }
