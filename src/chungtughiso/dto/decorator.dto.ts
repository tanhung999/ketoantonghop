import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
export function IsFloat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isFloat',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return typeof value === 'number' && Number.isFinite(value) && !Number.isInteger(value);
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a float number.`;
          },
        },
      });
    };
  }