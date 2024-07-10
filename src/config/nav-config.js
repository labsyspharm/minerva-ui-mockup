const configure = (id) => {
  switch (id) {
    case 'EXPORT':
      return { 
        id, heading: 'Export',
        submit: 'Export',
        success: 'Exported Minerva Story',
        dialog: 'Export as Minerva Story',
        fields: [{
          label: 'Path of exported story'
        }]
      }
    case 'SAVEAS':
      return { 
        id, heading: 'Save As',
        submit: 'Save as a copy',
        success: 'Saved copy successfully',
        dialog: 'Save as an editable copy',
        fields: [{
          label: 'Path of new copy',
          placeholder: '/'
        }]
      }
    case 'SAVE':
      return { 
        id, heading: 'Save', notice: 'Saved',
        success: 'Saved successfully',
        timeout: 1000
      }
    case 'STORY':
      return { id, heading: 'Story' }
    case 'GROUP':
      return { id, heading: 'Channels' }
    case 'IMAGE':
      return { id, heading: 'Images' }
    case 'OVERLAY':
      return { id, heading: 'Overlays' }
    default:
      return { id }
  }
}

const nav_config = new Map([
  ["EXPORT",configure('EXPORT')],
  ["SAVEAS",configure('SAVEAS')],
  ["SAVE",configure('SAVE')],
  ["STORY",configure('STORY')],
  ["GROUP",configure('GROUP')],
  ["IMAGE",configure('IMAGE')],
  ["OVERLAY",configure('OVERLAY')]
]);

export { nav_config }
