import { SidebarTrigger } from "./ui/sidebar"

export default function Navbar() {
  return (
    <nav className="h-14 border-b top-0 z-10 bg-white flex-shrink-0 items-center flex justify-between border-neutral-200">
      <div className="mx-3 flex items-center gap-2">
        <SidebarTrigger />
        {/* <h1 className="text-lg font-semibold">CCHO Playground</h1> */}
      </div>
    </nav>
  )
}
