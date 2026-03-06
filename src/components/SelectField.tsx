import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type InputFieldState = 'default' | 'focus' | 'filled' | 'error' | 'disabled'

export interface SelectFieldProps {
  label?: string
  errorMsg?: string
  size?: 'default' | 'sm'
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  disabled?: boolean
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  className?: string
}

const containerStyles: Record<InputFieldState, string> = {
  default: 'bg-white border-caars-neutral-grey-4',
  focus: 'bg-caars-primary-4 border-caars-primary-1',
  filled: 'bg-white border-caars-neutral-grey-4',
  error: 'bg-caars-error-2 border-caars-error-1',
  disabled: 'bg-caars-neutral-grey-3 border-caars-neutral-grey-4',
}

const labelBgStyles: Record<InputFieldState, string> = {
  default: 'bg-white',
  focus: 'bg-caars-primary-4',
  filled: 'bg-white',
  error: 'bg-caars-error-2',
  disabled: 'bg-caars-neutral-grey-3',
}

const labelColorStyles: Record<InputFieldState, string> = {
  default: 'text-caars-neutral-grey-6',
  focus: 'text-caars-primary-1',
  filled: 'text-caars-neutral-grey-6',
  error: 'text-caars-error-1',
  disabled: 'text-caars-neutral-grey-6',
}

const inputColorStyles: Record<InputFieldState, string> = {
  default: 'text-caars-neutral-grey-6 placeholder:text-caars-neutral-grey-6',
  focus: 'text-caars-primary-1 placeholder:text-caars-primary-1',
  filled: 'text-caars-neutral-black placeholder:text-caars-neutral-grey-6',
  error: 'text-caars-error-1 placeholder:text-caars-error-1',
  disabled: 'text-caars-neutral-grey-6 placeholder:text-caars-neutral-grey-6',
}

export function SelectField({
  label,
  errorMsg,
  size = 'default',
  prefix,
  className,
  disabled,
  value,
  onValueChange,
  placeholder,
  open,
  onOpenChange,
  children,
}: SelectFieldProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isOpen = open !== undefined ? open : internalOpen

  const hasError = !!errorMsg
  const hasValue = !!value

  const state: InputFieldState = disabled
    ? 'disabled'
    : hasError
      ? 'error'
      : isOpen
        ? 'focus'
        : hasValue
          ? 'filled'
          : 'default'

  const handleOpenChange = (next: boolean) => {
    setInternalOpen(next)
    onOpenChange?.(next)
  }

  const height = size === 'sm' ? 'h-12' : 'h-[52px]'
  const isLabelFloating = state !== 'default'
  const hasErrorState = state === 'error'

  return (
    <div
      className={cn(
        'relative flex flex-col items-start w-full',
        hasErrorState && 'gap-1',
        className,
      )}
    >
      <Select
        value={value}
        onValueChange={onValueChange}
        open={isOpen}
        onOpenChange={handleOpenChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'relative border flex gap-2 items-center w-full px-4 rounded-lg transition-colors duration-150 focus:ring-0 focus:outline-none',
            height,
            containerStyles[state],
          )}
        >
          {label && isLabelFloating && (
            <span
              className={cn(
                'absolute -top-2.5 left-3 px-1 rounded text-sm leading-normal whitespace-nowrap pointer-events-none',
                labelBgStyles[state],
                labelColorStyles[state],
              )}
            >
              {label}
            </span>
          )}
          {prefix && (
            <span className={cn('shrink-0', labelColorStyles[state])}>
              {prefix}
            </span>
          )}
          <SelectValue
            placeholder={placeholder ?? label}
            className={cn(
              'flex-1 text-left text-base font-normal leading-normal',
              inputColorStyles[state],
            )}
          />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      {hasErrorState && errorMsg && (
        <p className="text-sm text-caars-error-1 leading-normal">{errorMsg}</p>
      )}
    </div>
  )
}
