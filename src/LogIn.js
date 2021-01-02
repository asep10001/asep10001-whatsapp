import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase';
import './LogIn.css'

function LogIn() {

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => console.log(result)).catch(err=> alert(err.message))
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt=""/>

                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default LogIn
