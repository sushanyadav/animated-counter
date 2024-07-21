import * as RadixSwitch from "@radix-ui/react-switch";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/functions/cn";

interface SwitchProps
  extends ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  id: string;
  label?: string;
  labelProps?: ComponentPropsWithoutRef<"label">;
  wrapperProps?: ComponentPropsWithoutRef<"div">;
  thumbProps?: ComponentPropsWithoutRef<typeof RadixSwitch.Thumb>;
}

export const Switch = ({
  className,
  id,
  label,
  disabled,
  labelProps,
  wrapperProps,
  thumbProps,
  ...props
}: SwitchProps) => {
  return (
    <div
      className={cn("flex justify-between items-start group gap-5", className)}
      {...wrapperProps}
    >
      {label && (
        <div className="flex flex-col flex-1 gap-1">
          {/* Label */}
          {label && (
            <label
              data-disabled={disabled ? "" : undefined}
              htmlFor={id}
              {...labelProps}
              className={cn(
                "text-[#07091F] text-sm select-none font-medium",
                labelProps?.className
              )}
            >
              {label}
            </label>
          )}
        </div>
      )}

      {/* Root */}
      <RadixSwitch.Root
        disabled={disabled}
        id={id}
        {...props}
        className={cn(
          "min-w-[46px] px-px max-w-[46px] h-6 rounded-md relative tap-highlight-transparent transition-colors duration-300 data-[state=checked]:bg-[#4F0FBE] data-[state=unchecked]:bg-[#F3F3F3] group-hover:data-[state=unchecked]:bg-controls-[#F4F4F4] focus-ring",

          className
        )}
      >
        {/* Thumb */}
        <RadixSwitch.Thumb
          {...thumbProps}
          className={cn(
            "data-[state=unchecked]:before:bg-[#CBCBCB] data-[state=unchecked]:after:bg-[#CBCBCB] data-[state=checked]:translate-x-[22px] rounded-[4px] w-5 h-5 flex items-center justify-center before:h-[3px] before:w-[3px] before:rounded-[3px] data-[state=checked]:before:bg-[#4F0FBE] after:h-[3px] after:w-[3px] after:rounded-[3px] data-[state=checked]:after:bg-[#4F0FBE] after:ml-0.5 bg-white transition-all duration-300",
            thumbProps?.className
          )}
        />
      </RadixSwitch.Root>
    </div>
  );
};
