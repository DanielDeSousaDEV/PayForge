import { Pagination as PaginationType } from "@/types/Pagination";
import { router } from "@inertiajs/react";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationLink } from "../ui/pagination";

interface AppPaginationProps {
    paginatedData: PaginationType<any>
}


export function AppPagination({paginatedData}:AppPaginationProps) {
    let qtdOfEllipsis = 0; 

    return (
        <Pagination>
            <PaginationContent>
                {paginatedData.links.map((link, index) => {
                    // Ignora links sem URL, mas deixa os separadores "…" visíveis
                    if (!link.url && link.label !== '…') return null;

                    // Conserta labels do Laravel
                    const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');

                    // Define qual tipo de botão usar
                    if (label.includes('«')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) router.get(link.url);
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    if (label.includes('»')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) router.get(link.url);
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    // Defini Ellipsis
                    if (
                        // paginatedData.total > 5 &&
                        // index > 2 &&
                        // index < paginatedData.total
                        paginatedData.total > 5 &&
                        index > 1 &&


                        index < paginatedData.current_page - 1 ||
                        index > paginatedData.current_page + 1 &&


                        index < paginatedData.total
                    ) {
                        console.log(
                            index, 
                            paginatedData.total > 5 ,
                            index > 2 ,
                            index > paginatedData.current_page - 1 ,
                            index < paginatedData.current_page + 1 ,
                            index < paginatedData.total - 1
                        );
                        
                        if (qtdOfEllipsis === 2) return;

                        qtdOfEllipsis += 1;

                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )
                    }

                    // Botões de página numerada
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={link.active}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) router.get(link.url);
                                }}
                            >
                                {label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    )
}