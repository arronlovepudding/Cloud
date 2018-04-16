<template>
  <el-row class="full" :gutter="20">
    <!--left-->
    <el-col :span="12">
      <el-form label-width="100px">
        <el-form-item label="模型模板">
          <el-input v-model="modelStr"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="initTemplate">确定</el-button>
        </el-form-item>
        <el-row>
          <el-button @click="build">生成</el-button>
          <el-button @click="createModel">生成Model</el-button>
          <el-button @click="createTemplate">生成Template</el-button>
        </el-row>
        <template v-for="item in models">
          <el-row>
            <el-col :span="12">
              <el-form-item label="字段名">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-select class="fill-parent" v-model="item.type">
                  <el-option v-for="item in fileTypes"
                             :key="item.label"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中文名">
                <el-input v-model="item.zhName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <hr>
        </template>
      </el-form>
    </el-col>
    <!--right-->
    <el-col :span="12">
      <div ref="codeEdit" style="position:absolute; width: 50%;top:0;bottom:0;"></div>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
  @import 'index';
</style>
<script>
  import jsBeautify from 'js-beautify'

  export default {
    data () {
      const formItemEnum = {
        text: '1',
        img: '2',
        currency: '3'
      }
      return {
        formItemEnum,
        modelStr: '',
        models: [],
        fileTypes: [{
          label: '文本',
          value: formItemEnum.text
        }, {
          label: '图片',
          value: formItemEnum.img
        }, {
          label: '金额',
          value: formItemEnum.currency
        }],
        defaultFileType: formItemEnum.text,
        formItemTemplate: {
          [formItemEnum.text]: {
            tag: 'el-input'
          },
          [formItemEnum.img]: {
            tag: 's-upload'
          },
          [formItemEnum.currency]: {
            tag: 'el-input',
            attrs: ['v-decimal-max-value']
          }
        }
      }
    },
    components: {},
    created () {
    },
    mounted () {
      this.initEditor()
    },
    beforeDestroy () {
    },
    methods: {
      initEditor () {
        let editor = window.ace.edit(this.$refs.codeEdit)
        editor.$blockScrolling = Infinity
        editor.session.setMode('ace/mode/html')
        editor.setTheme('ace/theme/monokai')
        editor.getSession().on('change', () => {
          // this.form.content = editor.getValue()
        })
        this.editor = editor
      },
      createModel () {
        let model = this.models.map(item => {
          return `${item.name}:'', // ${item.zhName}`
        })
        let formData =
          `{
  ${model.join('\n')}
}`
        return formData
      },
      createTemplate () {
        // 创建标签
        const createInput = (item) => {
          const varName = 'formData'
          const tag = this.formItemTemplate[item.type].tag
          const attrs = this.formItemTemplate[item.type].attrs || ''
          return `<${tag} ${attrs} v-model="${varName}.${item.name}"></${tag}>`
        }
        // 处理model
        let model = this.models.map(item => {
          return `<el-form-item label="${item.zhName}">${createInput(item)}</el-form-item>`
        })
        let template = `<el-form>${model.join('\n')}</el-form>`
        return template
      },
      initTemplate () {
        let modelNames = this.modelStr.split(',')
        this.models = modelNames.map(item => {
          return {
            name: item,
            zhName: '',
            type: this.defaultFileType
          }
        })
      },
      build () {
        /* eslint-disable */
        let template = `${this.createTemplate()}
<script>
${this.createModel()}
<\/script>
`
        /* eslint-enable */
        let templateBeautify = jsBeautify.html(template, {
          'indent_size': 4,
          'indent_char': ' ',
          'indent_with_tabs': false,
          'eol': '\n',
          'end_with_newline': false,
          'indent_level': 0,
          'preserve_newlines': true,
          'max_preserve_newlines': 10,
          'space_in_paren': false,
          'space_in_empty_paren': false,
          'jslint_happy': false,
          'space_after_anon_function': false,
          'brace_style': 'collapse',
          'unindent_chained_methods': false,
          'break_chained_methods': false,
          'keep_array_indentation': false,
          'unescape_strings': false,
          'wrap_line_length': 0,
          'e4x': true,
          'comma_first': false,
          'operator_position': 'before-newline'
        })
        this.editor.setValue(templateBeautify)
      }
    },
    computed: {},
    watch: {}
  }
</script>
