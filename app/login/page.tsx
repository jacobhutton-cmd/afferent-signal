import Link from 'next/link';
import { SectionShell } from '@/components/section-shell';
import { AuthForm } from '@/components/auth/auth-form';
import { signInAction } from '@/lib/actions/auth';

async function signInFormState(_: { error?: string; success?: boolean; message?: string }, formData: FormData) {
  'use server';
  return signInAction(formData);
}

export default function LoginPage() {
  return (
    <SectionShell>
      <section className="space-y-4">
        <AuthForm
          action={signInFormState}
          title="Sign in"
          submitLabel="Continue"
          fields={[
            { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' }
          ]}
        />
        <p className="text-center text-sm">
          Need an account? <Link href="/signup" className="font-semibold text-brand-blue">Sign up</Link>
        </p>
      </section>
    </SectionShell>
  );
}
