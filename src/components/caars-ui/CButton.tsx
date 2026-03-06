import React from 'react'
import { cn } from '@/lib/utils'
import { Slot } from 'radix-ui'

export type CButtonVariant =
  | 'solid'
  | 'outline-black'
  | 'outline-color'
  | 'text-color'
  | 'text-black'

export type CButtonSize = 'lg' | 'md' | 'sm'

export interface CButtonProps extends Omit<React.ComponentProps<'button'>, 'prefix'> {
  variant?: CButtonVariant
  size?: CButtonSize
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  asChild?: boolean
}

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-lg whitespace-nowrap font-semibold font-[family-name:var(--caars-font-header)] leading-[1.4] transition-colors duration-150 cursor-pointer disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-caars-primary-1/40'

const VARIANT_CLASSES: Record<CButtonVariant, string> = {
  solid: [
    'bg-caars-primary-1 text-caars-neutral-white',
    'hover:bg-[#ef4100]',
    'disabled:bg-caars-neutral-grey-5',
  ].join(' '),
  'outline-black': [
    'bg-caars-neutral-white border-2 border-caars-neutral-grey-4 text-caars-neutral-black',
    'hover:border-caars-primary-1 hover:text-caars-primary-1',
    'disabled:bg-caars-neutral-grey-3 disabled:border-caars-neutral-grey-4 disabled:text-caars-neutral-grey-5',
  ].join(' '),
  'outline-color': [
    'bg-caars-neutral-white border-2 border-caars-neutral-grey-4 text-caars-primary-1',
    'hover:border-caars-primary-1',
    'disabled:bg-caars-neutral-grey-3 disabled:border-caars-neutral-grey-4 disabled:text-caars-neutral-grey-5',
  ].join(' '),
  'text-color': [
    'text-caars-primary-1',
    'hover:text-[#ef4100]',
    'disabled:text-caars-neutral-grey-5',
  ].join(' '),
  'text-black': [
    'text-caars-neutral-black',
    'hover:text-caars-primary-1',
    'disabled:text-caars-neutral-grey-5',
  ].join(' '),
}

const HEIGHT_CLASSES: Record<CButtonSize, string> = {
  lg: 'h-[52px] text-[16px] tracking-[0.32px]',
  md: 'h-[46px] text-[16px] tracking-[0.32px]',
  sm: 'h-[36px] text-[15px] tracking-[0.3px]',
}

const ICON_SIZE_CLASSES: Record<CButtonSize, string> = {
  lg: 'size-6',
  md: 'size-5',
  sm: 'size-4',
}

const GAP_CLASSES: Record<CButtonSize, string> = {
  lg: 'gap-2',
  md: 'gap-1',
  sm: 'gap-1',
}

function getPaddingClasses(
  size: CButtonSize,
  variant: CButtonVariant,
  hasPrefix: boolean,
  hasSuffix: boolean,
): string {
  const isText = variant === 'text-color' || variant === 'text-black'

  if (isText) {
    if (size === 'lg') {
      if (hasPrefix && !hasSuffix) return 'pl-7 pr-9 py-4'
      if (!hasPrefix && hasSuffix) return 'pl-9 pr-7 py-4'
      return 'px-12 py-4'
    }
    if (size === 'md') {
      if (hasPrefix && !hasSuffix) return 'pr-1.5 py-3'
      if (!hasPrefix && hasSuffix) return 'pl-1.5 py-3'
      return 'py-3'
    }
    if (hasPrefix && !hasSuffix) return 'pr-1 py-2'
    if (!hasPrefix && hasSuffix) return 'pl-1 py-2'
    return 'py-2'
  }

  if (size === 'lg') {
    if (hasPrefix && !hasSuffix) return 'pl-7 pr-9 py-4'
    if (!hasPrefix && hasSuffix) return 'pl-9 pr-7 py-4'
    return 'px-12 py-4'
  }
  if (size === 'md') {
    if (hasPrefix && !hasSuffix) return 'pl-5 pr-7 py-3'
    if (!hasPrefix && hasSuffix) return 'pl-7 pr-5 py-3'
    return 'px-7 py-3'
  }
  if (hasPrefix && !hasSuffix) return 'pl-2.5 pr-4 py-2'
  if (!hasPrefix && hasSuffix) return 'pl-4 pr-2.5 py-2'
  return 'px-4 py-2'
}

export default function CButton({
  variant = 'solid',
  size = 'md',
  prefix,
  suffix,
  className,
  children,
  asChild = false,
  ...props
}: CButtonProps) {
  const hasPrefix = !!prefix
  const hasSuffix = !!suffix
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      className={cn(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        HEIGHT_CLASSES[size],
        getPaddingClasses(size, variant, hasPrefix, hasSuffix),
        (hasPrefix || hasSuffix) && GAP_CLASSES[size],
        className,
      )}
      {...props}
    >
      {prefix && (
        <span className={cn('shrink-0 flex items-center justify-center', ICON_SIZE_CLASSES[size])}>
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span className={cn('shrink-0 flex items-center justify-center', ICON_SIZE_CLASSES[size])}>
          {suffix}
        </span>
      )}
    </Comp>
  )
}

export { CButton }
