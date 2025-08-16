import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

// Supports weights 100-900
import '@fontsource-variable/dm-sans';
import HomeLayout from './layouts/HomeLayout';
import { ReactNode } from 'react';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    let page: any = pages[`./Pages/${name}.tsx`]
    page.default.layout = page.default.layout || ((page: ReactNode) => <HomeLayout children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})