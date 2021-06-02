import React from 'react';
import { useRouter } from 'next/router';

const Login = () => {

	const router = useRouter();

	const handleLoginClick = () => {
		router.replace('/home');
	};

	return (
		<div className="bg-gray-200 h-screen font-sans">
			<div className="container mx-auto h-full flex justify-center items-center">
				<div className="w-1/3">

					<div className="flex items-center justify-center mb-6">
						<img className="w-1/2" src="/img/logo.png" />
					</div>

					<div className="border-green-400 p-8 border-t-4 bg-white mb-6 rounded-lg shadow-lg">
						<div className="mb-4">
							<label className="font-bold text-grey-darker block mb-2">Username or Email</label>
							<input className="block appearance-none w-full bg-white border border-grey-light hover:border-green-400 focus:ring-2 focus:ring-green-400 px-2 py-2 rounded shadow" type="text" placeholder="Username" />
						</div>
						<div className="mb-4">
							<label className="font-bold text-grey-darker block mb-2">Password</label>
							<input className="block appearance-none w-full bg-white border border-grey-light hover:border-green-400 px-2 py-2 rounded shadow" type="text" placeholder="Password" />
						</div>
						<div className="flex items-center justify-between">
							<button className="bg-green-400 focus:border focus:border-solid focus:border-green-200 text-white font-bold py-2 px-4 rounded" onClick={handleLoginClick}>
								Sign in
							</button>
							<a className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" href="#">Forgot Password?</a>
						</div>
					</div>

					<div className="text-center">
						<p className="text-grey-dark text-sm">Don't have an account? <a href="#">Sign up</a></p>
					</div>

				</div>
			</div>
		</div>
	)
};

export default Login;