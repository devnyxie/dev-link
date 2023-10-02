import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import texts from './texts.json';
function MD_view({ md, editor, setMd, team_placeholder, height }) {
  let isEditorRequired = editor ? true : false;
  useEffect(() => {
    if (!editor) {
    } else {
      setMd(md);
    }
  });

  return (
    <>
      {isEditorRequired ? (
        <MDEditor
          value={md}
          onChange={setMd}
          hideToolbar={true}
          visibleDragbar={false}
          enableScroll={false}
          textareaProps={{
            placeholder: team_placeholder ? texts.md__new_team_placeholder : '',
          }}
          style={{
            minHeight: '300px',
            height: '100%',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <MDEditor.Markdown source={md} style={{ whiteSpace: 'pre-wrap' }} />
      )}
    </>
  );
}

export default MD_view;
