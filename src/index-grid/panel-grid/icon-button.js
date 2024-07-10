import iconButtonCSS from 'icon-button-css' assert { type: 'css' };
import { SimpleIconButtonLite } from 'simple-icon-button-lite';

class IconButton extends SimpleIconButtonLite {
  static get _styleSheet() {
    return iconButtonCSS;
  }
}

export { IconButton }
