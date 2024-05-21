import React from 'react';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-react-documenteditor';

DocumentEditorContainer.Inject(Toolbar);

function DocumentEditor() {
    return (
        <div>
            <DocumentEditorContainer enableToolbar={true} height="600px" />
        </div>
    );
}

export default DocumentEditor;
