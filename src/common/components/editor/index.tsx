import './editor.scss'
import { Editor } from 'react-draft-wysiwyg'
import React, { FC, useState } from 'react'
import {EditorState, convertToRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type Props = {
  label?: string
  onChange: (value: string) => void
}

const EditorComponent: FC<Props> = ({label, onChange}: Props) => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
    debugger
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(
      rawContentState,
    )
    onChange(markup)
  }

  return (
    <>
      {
        label &&
          <p className={'p3'}>{label}</p>
      }
      <div className="editor__container">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          editorClassName="editor__input"
        />
      </div>
    </>
  )
}

export default EditorComponent
