'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
    interface Window {
        ym: any;
    }
}

export function Metrika() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        if (typeof window.ym === 'function') {
            window.ym(103601738, 'hit', url, {
                params: {
                    title: document.title
                }
            });
        }
    }, [pathname, searchParams]);

    return null;
}
