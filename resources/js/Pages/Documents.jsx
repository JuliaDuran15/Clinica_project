import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function DocumentEditor(props) {
    const [document, setDocument] = useState(props.documents);

    const handleDocumentChange = (name) => (content) => {
        setDocument({
            ...document,
            [name]: content
        });
    };

    const handleSave = () => {
        Inertia.post('/documents', document);
    };

    return (
        <div className="document-editor">
            <h1>Editar Documentos</h1>
            <div className="editor-container">
                <ReactQuill 
                    theme="snow" 
                    value={document.encaminhamentos}
                    onChange={handleDocumentChange('encaminhamentos')}
                />
                <ReactQuill 
                    theme="snow" 
                    value={document.atestados}
                    onChange={handleDocumentChange('atestados')}
                />
            </div>
            <button onClick={handleSave}>Salvar Documentos</button>
        </div>
    );
}
