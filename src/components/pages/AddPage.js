import React, {Component}   from 'react';
import {connect}            from 'react-redux';
import AddForm              from './../links/AddForm';
import {actions as linkActions} from './../../ducks/links';

class AddPage extends Component {
  handleSubmit = (values) => {
    const {addLink} = this.props;
    const {url, name} = values;

    if (addLink){
      addLink(url, name);
    }
  };

  render() {
    return (
      <div className="b-form">
        <AddForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default connect(null, {...linkActions})(AddPage);