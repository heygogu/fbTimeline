"use client"
import React, { useEffect } from 'react';
import Header from '@/components/layoutcomps/Header';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/in-progress');
  }, []);
  return <main></main>;
}
