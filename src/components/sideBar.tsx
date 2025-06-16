import {
  Calendar,
  Home,
  Inbox,
  LibraryBig,
  PencilRuler,
  Play,
  Search,
  Settings,
  X,
} from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar"
const documentItems = [
  {
    title: "Survey Library",
    url: "/survey-library",
    icon: LibraryBig,
  },
]
const promptItems = [
  {
    title: "Prompt Editor",
    url: "/prompt-editor",
    icon: PencilRuler,
  },
]
export default function PlaygroundSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="">
              <SidebarGroupLabel className="whitespace-nowrap overflow-hidden">
                CCHO Playground Testing
              </SidebarGroupLabel>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a className="block" href="/">
                  <Home className="" />
                  <span className="">Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel className="whitespace-nowrap overflow-hidden">
              Documents
            </SidebarGroupLabel>
            {documentItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel className="whitespace-nowrap overflow-hidden">
              Prompts
            </SidebarGroupLabel>

            {promptItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup> */}
        {/* </SidebarHeader> */}
      </SidebarContent>
    </Sidebar>
  )
}
