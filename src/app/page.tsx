'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Redirect to home page
    window.location.href = '/home';
  }, []);
  
  return null;
}