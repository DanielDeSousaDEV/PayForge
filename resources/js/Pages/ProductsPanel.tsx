import { HomeTitle } from "@/components/HomeTitle";
import HomeLayout from "@/layouts/HomeLayout"
import { PagesWithLayout } from "@/types/inertia"
import { Pagination as PaginationType } from "@/types/Pagination"
import { router } from "@inertiajs/react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { AppPagination } from "@/components/AppPagination"
import { useBoolean, useMediaQuery } from "usehooks-ts"
import { CreateProductModal } from "@/components/CreateProductModal"

interface ProductsPanelProps {
    productsPagination: PaginationType<Product>
}

const ProductsPanel: PagesWithLayout<ProductsPanelProps> = ({productsPagination}) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const {
        value: isOpenCreateProductModal,
        setTrue: openCreateProductModal,
        setFalse: closeCreateProductModal,
        setValue: setIsOpenCreateProductModal
    } = useBoolean(false)

    function handleDeleteProduct(id: number) {
        router.visit(`/admin/products/${id}`, {
            method: 'delete'
        })
    }
    

    return (
        <>
            <div className="container mx-auto mb-4 p-4 min-h-screen">
                <div className="flex items-center justify-between mb-2">
                    <HomeTitle>Todos Produtos</HomeTitle>

                    <Button
                        size={isMobile ? 'icon' : 'default'}
                        onClick={openCreateProductModal}
                    >
                        {isMobile
                            ? <Plus className="stroke-3"/>
                            : 'Adicionar Produtos'
                        }
                    </Button>
                </div>

                <Table className="bg-white overflow-hidden rounded-lg">
                    <TableHeader className="bg-primary text-gray-800">
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsPagination.data.map(p => 
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.id}</TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>R$ {p.price}</TableCell>
                                <TableCell className="text-center">
                                    <Button variant='destructive' size='icon' onClick={() => handleDeleteProduct(p.id)}>
                                        <Trash2 className="stroke-3"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>
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
    )
}

ProductsPanel.layout = (page) => <HomeLayout children={page}/>

export default ProductsPanel