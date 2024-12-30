"use client"
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'

export default function LanguageToggle() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter();
  const localActive = useLocale()

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    startTransition(() => {
      router.push(`/${locale}/quiz-home`);
    });
  }
  return (
    <label className='border-2 rounded'>
        <p className='sr-only'>Change Language</p>
        <select defaultValue={localActive} className='bg-transparent py-2' onChange={onSelectChange}>
            <option value={"en"}>English</option>
            <option value={"ar"}>Arabic</option>
        </select>
    </label>
  )
}
 