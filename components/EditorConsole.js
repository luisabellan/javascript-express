import React, { Component } from 'react'

import { WebPlayer } from 'react-guidebook'

function countPlaygroundWidgets(code) {
  return (code.match(/console\.log/g) || []).length
}

function codeHeight(code) {
  const headerHeight = 40
  const footerHeight = 40
  const lineHeight = 20
  const padding = 4
  const visualSpacer = 20 // To make things look nicer
  const widgetHeight = 30
  const widgetsHeight = countPlaygroundWidgets(code) * widgetHeight
  const codeHeight = code.split('\n').length * lineHeight

  return (
    headerHeight +
    padding +
    codeHeight +
    widgetsHeight +
    visualSpacer +
    padding +
    footerHeight
  )
}

export default class EditorConsole extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    let { variant, panes = ['editor', 'player'], height, ...rest } = this.props

    const style = {
      ...(variant === 'slides'
        ? { flex: '1' }
        : {
            height: height
              ? `${height}px`
              : rest.code
                ? codeHeight(rest.code)
                : 400,
          }),
      flex: '1 1 0%',
      minWidth: '0',
      minHeight: '0',
    }

    if (rest.workspaces && rest.workspaces.length > 0) {
      panes = ['workspaces', ...panes]
    }

    return (
      <WebPlayer
        fullscreen={true}
        style={style}
        width={0}
        playground={{ enabled: true }}
        typescript={{ enabled: true }}
        workspaceCSS={variant === 'slides' ? slidesCSS : undefined}
        panes={panes}
        {...rest}
        title={undefined}
      />
    )
  }
}

const slidesCSS = `
.CodeMirror {
  background-color: rgb(250,250,250);
}

.CodeMirror-lines {
  padding-top: 20px;
  padding-bottom: 20px;
}

.cm-s-react {
  font-size: 18px;
  line-height: 26px;
}

.cm-s-react .CodeMirror-linenumber {
  display: none;
}

.cm-s-react .CodeMirror-gutters {
  background: rgb(250,250,250);
  padding-left: 12px;
  padding-right: 0px;
  border-left: 0px;
  border-right: 0px;
}
`
