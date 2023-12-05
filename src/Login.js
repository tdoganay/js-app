import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
 
export default function Login() {
 
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);
 
 
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
        if (email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);

            try {
                fetch("http://localhost:3500/login-user", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email,password: password })
                    })
                    .then(response => response.json())
                    .then(data => console.log(data));
                console.log("success");
                setSuccess(true);
            } catch (err) {
                setError(true);
            }
        }
    };
 
    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>Welcome!</h1>
            </div>
        );
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
        <div className="form">
            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
 
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
              </div>

              <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                      <input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between">
                      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                      <div class="text-sm">
                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                      </div>
                    </div>
                    <div class="mt-2">
                      <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                  <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                  </div>
                </form>

                <p class="mt-10 text-center text-sm text-gray-500">
                  Not a user?&nbsp;
                  <Link to="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</Link>
                </p>
              </div>
            </div>
        </div>
    );
}