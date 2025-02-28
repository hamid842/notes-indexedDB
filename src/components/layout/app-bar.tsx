import ThemeToggler from "./theme-toggler";

export default function AppBar() {
  return (
    <div className="flex flex-row items-center justify-between m-5 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
      <p className="font-bold text-2xl">My Notes</p>
      <ThemeToggler />
    </div>
  );
}
