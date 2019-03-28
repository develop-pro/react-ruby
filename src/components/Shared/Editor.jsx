import CKEditor from "react-ckeditor-component";
import React, {Component} from 'react';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.value
    }
  }

  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }

  render() {
    return (<CKEditor activeClass="p10" content={this.state.content} events={{
      "blur": this.onBlur,
      "afterPaste": this.afterPaste,
      "change": this.props.onChange
    }}/>)
  }
}
