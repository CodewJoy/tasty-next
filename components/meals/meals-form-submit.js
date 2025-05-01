'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  // React Server Components（RSC） 中提供的一個 Hook，只能在表單內部的按鈕或 UI 元件使用，用來監聽 Server Action 是否正在執行
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}
