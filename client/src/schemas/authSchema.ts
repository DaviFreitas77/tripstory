import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório").min(4, "Minimo de 4 caractéres"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  dateOfBirth: yup.date().required("Data de nascimento é obrigatório"),
  password: yup.string().required("senha é obrigatório").min(8, "Minimo de 8 caractéres"),
  terms: yup.boolean().oneOf([true], "Você deve aceitar os termos").required(),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("senha é obrigatório"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  code: yup.string().required("Código obrigatorio"),
  newPassword: yup.string().required("Nova senha obrigatório").min(8, "Minimo de 8 caractéres")
})