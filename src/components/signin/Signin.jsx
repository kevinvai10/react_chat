import React from 'react';
//import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {signIn} from '../../utils/apicalls';
import 'tachyons';
//import { setLogin, setUser } from '../../redux/actions';

/*const mapStateToProps = state => {
    return {
        isLoggedIn: state.loginStatus,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (value) => dispatch(setLogin(value)),
        setuser: (value) => dispatch(setUser(value))
    }
}*/

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        const user = {
            email: this.state.signInEmail,
            password: this.state.signInPassword
        }
        signIn(user)
        .then(user => {
            debugger;
        if (user.id) {
            sessionStorage.setItem('user_id', user.id);
            this.props.login(user);
        }
    })
}

    render() {
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                    />
                    </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.onPasswordChange}
                    />
                </div>
                </fieldset>
                <div className="">
                    <input
                    onClick={this.onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"
                    />
                </div>
                <div className="lh-copy mt3">
                    <Link to ="/register" className="f6 link dim black db pointer">Register</Link>
                </div>
            </div>
            </main>
        </article>
    );
}
}

//export default connect(mapStateToProps, mapDispatchToProps)(Signin);
export default Signin;
