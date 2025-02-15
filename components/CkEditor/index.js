import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class App extends Component {
    render() {
        return (
            <div className="App">
                <CKEditor
                    editor={ClassicEditor}
                    data={this.props?.getDesc()}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        this.props.parentCallBack(data)
                    }}
                />
            </div>
        );
    }
}

export default App;
