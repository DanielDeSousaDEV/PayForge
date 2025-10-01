// -/resources/js/types/global.d.ts
import { usePage } from "@inertiajs/react";
import { FC, JSX, ReactNode } from "react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Errors, ErrorBag, Page, VisitOptions } from "@inertiajs/core";
import { FlashMessageType } from "@/enums/FlashMessagesTypes";

export interface PagesWithLayout<P = {}> extends FC<P> {
  layout?: (page: ReactNode) => ReactNode
}
declare module '@inertiajs/react' {
  interface PageProps extends InertiaPageProps {
    user: User | null,
    productQuantityInCart: number | null,
    flash?: {
      type: FlashMessageType,
      message: string
    }
  }

 export function usePage<T extends PageProps = PageProps>(): Page<T>;
}