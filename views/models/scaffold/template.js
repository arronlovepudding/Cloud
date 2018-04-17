const formItemEnum = {
  text: '1',
  img: '2',
  currency: '3',
  mulText: '4'
}
const defaultFileType = formItemEnum.text

class FormTemplate {
  static fileTypes = [{
    label: '文本',
    value: formItemEnum.text
  }, {
    label: '多行文本',
    value: formItemEnum.mulText
  }, {
    label: '图片',
    value: formItemEnum.img
  }, {
    label: '金额',
    value: formItemEnum.currency
  }]

  static formItemTemplate = {
    [formItemEnum.text]: {
      tag: 'el-input'
    },
    [formItemEnum.img]: {
      tag: 's-upload'
    },
    [formItemEnum.currency]: {
      tag: 'el-input',
      attrs: ['v-decimal-max-value']
    },
    [formItemEnum.mulText]: {
      tag: 'el-input',
      attrs: [`type="textarea"`, `:autosize="{ minRows: 2, maxRows: 4}"`]
    }
  }

  static stdTemplate ({name = ''} = {}) {
    return {
      name,
      zhName: '',
      type: defaultFileType
    }
  }
}

export default FormTemplate
