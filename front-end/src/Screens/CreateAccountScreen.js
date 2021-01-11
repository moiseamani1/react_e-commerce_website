import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createAccount, login } from '../Actions/userActions';
import { Message, Button, Icon } from 'semantic-ui-react';
import { auth, googleprovider, fbprovider } from '../frontFirebase';

function CreateAccountScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //TODO finish password verification
    const [confirmPassword, setConfirmPassword] = useState('');
    const [provider, setProvider] = useState('');

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const userCreateAccount = useSelector(state => state.userCreateAccount);
    const { userInfo, loading, error } = userCreateAccount;

    const userLogin = useSelector(state => state.userLogin);
    const { loading: userLoginLoading, userInfo: userLoginInfo, error: userLoginError } = userLogin;


    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();

        if (provider == 'email') {
            dispatch(createAccount(name, email, password));
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
        if (userInfo || userLoginInfo) {
            props.history.push(redirect)

        };
        return () => {
        }
    }, [props.history, redirect, userInfo, userLoginInfo]);








    return <div className="form form-section">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h1>Create Account</h1>
                </li>
                <li> {loading && <div>Loading...</div>}</li>
                <li> {error && <Message
                    negative
                    header={error}

                />
                }</li>

                <li>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
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
                <li>
                    <label htmlFor='confirmPassword'>
                        Confirm Password
                    </label>
                    <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </li>

                <li>
                    <button type="submit" onClick={() => setProvider('email')} class='ui grey button'>Create Account</button>
                </li>

                <li>Or Sign up with social media</li>
                <li>
                    <Button onClick={() => setProvider('google')} color='google plus'><Icon name='google plus' />Sign-up with Google</Button>
                </li>
                <li>
                    <Button onClick={() => setProvider('fb')} color='facebook'><Icon name='facebook' />Sign-up with Facebook</Button>
                </li>



                <li>Already have a  Pupson Bay account?<Link to={`/login?redirect=${redirect}`}>Log in</Link></li>
            </ul>

        </form> </div>

}

export default CreateAccountScreen;