class CodeEditor {
  static init (el, {mode = 'json'} = {}) {
    let editor = window.ace.edit(el)
    editor.$blockScrolling = Infinity
    editor.session.setMode(`ace/mode/${mode}`)
    editor.setTheme('ace/theme/monokai')
    // editor.getSession().on('change', () => {
    //   this.form.content = editor.getValue()
    // })
    return editor
  }
}

export default CodeEditor
