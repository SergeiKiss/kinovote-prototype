'use client';

import { Film, Home, Tv, Vote, Clapperboard } from 'lucide-react';
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
      <SidebarHeader className="p-4 h-[65px]">
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-2'>
              <Clapperboard className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary self-center group-data-[collapsible=icon]:hidden">
                Кинопоиск
              </h1>
            </div>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="p-2">
          {menuItems.map(item => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onSectionChange(item.id)}
                isActive={activeSection === item.id}
                className={cn(activeSection === item.id && 'animate-glow', 'h-12 text-base')}
                tooltip={{ children: item.label }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
