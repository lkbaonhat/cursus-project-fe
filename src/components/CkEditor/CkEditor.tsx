import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

interface MyCKEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ResizableContainer = styled.div`
  resize: vertical; /* Chỉ cho phép kéo thay đổi chiều cao */
  overflow: auto;
  min-height: 150px;
  max-height: 500px;
  .ck-editor__editable_inline {
    min-height: 150px; /* Đảm bảo CKEditor chiếm toàn bộ chiều cao của div */
  }
`;

const MyCKEditor: React.FC<MyCKEditorProps> = ({ value = '', onChange }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const internalDataRef = useRef(value); // Lưu trữ giá trị nội bộ của CKEditor để tránh cập nhật liên tục

  useEffect(() => {
    // Chỉ cập nhật nếu giá trị bên ngoài thực sự thay đổi
    if (value !== internalDataRef.current) {
      internalDataRef.current = value;
      if (editorRef.current) {
        editorRef.current.setData(value);
      }
    }
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    internalDataRef.current = data.toString(); // Cập nhật giá trị nội bộ
    if (onChange) onChange(data); // Truyền giá trị lên component cha
  };

  return (
    <ResizableContainer>
      <CKEditor
        editor={ClassicEditor}
        data={internalDataRef.current} // Sử dụng giá trị nội bộ để tránh mất focus
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={handleEditorChange}
        config={{
          toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'insertTable',
            'blockQuote',
            '|',
            'bulletedList',
            'numberedList',
            'outdent',
            'indent',
          ],
        }}
      />
    </ResizableContainer>
  );
};

export default MyCKEditor;
