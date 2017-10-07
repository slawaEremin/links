import React from 'react';

const Item = (props) => {

  return (
    (
      <div className="b-item">
        <div
          className="b-item__up"
          onClick={props.onVoteUp}>
          Up
        </div>
        <div
          className="b-item__down"
          onClick={props.onVoteDown}>
          Down
        </div>

        <span className="b-item__votes">
          {props.votes}
        </span>

        <a
          target="_blank"
          href={props.url}
          className="b-item__name">
          {props.name}
        </a>

        <div
          className="b-item__delete"
          onClick={props.onDelete}>x</div>
      </div>
    )
  )
};

export default Item;