import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Importing custom hooks
import { useToken } from '../auth/useToken';


export const SignUpPage = () => {
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useHistory();

    const onSignUpClicked = async () => {
        const response = await axios.post('/api/users/signup', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        // Sending user to home route
        history.push('/');

        return (
            <div className="content-container">
                <h1>Sign Up</h1>
                {errorMessage && <div className="fail">{errorMessage}</div>}

                <input
                    placeholder="someone@gmail.com"
                    type="text"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                />
                <input
                    placeholder="password"
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                />
                <input
                    placeholder=" Confirm password"
                    type="password"
                    value={confirmPasswordValue}
                    onChange={(e) => setConfirmPasswordValue(e.target.value)}
                />
                <hr />

                <button
                    disabled={!emailValue || !passwordValue ||
                        passwordValue !== confirmPasswordValue}
                    onClick={onSignUpClicked}
                >Sign Up</button>
                <button
                    onClick={() => history.push('/forgot-password')}
                >Forgot your password?</button>
                <button
                    onClick={() => history.push('/signup')}

                >Already have an account? Log in</button>
            </div >
        )
    }