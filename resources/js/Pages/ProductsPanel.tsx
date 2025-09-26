import HomeTitle from "@/components/HomeTitle"
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
import { Trash2 } from "lucide-react"
import { AppPagination } from "@/components/AppPagination"

interface ProductsPanelProps {
    productsPagination: PaginationType<Product>
}

const ProductsPanel: PagesWithLayout<ProductsPanelProps> = ({productsPagination}) => {
    function handleProductCardClick(id: number) {
        router.visit(`/product/${id}`)
    }
    

    return (
        <div className="container mx-auto mb-4 p-4 min-h-screen">
            <HomeTitle>Todos Produtos</HomeTitle>


            <Table>
                <TableHeader>
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
                            <TableCell>{p.price}</TableCell>
                            <TableCell className="text-center">
                                <Button variant='destructive' size='icon'>
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
    )
}

ProductsPanel.layout = (page) => <HomeLayout children={page}/>

export default ProductsPanel