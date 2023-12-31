import React, { useContext } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProviders';
import Swal from 'sweetalert2';
const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const hendleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        hendleSignInUser(email, password);
    }
    const hendleSignInUser = (email, password) => {
        signInUser(email, password)
            .then(userCredential => {
                console.log(userCredential.user);
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Sign In!",
                    icon: "success"
                });
                navigate(from, { replace: true })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    return (
        <div className='my-10 mx-auto md:w-1/3'>
            <form onSubmit={hendleSubmit} className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput name='email' id="email1" type="email" placeholder="name@flowbite.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput name='password' id="password1" type="password" required />
                </div>
                <Button type="submit">Submit</Button>
            </form>
            <div className="flex items-center gap-2 mt-2">
                <Label htmlFor="remember">New to Doctor Management? <Link className='text-blue-600' to='/register'>Register</Link> </Label>
            </div>
        </div>
    );
};

export default Login;