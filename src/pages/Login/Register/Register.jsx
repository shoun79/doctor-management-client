import React, { useContext } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProviders';
import Swal from 'sweetalert2';

const Register = () => {
    const { registerUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const hendleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const repeatPassword = form.repeatPassword.value;
        registerUser(email, password)
            .then(userCredential => {
                hendleUpdateUser(name, photo)
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Sign Up!",
                    icon: "success"
                });
                console.log(userCredential.user);
                navigate('/')
            })
            .catch((err) => {
                console.log(err.message);
            });
        //hendleRegisterUser(email, password)

        console.log(name, email, password, repeatPassword, photo);
    }

    // const hendleRegisterUser = (email, password) => {

    // }

    const hendleUpdateUser = (name, photo) => {
        const profile = {
            displayName: name, photoURL: photo
        }
        updateUser(profile)
            .then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                console.log(error);
                // An error occurred
                // ...
            });
    }
    return (
        <div className='my-10 mx-auto md:w-1/3'>
            <form onSubmit={hendleSubmit} className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Name" />
                    </div>
                    <TextInput name='name' id="name" type="text" placeholder="Your Name" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput name='email' id="email2" type="email" placeholder="name@flowbite.com" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="photo" value="Photo URL" />
                    </div>
                    <TextInput name='photo' id="PhotoURL" type="text" placeholder="Photo URL" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput name='password' id="password2" type="password" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <TextInput name='repeatPassword' id="repeat-password" type="password" required shadow />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree" className="flex">
                        I agree with the&nbsp;
                        <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </Link>
                    </Label>
                </div>
                <Button type="submit">Register new account</Button>
            </form>
            <div className="flex items-center gap-2 mt-2">
                <Label htmlFor="remember">Already have an account? <Link className='text-blue-600' to='/login'>Login</Link> </Label>
            </div>
        </div>
    );
};

export default Register;