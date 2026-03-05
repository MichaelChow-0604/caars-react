import MenuBar from "./layouts/MenuBar";

function App() {
  return (
    <div className="flex min-h-screen flex-colbg-gray-50">
      <MenuBar mode="day" activeNavItem="calendar" onNavItemClick={() => {}} />
    </div>
  );
}

export default App;
