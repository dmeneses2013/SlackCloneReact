// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';
import SignupAvatars from '../SignupAvatars';
import './index.scss';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: "https://f4.bcbits.com/img/a0069281785_10.jpg",
    };
  }

  handleSubmit = (data) => {
    data.image = this.state.image;
    this.props.onSubmit(data);
  }

  addAvatar = url => {
    this.setState({image: url})
}

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="login-form">
        <SignupAvatars onClick={this.addAvatar} />
      <form
        className={"card"}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create an account</h3>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="Email"
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
          className="form-control"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Submitting...' : 'Sign up'}
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <Link to="/login" className="btn btn-block btn-secondary">
          Login to your account
        </Link>
      </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if  (values.username.length > 18) {
    errors.username = 'Must be less than 18 characters';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
