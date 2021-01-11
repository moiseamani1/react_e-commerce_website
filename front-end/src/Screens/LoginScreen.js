import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../Actions/userActions';

import { Message, Button, Icon } from 'semantic-ui-react';

import { auth, googleprovider, fbprovider } from '../frontFirebase';





function LoginScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [provider, setProvider] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';


    const submitHandler = (e) => {
        e.preventDefault();
        if (provider == 'email') {
            dispatch(login(email, password, provider));
        } else if (provider == 'google') {
            auth.signInWithPopup(googleprovider)
                .then((result => {
                    var token = result.credential.accessToken;
                    dispatch(login(email, password, provider, token));
                }));
        } else if (provider == 'fb') {
            auth.signInWithPopup(fbprovider)
                .then((result => {
                    var token = result.credential.accessToken;
                    dispatch(login(email, password, provider, token));


                }));

        }


    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);

        };
        return () => {
        }
    }, [props.history, redirect, userInfo]);

    const sendResetEmailHandler = (e) => {
        e.preventDefault();
    }

    return <div className="form-section">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h1>Login</h1>
                </li>
                <li> {loading && <div>Loading...</div>}</li>
                <li> {error && <Message negative header={error} />}</li>

                <li>
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li><Link to='/passwordReset' onClick={sendResetEmailHandler}>Forgot Password?</Link></li>

                <li>
                    <button onClick={() => setProvider('email')} class='ui grey button'>Login</button>
                </li>

                <li>Or Log in with social media</li>
                <li>
                    <Button onClick={() => setProvider('google')} color='google plus'><Icon name='google plus' />Login with Google</Button>
                </li>
                <li>
                    <Button onClick={() => setProvider('fb')} color='facebook'><Icon name='facebook' />Login with Facebook</Button>
                </li>

                <li>New to Pupson Bay?</li>
                <li><Link to={`/createAccount?redirect=${redirect}`} class='ui blue inverted button'>Create an account today</Link></li>
            </ul>

        </form> </div>

}

export default LoginScreen;