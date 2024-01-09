import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';

export default function Home() {
	return (
    <div>{Cookies.get('ghUsername') ? 'Hello, ' + Cookies.get('ghUsername') : 'You need to log in'}</div>
  )
}