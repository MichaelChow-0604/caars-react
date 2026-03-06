import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type CInputState = "default" | "focus" | "filled" | "error" | "disabled";

export interface CInputProps
  extends Omit<React.ComponentProps<"input">, "size" | "prefix"> {
  label?: string;
  errorMsg?: string;
  size?: "default" | "sm";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  solidIcon?: React.ReactNode;
  showAreaCode?: boolean;
  areaCode?: string;
  onAreaCodeClick?: () => void;
}

const containerStyles: Record<CInputState, string> = {
  default: "bg-white border-caars-neutral-grey-4",
  focus: "bg-caars-primary-4 border-caars-primary-1",
  filled: "bg-white border-caars-neutral-grey-4",
  error: "bg-caars-error-2 border-caars-error-1",
  disabled: "bg-caars-neutral-grey-3 border-caars-neutral-grey-4",
};

const labelBgStyles: Record<CInputState, string> = {
  default: "bg-white",
  focus: "bg-caars-primary-4",
  filled: "bg-white",
  error: "bg-caars-error-2",
  disabled: "bg-caars-neutral-grey-3",
};

const labelColorStyles: Record<CInputState, string> = {
  default: "text-caars-neutral-grey-6",
  focus: "text-caars-primary-1",
  filled: "text-caars-neutral-grey-6",
  error: "text-caars-error-1",
  disabled: "text-caars-neutral-grey-6",
};

const inputColorStyles: Record<CInputState, string> = {
  default: "text-caars-neutral-grey-6 placeholder:text-caars-neutral-grey-6",
  focus: "text-caars-primary-1 placeholder:text-caars-primary-1",
  filled: "text-caars-neutral-black placeholder:text-caars-neutral-grey-6",
  error: "text-caars-error-1 placeholder:text-caars-error-1",
  disabled: "text-caars-neutral-grey-6 placeholder:text-caars-neutral-grey-6",
};

export function CInput({
  label,
  errorMsg,
  size = "default",
  prefix,
  suffix,
  solidIcon,
  showAreaCode = false,
  areaCode = "+852",
  onAreaCodeClick,
  className,
  disabled,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  ...props
}: CInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<
    string | number | readonly string[]
  >(defaultValue ?? "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue =
    currentValue !== "" && currentValue !== undefined && currentValue !== null;
  const hasError = !!errorMsg;

  const state: CInputState = disabled
    ? "disabled"
    : hasError
    ? "error"
    : isFocused
    ? "focus"
    : hasValue
    ? "filled"
    : "default";

  const isLabelFloating = state !== "default";
  const height = size === "sm" ? "h-12" : "h-[52px]";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-start w-full",
        hasError && "gap-1",
        className
      )}
    >
      <div
        className={cn(
          "relative border flex gap-2 items-center w-full px-4 rounded-lg transition-colors duration-150",
          height,
          containerStyles[state]
        )}
      >
        {label && isLabelFloating && (
          <span
            className={cn(
              "absolute -top-2.5 left-3 px-1 rounded text-sm leading-normal whitespace-nowrap pointer-events-none",
              labelBgStyles[state],
              labelColorStyles[state]
            )}
          >
            {label}
          </span>
        )}
        {prefix && (
          <span
            className={cn("shrink-0 text-inherit", labelColorStyles[state])}
          >
            {prefix}
          </span>
        )}
        {showAreaCode && (
          <button
            type="button"
            onClick={onAreaCodeClick}
            className={cn(
              "flex items-center gap-1 pr-4 border-r shrink-0 text-base leading-normal font-normal",
              state === "focus"
                ? "text-caars-primary-3 border-caars-primary-1"
                : state === "error"
                ? "text-caars-error-1 border-caars-error-1"
                : "text-caars-neutral-black border-caars-neutral-grey-4"
            )}
          >
            <span>{areaCode}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <Input
          value={isControlled ? value : internalValue}
          disabled={disabled}
          placeholder={isLabelFloating ? undefined : placeholder ?? label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={cn(
            "flex-1 min-w-0 h-auto border-0 shadow-none bg-transparent p-0 outline-none ring-0 focus-visible:ring-0 focus-visible:border-0 text-base leading-normal font-normal",
            inputColorStyles[state]
          )}
          {...props}
        />
        {suffix && (
          <span className={cn("shrink-0", labelColorStyles[state])}>
            {suffix}
          </span>
        )}
        {solidIcon && (
          <span className="shrink-0 text-caars-neutral-grey-6">
            {solidIcon}
          </span>
        )}
      </div>
      {hasError && errorMsg && (
        <p className="text-sm text-caars-error-1 leading-normal">{errorMsg}</p>
      )}
    </div>
  );
}
