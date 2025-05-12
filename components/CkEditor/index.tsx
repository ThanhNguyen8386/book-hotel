'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dynamic from 'next/dynamic';

interface TextEditorFieldProps {
    value: string;
    name: string;
    label?: string;
    onChange: (name: string, value: string) => void;
    error?: boolean;
    helperText?: string;
}

 function TextEditorField({
    value,
    name,
    label = 'Nội dung',
    onChange,
    error = false,
    helperText,
}: TextEditorFieldProps) {
    return (
        <div className="w-full font-sans">
            {label && (
                <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-800">
                    {label}
                </label>
            )}

            <div
                className={`ck-editor-wrapper border transition duration-200 rounded-lg`}
            >
                <CKEditor
                    editor={ClassicEditor}
                    data={value || ""}
                    onChange={(_: any, editor: any) => {
                        const data = editor.getData();
                        onChange(name, data);
                    }}
                />
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{helperText || 'Vui lòng nhập nội dung hợp lệ'}</p>
            )}
        </div>
    );
}

export default dynamic(() => Promise.resolve(TextEditorField), { ssr: false });