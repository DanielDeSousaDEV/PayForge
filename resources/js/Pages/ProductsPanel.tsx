import { HomeTitle } from "@/components/HomeTitle";
import HomeLayout from "@/layouts/HomeLayout";
import { PagesWithLayout } from "@/types/inertia";
import { Pagination as PaginationType } from "@/types/Pagination";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Box, Plus, Trash2 } from "lucide-react";
import { AppPagination } from "@/components/AppPagination";
import { useBoolean, useMediaQuery } from "usehooks-ts";
import { CreateProductModal } from "@/components/CreateProductModal";

interface ProductsPanelProps {
    productsPagination: PaginationType<Product>;
}

const ProductsPanel: PagesWithLayout<ProductsPanelProps> = ({
    productsPagination,
}) => {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const {
        value: isOpenCreateProductModal,
        setTrue: openCreateProductModal,
        setFalse: closeCreateProductModal,
        setValue: setIsOpenCreateProductModal,
    } = useBoolean(false);

    function handleDeleteProduct(id: number) {
        router.visit(`/admin/products/${id}`, {
            method: "delete",
        });
    }

    return (
        <>
            <div className="container mx-auto mb-6 p-4 min-h-screen space-y-4">
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                    <HomeTitle
                        icon={
                            <Box className="size-5 text-[var(--color-primary)]" />
                        }
                    >
                        Todos Produtos
                    </HomeTitle>

                    <Button
                        size={isMobile ? "icon" : "default"}
                        className="bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-secondary)] transition-colors"
                        onClick={openCreateProductModal}
                    >
                        {isMobile ? (
                            <Plus className="stroke-3" />
                        ) : (
                            "Adicionar Produto"
                        )}
                    </Button>
                </div>

                <Table className="bg-[var(--color-surface)] overflow-hidden rounded-xl shadow-md">
                    <TableHeader className="bg-[var(--color-primary)] text-[var(--color-background)]">
                        <TableRow>
                            <TableHead className="w-[80px] text-left">
                                ID
                            </TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {productsPagination.data.map((p) => (
                            <TableRow
                                key={p.id}
                            >
                                <TableCell className="font-medium text-[var(--color-text)]">
                                    {p.id}
                                </TableCell>
                                <TableCell className="text-[var(--color-text)] flex items-center gap-2">
                                    <Box className="size-4 text-[var(--color-primary)]" />{" "}
                                    {p.name}
                                </TableCell>
                                <TableCell className="text-[var(--color-text)] font-semibold">
                                    R$ {p.price}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="hover:bg-red-600 hover:text-white transition-colors"
                                        onClick={() =>
                                            handleDeleteProduct(p.id)
                                        }
                                    >
                                        <Trash2 className="stroke-3" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="pt-4">
                                <AppPagination
                                    paginatedData={productsPagination}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <CreateProductModal
                open={isOpenCreateProductModal}
                onOpenChange={setIsOpenCreateProductModal}
            />
        </>
    );
};

ProductsPanel.layout = (page) => <HomeLayout children={page} />;

export default ProductsPanel;
