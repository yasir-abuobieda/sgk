import { redirect } from 'next/navigation';

export default function RegisterPage({ params }: { params: { locale: string } }) {
  // We now use a Modal for registration, so this route redirects to home.
  redirect(`/${params.locale}`);
}
