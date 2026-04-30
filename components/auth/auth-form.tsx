'use client';

import { useActionState, useFormStatus } from 'react-dom';

type Field = { name: string; label: string; type?: string; placeholder?: string };
type State = { error?: string; success?: boolean; message?: string };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full rounded-2xl bg-gradient-to-r from-brand-blue to-brand-green px-4 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-60">
      {pending ? 'Saving...' : label}
    </button>
  );
}

export function AuthForm({ action, title, submitLabel, fields }: { action: (state: State, formData: FormData) => Promise<State>; title: string; submitLabel: string; fields: Field[]; }) {
  const [state, formAction] = useActionState(action, {} as State);
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <h1 className="text-xl font-bold">{title}</h1>
      <form action={formAction} className="mt-4 space-y-4">
        {fields.map((field) => (
          <label key={field.name} className="block space-y-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{field.label}</span>
            <input name={field.name} type={field.type ?? 'text'} placeholder={field.placeholder} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-blue dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
        ))}
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        {state?.message && <p className="text-sm text-emerald-600">{state.message}</p>}
        <SubmitButton label={submitLabel} />
      </form>
    </div>
  );
}
