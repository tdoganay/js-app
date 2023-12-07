import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
 
export default function Signup({onSignup}) {
 
    // States for registration
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);
 
    // Handling the name change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };
 
    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
 
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
 
    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);

            try {
                fetch("http://localhost:3500/create-user", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: username,email: email,password: password })
                    })
                    .then(response => response.json())
                    .then(data => {
                        const username = data.username;
                        const email = data.email;
                        if (data.userStatus == 'invalid') {
                            setError(true);
                        } else {
                            setSuccess(true);
                            onSignup({username, email});
                        }
                    });
            } catch (err) {
                setError(true);
            }
        }
    };
 
    // Showing success message
    const successRedirect = () => {
        if (success) {
            return redirect('/');
        }
    };
 
    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };
 
    return (
        <div>
            <div className="messages">
                {errorMessage()}
            </div>

            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
              </div>

              <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="" onSubmit={handleSubmit}>
                  <div>
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div class="mt-2">
                      <input id="username" name="username" type="text" onChange={(e) => setUsername(e.target.value)} autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                      <input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between">
                      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                      <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                  <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                  </div>
                </form>

                <p class="mt-10 text-center text-sm text-gray-500">
                  Already a user?&nbsp;
                  <Link to="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log in</Link>
                </p>
              </div>
            </div>
        </div>
    );
}