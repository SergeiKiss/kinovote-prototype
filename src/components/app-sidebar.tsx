'use client';

import { Film, Home, Tv, Vote, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { id: 'home', label: 'Главная', icon: Home, href: '/' },
    { id: 'movies', label: 'Фильмы', icon: Film, href: '/movies' },
    { id: 'series', label: 'Сериалы', icon: Tv, href: '/series' },
    { id: 'voting', label: 'Голосование', icon: Vote, href: '/voting' },
  ];

  const getActiveSection = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/movies')) return 'movies';
    if (pathname.startsWith('/series')) return 'series';
    if (pathname.startsWith('/voting')) return 'voting';
    return 'home';
  }

  const activeSection = getActiveSection();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r bg-card"
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
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={activeSection === item.id}
                  className={cn(activeSection === item.id && 'animate-glow', 'h-12 text-base')}
                  tooltip={{ children: item.label }}
                >
                  <a>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
