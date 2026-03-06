import MenuBar from "./layouts/MenuBar";
import CButton from "./components/caars-ui/CButton";
import { PlusIcon } from "lucide-react";

function App() {
  return (
    <div className="flex min-h-screen flex-colbg-gray-50">
      <MenuBar mode="day" activeNavItem="calendar" onNavItemClick={() => {}} />

      <main className="p-4 flex flex-col gap-20 w-full h-dvh bg-red-100 justify-center items-center">
        <CButton
          variant="outline-color"
          size="md"
          prefix={<PlusIcon className="w-4 h-4" />}
        >
          Button
        </CButton>
      </main>
    </div>
  );
}

export default App;
