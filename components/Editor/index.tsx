import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type EditorProps = {
  value: string;
  onChange: (editor: any) => void,
};

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  )
}

export default Editor