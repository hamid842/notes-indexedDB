import { useEffect, useState } from "react";

// check the user browser support indexedDB
export const useSupportIndexDB = () => {
  const [isSupportIndexDB, setIsSupportIndexDB] = useState(false);

  useEffect(() => {
    setIsSupportIndexDB(!!window.indexedDB);
  }, []);

  return isSupportIndexDB;
};
