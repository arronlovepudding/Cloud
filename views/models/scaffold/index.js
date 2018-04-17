import FormTemplate from './template'

class Scaffold {
  constructor () {
    this.models = []
  }

  createModels (modelNames = []) {
    this.models = modelNames.map(item => {
      return FormTemplate.stdTemplate({name: item})
    })
  }

  // 创建模型对象
  createModel () {
    let model = this.models.map(item => {
      return `${item.name}:'', // ${item.zhName}`
    })
    let formData =
      `{
  ${model.join('\n')}
}`
    return formData
  }

  // 创建标签
  createTemplate () {
    const createInput = (item) => {
      const varName = 'formData'
      const tag = FormTemplate.formItemTemplate[item.type].tag
      const attrs = (FormTemplate.formItemTemplate[item.type].attrs || []).join(' ')
      return `<${tag} ${attrs} v-model="${varName}.${item.name}"></${tag}>`
    }
    // 处理tag
    let tags = this.models.map(item => {
      return `<el-form-item label="${item.zhName}">${createInput(item)}</el-form-item>`
    })
    let template = `<el-form>${tags.join('\n')}</el-form>`
    return template
  }

  build () {
    /* eslint-disable */
    let template = `${this.createTemplate()}
<script>
export default {
  data () {
    return{
      formData:${this.createModel()}  
    }
  }
}
<\/script>
`
    /* eslint-enable */
    return template
  }

  addItem () {
    this.models.push(FormTemplate.stdTemplate())
  }

  removeItem (index) {
    this.models.splice(index, 1)
  }
}

export default Scaffold
