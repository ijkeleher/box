import React from 'react';
import axios from 'axios';

class UploadForm extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            selectedFile: null
        }
    }

    fileSelectedHandler = event => {
        //print out first element of file upload array
        console.log(event.target.files[0])
        this.setState({
            //store first element in state to be used in upload handler
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        //access firebase cloud function to upload files
        axios.post('https://us-central1-fb-cloud-functions-demo-a3b08.cloudfunctions.net/uploadFile', fd, {
            onUploadProgress: ProgressEvent => {
                console.log('Upload Progress ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%' )
            }
        })
        .then(res => {
            console.log(res)
        });

    }

    render() {
        return (

        <div>

        <input 
        style={{display: 'none'}}
        type="file" 
        name="myFile" 
        onChange={this.fileSelectedHandler}
        //create reference for SelectFile button
        ref={fileInput => this.fileInput = fileInput} />
        
        <button onClick={() => this.fileInput.click()}>Select File</button>
        <button onClick={this.fileUploadHandler}>Upload</button>

        </div>

    )};
}

export default UploadForm