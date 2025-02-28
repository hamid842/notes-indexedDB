import { useColorScheme } from "@/hooks/useColorScheme";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import AppTooltip from "../shared/app-tooltip";

export default function ThemeToggler() {
  const { theme, setTheme } = useColorScheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <AppTooltip
      title="Dark/Light"
      trigger={
        <Button size={"icon"} variant={"outline"} onClick={toggleTheme}>
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      }
    />
  );
}
