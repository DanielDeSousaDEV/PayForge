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
import { Plus, Trash2 } from "lucide-react"
import { AppPagination } from "@/components/AppPagination"
import { useBoolean, useMediaQuery } from "usehooks-ts"
import { CreateProductModal } from "@/components/CreateProductModal"
import { Badge } from "@/components/ui/badge"

interface UsersPanelProps {
    usersPagination: PaginationType<User>
}

const UsersPanel: PagesWithLayout<UsersPanelProps> = ({usersPagination}) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const {
        value: isOpenCreateUserModal,
        setTrue: openCreateUserModal,
        setFalse: closeCreateUserModal,
        setValue: setIsOpenCreateUserModal
    } = useBoolean(false)

    function handleDeleteUser(id: number) {
        router.visit(`/admin/users/${id}`, {
            method: 'delete'
        })
    }    

    return (
        <>
            <div className="container mx-auto mb-4 p-4 min-h-screen">
                <div className="flex items-center justify-between mb-2">
                    <HomeTitle>Todos Usuários</HomeTitle>

                    <Button
                        size={isMobile ? 'icon' : 'default'}
                        onClick={openCreateUserModal}
                    >
                        {isMobile
                            ? <Plus className="stroke-3"/>
                            : 'Adicionar Usuários'
                        }
                    </Button>
                </div>

                <Table className="bg-white overflow-hidden rounded-lg">
                    <TableHeader className="bg-primary text-gray-800">
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-center">Cargo</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersPagination.data.map(user => 
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={user.is_admin ? 'default' : 'secondary'}>
                                        {user.is_admin
                                            ? 'Admin'
                                            : 'Usuário'
                                        }
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button variant='destructive' size='icon' onClick={() => handleDeleteUser(user.id)}>
                                        <Trash2 className="stroke-3"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <AppPagination 
                                    paginatedData={usersPagination}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <CreateProductModal 
                open={isOpenCreateUserModal}
                onOpenChange={setIsOpenCreateUserModal}
            />
        </>
    )
}

UsersPanel.layout = (page) => <HomeLayout children={page}/>

export default UsersPanel