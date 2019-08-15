import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
        selectedFile: null,
        renderUploadButton: false
    }
}

  fileSelectedHandler = event => {
    //print out first element of file upload array
    console.log(event.target.files[0])
    this.setState({
        //store first element in state to be used in upload handler
        selectedFile: event.target.files[0],
        renderUploadButton: true
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
        
        this.setState(({selectedFile: null, renderUploadButton: false, uploadSuccessful: true})
        );

    });
}

handlePreview = () => {
  console.log(this.state.selectedFile)
  }

  render() {


    var filePreviewName;
    var filePreviewSize;

    if(this.state.selectedFile !== null) {
      filePreviewName = <p>{this.state.selectedFile.name}</p>
      filePreviewSize = <p>{Math.round((this.state.selectedFile.size)/1024)} kB</p>

    }

    if(this.state.renderUploadButton === true){
      var uploadButton = <button onClick={this.fileUploadHandler}>Upload</button>
    }

    if(this.state.uploadSuccessful === true){
      var uploadSuccess = <p>Upload Successful!</p>
    }

    return (

      <div className="App">
      <header className = "header">
        <h1>qkshare</h1>
        <p>upload | share | download</p>
      </header>
        <div className = "body">

        <input 
    style={{display: 'none'}}
    type="file" 
    name="myFile" 
    onChange={this.fileSelectedHandler}
    //create reference for SelectFile button
    ref={fileInput => this.fileInput = fileInput} />
    
    <button onClick={() => this.fileInput.click()}>Select File</button>



      {filePreviewName}
      {filePreviewSize}
 
      {uploadButton}
      {uploadSuccess}

      </div>
            </div>
    );
  }
}

export default App;
