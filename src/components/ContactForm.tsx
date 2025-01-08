import { useForm } from 'react-hook-form';
import "./style.css";

type FormValues = {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    await fetch('https://members.form.newt.so/v1/6ukQ9Wty_', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
  })

  

  return (
    <div>
      <h1>Contact us</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
          aria-describedby="error-name-required"
        />
        {errors?.name && (
          <span id="error-name-required" aria-live="assertive">
            {errors.name.message}
          </span>
        )}
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        <label htmlFor="message">Message</label>
        <textarea id="message" {...register('message')}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
