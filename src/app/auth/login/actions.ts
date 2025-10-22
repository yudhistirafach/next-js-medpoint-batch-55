'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { APP_DASHBOARD } from '@/constants';

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      success: false,
      error: 'Email dan password tidak boleh kosong',
    };
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      success: false,
      error: 'Kesalahan format dalam input',
    };
  }

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return {
      success: false,
      error: 'Email dan password tidak boleh kosong',
    };
  }

  const credentials = {
    email: trimmedEmail,
    password: trimmedPassword,
  };

  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath(APP_DASHBOARD, 'layout');
  redirect(APP_DASHBOARD);
}
