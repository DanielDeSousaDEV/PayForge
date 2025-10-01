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
import { Plus, Trash2, UserCog2 } from "lucide-react";
import { AppPagination } from "@/components/AppPagination";
import { useBoolean, useMediaQuery } from "usehooks-ts";
import { Badge } from "@/components/ui/badge";
import { usePage } from "@inertiajs/react";
import { CreateUserModal } from "@/components/CreateUserModal";

interface UsersPanelProps {
    usersPagination: PaginationType<User>;
}

const UsersPanel: PagesWithLayout<UsersPanelProps> = ({ usersPagination }) => {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const { user: authUser } = usePage().props;

    const {
        value: isOpenCreateUserModal,
        setTrue: openCreateUserModal,
        setFalse: closeCreateUserModal,
        setValue: setIsOpenCreateUserModal,
    } = useBoolean(false);

    const filteredData = usersPagination.data.filter(
        (u) => u.id !== authUser?.id
    );

    function handleDeleteUser(id: number) {
        router.visit(`/admin/users/${id}`, {
            method: "delete",
        });
    }

    return (
        <>
            <div className="container mx-auto mb-4 p-4 min-h-screen space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <HomeTitle
                        icon={<UserCog2 className="size-5 text-primary" />}
                    >
                        Todos Usuários
                    </HomeTitle>

                    <Button
                        size={isMobile ? "icon" : "default"}
                        className="bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg transition-all rounded-lg flex items-center gap-2"
                        onClick={openCreateUserModal}
                    >
                        {isMobile ? (
                            <Plus className="stroke-3" />
                        ) : (
                            "Adicionar Usuários"
                        )}
                    </Button>
                </div>

                <Table className="bg-[var(--color-surface)] text-[var(--color-background)] overflow-hidden rounded-lg shadow-sm">
                    <TableHeader className="bg-[var(--color-background)] text-[var(--color-text)]">
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead className="font-medium text-[var(--color-text)]">Nome</TableHead>
                            <TableHead className="font-medium text-[var(--color-text)]">Email</TableHead>
                            <TableHead className="text-center">Cargo</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredData.map((user) => (
                            <TableRow
                                key={user.id}
                                className="hover:bg-[var(--color-background)] transition-colors"
                            >
                                <TableCell className="font-medium text-[var(--color-text)]">
                                    {user.id}
                                </TableCell>
                                <TableCell className="font-medium text-[var(--color-text)]">{user.name}</TableCell>
                                <TableCell className="font-medium text-[var(--color-text)]">{user.email}</TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant="default"
                                        className={`${
                                            user.is_admin
                                                ? "bg-primary text-white"
                                                : "bg-[var(--color-background)] text-[var(--color-text)] border border-gray-500"
                                        } px-2 py-1 rounded-full text-sm`}
                                    >
                                        {user.is_admin ? "Admin" : "Usuário"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow-md rounded-lg"
                                        onClick={() =>
                                            handleDeleteUser(user.id)
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
                            <TableCell colSpan={5}>
                                <AppPagination
                                    paginatedData={usersPagination}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <CreateUserModal
                open={isOpenCreateUserModal}
                onOpenChange={setIsOpenCreateUserModal}
            />
        </>
    );
};

UsersPanel.layout = (page) => <HomeLayout children={page} />;

export default UsersPanel;
