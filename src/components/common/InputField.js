import React from 'react';

const InputField = ({ input, label, meta: { error, touched } }) => {
  const errorText = touched && error && <small className="form-text text-muted">{error}</small>;

  return (
    <div className="form-group">
      <label>{ label }</label>
      <input type="text" className="form-control" {...input} />
      { errorText }
    </div>
  )
};

export default InputField;

