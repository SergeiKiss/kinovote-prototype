'use client';

import { Film, Home, Tv, Vote } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function AppSidebar({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const menuItems = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'movies', label: 'Фильмы', icon: Film },
    { id: 'series', label: 'Сериалы', icon: Tv },
    { id: 'voting', label: 'Голосование', icon: Vote },
  ];

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r bg-card/40"
    >
      <SidebarHeader className="p-4 h-[73px]">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary self-center px-2 group-data-[collapsible=icon]:hidden">
            КиноВоут
            </h1>
            <h1 className="text-3xl font-bold text-primary self-center hidden group-data-[collapsible=icon]:block">
            КВ
            </h1>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="p-4">
          {menuItems.map(item => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onSectionChange(item.id)}
                isActive={activeSection === item.id}
                className={cn(activeSection === item.id && 'animate-glow', 'h-14 text-lg')}
                tooltip={{ children: item.label }}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
