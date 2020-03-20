import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';


class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
}

//Alternative for const {errors} = this.props.errors
componentWillReceiveProps(nextProps){
  if(nextProps.errors){
    this.setState({errors: nextProps.errors})
  }
}

    render() {
      const {errors} = this.state;
      const {user} = this.props.auth;
        return (
            <div className="register">
              {user? user.name : null}
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">                    
                      <input 
                        type="text" 
                        className={classnames("form-control form-control-lg", {
                          'is-invalid': errors.name
                        })}
                        placeholder="Name" 
                        name="name" required
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
        
        
                    <div className="form-group">
                      <input 
                      type="email" 
                      className={classnames("form-control form-control-lg", {
                          'is-invalid': errors.email
                        })}
                        placeholder="Email Address" 
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    


                    <div className="form-group">
                      <input type="password" 
                      className={classnames("form-control form-control-lg", {
                          'is-invalid': errors.password
                      })}
                      placeholder="Password" 
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange} />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>
                    


                    <div className="form-group">
                      <input 
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.password2
                      })}
                      placeholder="Confirm Password" 
                      name="password2" 
                      value={this.state.password2}
                      onChange={this.onChange}/>
                      {errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                      )}
                    </div>
                    



                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

//Here we are making clear that to load the Register Component in the UI we will need 'registerUser' function & 'auth' object
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}


//Connecting the UI to the store to get the data back from store & display in UI like the username etc
const mapStateToProps = (state) => ({
  //Bringing the state down & attatching to the component.
  //this.props.auth will have the user data
  auth: state.auth,
  errors: state.errors
})


//Connecting Register component to talk to the actions
//Register Component now knows what to do to get something into the UI & to get something out of the UI(store)
export default connect(mapStateToProps, {registerUser})(withRouter(Register));