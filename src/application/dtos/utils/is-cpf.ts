import { registerDecorator, ValidationOptions } from "class-validator";
import { cpf } from "cpf-cnpj-validator";

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isCPF",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== "string") return false;
          return cpf.isValid(value);
        },
        defaultMessage() {
          return "CPF inválido";
        }
      }
    });
  };
}

export function cleanCPF(cpfValue: string): string {
  return cpfValue.replace(/[.-]/g, "");
}
