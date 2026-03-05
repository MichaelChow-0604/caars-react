import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import AppointmentPreview from "./components/AppointmentPreview";
import TimelineItem from "./components/TimelineItem";
import MasterMenuItem from "./components/MasterMenuItem";
import { Calendar, Star, Users } from "lucide-react";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen w-screen p-8">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
        label="Label"
        bold
      />
      <Checkbox
        checked={!checked}
        onCheckedChange={(value) => setChecked(value !== true)}
        label="Label"
        bold={false}
      />

      <AppointmentPreview state="active" />
      <AppointmentPreview
        state="expired"
        line1="John Doe, 42M"
        line2="9:00am"
      />
      <AppointmentPreview
        state="cancelled"
        line1="Betty Wong, 35F"
        line2="11:30am"
      />

      <TimelineItem
        state="normal"
        line1="Checkup"
        line2="Mon, 9:00am"
        onClick={() => {}}
      />
      <TimelineItem
        state="routine"
        line1="Follow-up"
        line2="Wed, 11:30am"
        onClick={() => {}}
      />
      <TimelineItem state="emergency" line1="Emergency" line2="Fri, 2:00pm" />
      <TimelineItem state="expired" line1="Past Visit" line2="Last month" />

      <MasterMenuItem
        label="Dashboard"
        icon={<Star className="size-6" />}
        active
      />
      <MasterMenuItem
        label="Appointments"
        icon={<Calendar className="size-6" />}
        hint={3}
      />
      <MasterMenuItem label="Patients" icon={<Users className="size-6" />} />
      <MasterMenuItem
        label="Reports"
        icon={<Star className="size-6" />}
        disabled
      />
    </div>
  );
}

export default App;
