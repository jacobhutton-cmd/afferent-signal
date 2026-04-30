import Link from 'next/link';
import { SectionShell } from '@/components/section-shell';
import { AuthForm } from '@/components/auth/auth-form';
import { signUpAction } from '@/lib/actions/auth';

async function signUpFormState(_: { error?: string; success?: boolean; message?: string }, formData: FormData) {
  'use server';
  return signUpAction(formData);
}

export default function SignupPage() {
  return (
    <SectionShell>
      <section className="space-y-4">
        <AuthForm
          action={signUpFormState}
          title="Create your account"
          submitLabel="Create account"
          fields={[
            { name: 'firstName', label: 'First name', placeholder: 'Jacob' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { name: 'zipCode', label: 'ZIP code', placeholder: '04055' },
            { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' }
          ]}
        />
        <p className="text-center text-sm">
          Already have an account? <Link href="/login" className="font-semibold text-brand-blue">Sign in</Link>
        </p>
      </section>
    </SectionShell>
  );
}
