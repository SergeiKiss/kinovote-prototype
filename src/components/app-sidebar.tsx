'use client';

import { Film, Home, Tv, Vote } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
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
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary self-center px-2 group-data-[collapsible=icon]:hidden">
            КиноВоут
            </h1>
            <h1 className="text-2xl font-bold text-primary self-center hidden group-data-[collapsible=icon]:block">
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
                className={cn(activeSection === item.id && 'animate-glow')}
                tooltip={{ children: item.label }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
