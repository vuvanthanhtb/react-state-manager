import { useSelector } from "react-redux";
import Header from "./components/header";
import TabsContent from "./components/tabs.content";
import { RootState } from "./redux/store";

function App() {
  const count = useSelector((state: RootState) => state.count);
  console.log({ count });

  return (
    <>
      <Header />
      <TabsContent />
    </>
  );
}

export default App;
