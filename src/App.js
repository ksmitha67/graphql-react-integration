import React, {Component} from "react";
import { GraphQLEditor } from 'graphql-editor';
import FileSaver from 'file-saver';

// import { render } from "react-dom";

const types = {
  name: `
      type Query{
          names: [Smita]
      }
  `,
  nameLibrary: `
      type Smita{
          name: String;
      }
  `,
};

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      schema : {
        code: types.name,
        libraries: types.nameLibrary
      }
    }
    this.myRef = React.createRef();
  }

  resetEditor(){
    this.setState({
      schema : {
        code: '',
        libraries: ''
      }
    })
   
}

loadExisting(){
    this.myRef.current.click();
}

commitGraph(){
    var file = new File([this.state.schema.code], "hello world.graphqls", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);

}

handleData(e){
    const data = e.target.result;
    console.log("file data", data);
    this.setState({
      schema : {
        code: data,
        libraries: ''
      }
    })
}

handleChange(file){
    let fileContent = new FileReader();
    fileContent.onloadend  = (e)=>this.handleData(e);
    console.log(fileContent);
    fileContent.readAsText(file);

}


  render() {
    return (
      <div className='main'>
            <div className='buttons'>
                <button onClick={()=>this.resetEditor()}>Create New Graph</button>
                <button onClick={()=>this.loadExisting()}>Load Existing</button>
                <button onClick={()=>this.commitGraph()}>Commit graph</button>
                <input type="file" 
                    style={{display:"none"}}
                    ref = {this.myRef}v
                    onChange = {
                        (e)=> this.handleChange(e.target.files[0])
                    } 
                />
            </div>
            <div className='editor'>
        <GraphQLEditor
            onSchemaChange={(props) => 
                {
                this.setState({
                   props
                })
                // console.log(props)
              }
            }
            schema={this.state.schema}
        />
        </div>
        </div>
    )
  }
}


export default App;
