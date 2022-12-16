import { AuthLayout } from '@components/layout/auth-layout';
import Navbar from '../components/landing_page/NavBar';
import Hero from '../components/landing_page/Hero';
import type { ReactElement, ReactNode } from 'react';

export default function Login(): JSX.Element {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
    </div>
  );
}

Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);
