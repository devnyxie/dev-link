import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import texts from './texts.json';
function MD_view({ md, editor, setMd }) {
  let isEditorRequired = editor ? true : false;
  const [value, setValue] = useState('');
  useEffect(() => {
    if (!editor) {
      setValue(md);
    } else {
      setMd(value);
    }
  });

  return (
    <div>
      {isEditorRequired ? (
        <MDEditor
          value={value}
          onChange={setValue}
          hideToolbar={true}
          enableScroll={false}
          textareaProps={{
            placeholder: texts.md__new_team_placeholder,
          }}
          style={{
            minHeight: '400px',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      )}
    </div>
  );
}

export default MD_view;
