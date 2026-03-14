export interface AppShellProps {
  children: React.ReactNode
  navigationItems?: { label: string; href: string }[]
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main>{children}</main>
    </div>
  )
}
