import React from 'react';

const Item = (props) => {

  return (
    (
      <div className="b-item">
        <a
          className="btn btn-outline-success btn-sm"
          onClick={props.onVoteUp}>
          +
        </a>
        <a
          className="btn btn-outline-danger btn-sm"
          onClick={props.onVoteDown}>
          -
        </a>

        <span className="b-item__votes">
          {props.votes}
        </span>

        <a
          target="_blank"
          href={props.url}
          className="b-item__name">
          {props.name}
        </a>

        <a  className="close b-item__delete" onClick={props.onDelete}>
          <span aria-hidden="true">&times;</span>
        </a>
      </div>
    )
  )
};

export default Item;