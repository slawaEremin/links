import React from 'react';

const InputField = ({ input, label, meta: { error, touched } }) => {
  const errorText = touched && error && <div className="b-input__error">{error}</div>;

  return (
    <div className="b-input">
      <label className="b-input__label">
        {label}
      </label>
      <input type="text" {...input} className="b-input__ctrl"/>
      { errorText }
    </div>
  )
};

export default InputField;