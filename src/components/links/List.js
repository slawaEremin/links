
import React        from 'react';
import {connect}    from 'react-redux';
import {actions as listActions} from './../../ducks/links';
import Item         from './Item';

class List extends React.Component {

  handleDelete(id) {
    const {removeLink} = this.props;
    removeLink && removeLink(id);
  }

  handleVoteUp(id) {
    const {votesUp} = this.props;
    votesUp && votesUp(id);
  }

  handleVoteDown(id) {
    const {votesDown} = this.props;
    votesDown && votesDown(id);
  }

  render(){
    const { links } = this.props;
    const items = links.items;

    return (
      <table className="table">
        <tbody>

        {  Object.keys(items).map(id => {
          const link = items[id];

          return (
            <tr key={id}>
              <Item
                {...link}
                onDelete={ this.handleDelete.bind(this, id) }
                onVoteUp={ this.handleVoteUp.bind(this, id) }
                onVoteDown={ this.handleVoteDown.bind(this, id) }
              />
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

export default connect(state => ({
  links: state.links
}), { ...listActions })(List);