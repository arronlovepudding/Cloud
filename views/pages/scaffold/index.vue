<template>
  <el-row class="full" :gutter="20">
    <!--left-->
    <el-col :span="12">
      <el-form label-width="100px">
        <el-form-item label="模型属性">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="模型属性字符串，使用英文逗号分隔，例如：name,age"
                    v-model="modelStr"></el-input>
        </el-form-item>
      </el-form>
      <!--功能区-->
      <el-row class="tools flex-row flex-item-center">
        <el-col :span="24">
          <el-button @click="initTemplate" size="mini"><i class="el-icon-edit"></i> 生成属性</el-button>
          <template v-if="haveModels">
            <el-button @click="addModels" size="mini"><i class="el-icon-plus"></i> 追加属性</el-button>
            <el-button @click="build" size="mini"><i class="el-icon-document"></i> 生成代码</el-button>
          </template>
        </el-col>
      </el-row>
      <!--动态属性-->
      <el-form class="mt-20" label-width="60px">
        <el-row class="attr-item flex-row"
                v-for="(item,index) in ins.models"
                :key="index">
          <!-- col-1 -->
          <el-col :span="11">
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
          <!-- col-2 -->
          <el-col :span="11">
            <el-form-item label="中文名">
              <el-input v-model="item.zhName"></el-input>
            </el-form-item>
          </el-col>
          <!-- col-3 -->
          <el-col :span="2" class="operate flex-col flex-item-center flex-content-center">
            <i class="el-icon-remove-outline" @click="removeItem(index)"></i>
          </el-col>
        </el-row>
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
  import CodeEditor from 'views/utils/code-editor'
  import CodeBeautify from 'views/utils/code-beautify'
  import FormTemplate from 'views/models/scaffold/template'
  import Scaffold from 'views/models/scaffold'

  export default {
    data () {
      let ins = new Scaffold()
      return {
        ins,
        modelStr: '',
        fileTypes: FormTemplate.fileTypes
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
        this.editor = CodeEditor.init(this.$refs.codeEdit, {mode: 'html'})
      },
      initTemplate () {
        const createModels = () => {
          this.ins.createModels(this.modelStr.split(','))
        }
        if (this.haveModels) {
          this.$confirm('已有模板，确定重新生成？', '提示', {
            type: 'warning',
            showClose: false
          }).then(() => {
            createModels()
          })
          return
        }
        createModels()
      },
      build () {
        let templateBeautify = CodeBeautify.html(this.ins.build())
        this.editor.setValue(templateBeautify)
      },
      removeItem (index) {
        this.$confirm('确定删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
          type: 'warning'
        }).then(() => {
          this.ins.removeItem(index)
        })
      },
      addModels () {
        this.ins.addItem()
      }
    },
    computed: {
      haveModels () {
        return this.ins.models.length > 0
      }
    },
    watch: {}
  }
</script>
