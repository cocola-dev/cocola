import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Cocola - Register',
  description: 'Cocola • Register your account. ✨',
  keywords: ['register', 'cocola', 'Cocola - Register'],
}
const RegisterPage = () => {
  return ( 
    <RegisterForm />
  );
}
 
export default RegisterPage;