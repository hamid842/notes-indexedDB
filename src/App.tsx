import AppBar from "@/components/layout/app-bar";
import NotSupportIndexedDB from "@/components/not-support-indexedDB";
import { useSupportIndexDB } from "@/hooks/useSupportIndexDB";
import Notes from "@/components/notes";

function App() {
  const isSupportIndexedDB = useSupportIndexDB();

  return (
    <main>
      <AppBar />
      {isSupportIndexedDB ? <Notes /> : <NotSupportIndexedDB />}
    </main>
  );
}

export default App;
