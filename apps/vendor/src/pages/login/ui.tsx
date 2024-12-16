import {
  Input,
  FormLabel,
  Form,
  FormField,
  FormItem,
  Text,
  FormControl,
  FormMessage,
  Button
} from '@/shared/ui'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateSession, useEmailpassLogin } from '@/entities/auth'
import { useLocation } from 'wouter'

const schema = z
  .object({
    email: z.string().email({
      message: 'Invalid email address.'
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    })
  })
  .strict()

const LoginPage = () => {
  const { mutateAsync: login } = useEmailpassLogin()
  const { mutateAsync: createSession } = useCreateSession()
  const [, navigate] = useLocation()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit({ email, password }: z.infer<typeof schema>) {
    const { token } = await login({
      email,
      password
    })

    await createSession({ token })

    navigate('/dashboard/orders')
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="min-w-[360px]">
        <div>
          <Text weight="plus" size="xlarge" className="text-center">
            Sign in
          </Text>
          <Text className="text-center mt-2">
            Welcome back! Please enter your details.
          </Text>
        </div>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-primary hover:underline">
                Create new one
              </a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
