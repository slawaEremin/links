import React        from 'react';
import {reduxForm}  from 'redux-form';
import InputField   from './../common/InputField';
import {Field}      from 'redux-form';

const AddForm = (props) => {
  const { handleSubmit, invalid, submitting } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field name="name" component={InputField} label="Name" />
        <Field name="url" component={InputField} label="Url" />

        <div className="b-addform__btn">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={invalid || submitting}>Submit</button>
        </div>
      </form>
    </div>
  )
};

const validate = (values) => {
  const error = {};

  if (!values.url) error.url = 'Url  is empty';
  if (!values.name) error.name = 'Name is empty';

  return error;
};

export default reduxForm({
  form: 'addLinkForm',
  validate
})(AddForm);