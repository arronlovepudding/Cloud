import jsBeautify from 'js-beautify'

class CodeBeautify {
  static html (template) {
    return jsBeautify.html(template, {
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
  }
}

export default CodeBeautify
