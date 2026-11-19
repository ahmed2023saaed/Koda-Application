export default function SettingsPage() {
  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-300/60 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40 sm:rounded-3xl sm:p-6 lg:p-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-500 dark:text-sky-400 sm:text-xs sm:tracking-[0.3em]">
        Settings
      </p>
      <h1 className="mt-2 break-words text-xl font-bold text-slate-700 dark:text-white sm:mt-3 sm:text-2xl lg:text-3xl">
        Preferences and integrations
      </h1>
      <p className="mt-2 break-words text-sm text-slate-500 dark:text-slate-300 sm:text-base">
        Theme mode, API credentials, and dashboard preferences are managed here.
      </p>
    </section>
  );
}