// -/resources/js/types/global.d.ts
import { usePage } from "@inertiajs/react";
import { FC, JSX, ReactNode } from "react";

export interface PagesWithLayout extends FC {
  layout?: (page: ReactNode) => ReactNode
}

declare module '@inertiajs/react' {
  interface PageProps {
    user?: User
  }

  export function usePage<T = PageProps>(): {
    props: T & {
      errors: Errors & ErrorBag;
      deferred?: Record<string, VisitOptions["only"]>;
    };
  };
}