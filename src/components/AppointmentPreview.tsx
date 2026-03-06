import type { FC } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

type AppointmentState = "active" | "cancelled" | "expired";

interface AppointmentPreviewProps {
  className?: string;
  line1?: string;
  line2?: string;
  state?: AppointmentState;
}

const cardBaseClassName =
  "w-full items-start justify-center gap-0.5 rounded-[12px] border-none px-4 py-3 shadow-none";

const AppointmentPreview: FC<AppointmentPreviewProps> = ({
  className,
  line1 = "Betty Wong, 35F",
  line2 = "11:30am",
  state = "active",
}) => {
  if (state === "expired") {
    return (
      <Card
        className={cn(
          cardBaseClassName,
          "bg-caars-neutral-grey-4 text-caars-neutral-grey-6",
          className
        )}
        data-state="expired"
      >
        <CardTitle className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold">
          {line1}
        </CardTitle>
        <CardDescription className="font-caars-header text-caars-body-2 leading-caars-body-2 font-normal text-caars-neutral-grey-6">
          {line2}
        </CardDescription>
      </Card>
    );
  }

  if (state === "cancelled") {
    return (
      <Card
        className={cn(
          cardBaseClassName,
          "relative bg-caars-error-2",
          className
        )}
        data-state="cancelled"
      >
        <CardTitle className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-error-1">
          {line1}
        </CardTitle>
        <CardDescription className="font-caars-header text-caars-body-2 leading-caars-body-2 font-normal text-caars-neutral-grey-6">
          {line2}
        </CardDescription>
        <CardAction className="absolute right-3 top-3 inline-flex items-center rounded-[6px] border border-caars-error-1 bg-caars-error-2 px-2 py-1">
          <span className="font-caars-header text-[12px] font-semibold leading-[1.4] text-caars-error-1">
            Cancelled
          </span>
        </CardAction>
      </Card>
    );
  }

  return (
    <Card
      asChild
      className={cn(
        cardBaseClassName,
        "cursor-pointer bg-caars-success-2 text-left",
        className
      )}
      data-state="active"
    >
      <button type="button">
        <CardTitle className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-success-1">
          {line1}
        </CardTitle>
        <CardDescription className="font-caars-header text-caars-body-2 leading-caars-body-2 font-normal text-caars-neutral-grey-6">
          {line2}
        </CardDescription>
      </button>
    </Card>
  );
};

export default AppointmentPreview;
