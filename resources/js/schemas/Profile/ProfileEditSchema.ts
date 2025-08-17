import z from "zod";

export const ProfileEditSchema = z.object({
    name: z
        .string('Por favor informe seu nome')
        .min(5, 'Seu nome deve possuir mais que 5 caracteres'),
    email: z
        .email('Por favor informe seu email'),
})