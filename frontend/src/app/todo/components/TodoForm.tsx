import { FormEvent, useEffect, useState } from 'react';

export type TodoFormProps<T = Record<string, unknown>> = {
  defaultValues?: T;
  onSubmit: (values: T) => void;
}

export const TodoForm = <T = Record<string, unknown>>(props: TodoFormProps<T>) => {
  const { defaultValues, onSubmit } = props;

  const [formData, setFormData] = useState<T>();

  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  const onFormDataChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return <form style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }} onSubmit={onFormSubmit}>
    <label htmlFor="title">Title*</label>
    <input style={{ height: '1.5rem' }} id="title" type="text"
           onChange={(e) => onFormDataChange('title', e.target.value)} />
    <label htmlFor="description">Description</label>
    <input style={{ height: '1.5rem' }} id="description" type="text"
           onChange={(e) => onFormDataChange('description', e.target.value)} />
    <button style={{ height: '1.8rem', marginTop: '0.85rem' }} type="submit">Submit</button>
  </form>;
};