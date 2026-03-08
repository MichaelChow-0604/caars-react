import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router'
import { CInput } from '@/components/caars-ui/CInput'
import CButton from '@/components/caars-ui/CButton'
import { IconEye, IconEyeClose } from '@/lib/icon'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>

function MasterLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      aria-hidden
    >
      <img
        alt="CAARS"
        className="h-full w-full object-contain"
        src={"/logo.png"}
      />
    </div>
  )
}

const MOCK_LOGIN_RESPONSE = {
  user_id: 1,
  username: 'Dr. Jane Doe',
  role: 'General Practitioner',
} as const

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const setUser = useUserStore((s) => s.setUser)
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const handleLogin = () => {
    login('mock-access-token')
    setUser(MOCK_LOGIN_RESPONSE)
    navigate('/calendar')
  }

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-caars-neutral-grey-2">
      <div className="flex flex-col items-center gap-8">
        <MasterLogo className="h-[43px] w-[189px]" />
        <div className="flex w-[500px] flex-col gap-8 rounded-2xl border border-caars-neutral-grey-4 bg-caars-neutral-white p-10">
          <h1 className="font-caars-header text-caars-h3 font-semibold leading-caars-h3 text-center text-[#202020]">
            GP Login
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <CInput
                  label="Username"
                  placeholder="Username"
                  errorMsg={errors.username?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  errorMsg={errors.password?.message}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="shrink-0 text-caars-neutral-grey-6 hover:text-caars-neutral-black transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <IconEyeClose className="size-6" />
                      ) : (
                        <IconEye className="size-6" />
                      )}
                    </button>
                  }
                  {...field}
                />
              )}
            />
            <CButton type="submit" size="lg" className="w-full">
              Login
            </CButton>
          </form>
        </div>
      </div>
    </div>
  )
}
