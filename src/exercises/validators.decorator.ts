export interface ValidationRule {
  property: string;
  validate: (value: unknown) => boolean;
  message: string;
}

const rulesMap = new Map<object, ValidationRule[]>();

export function MinLength(min: number) {
  return function (target: object, propertyKey: string): void {
    const rules = rulesMap.get(target) ?? [];
    rules.push({
      property: propertyKey,
      validate: (value) => typeof value === 'string' && value.length >= min,
      message: `${propertyKey} deve ter no mínimo ${min} caracteres`,
    });
    rulesMap.set(target, rules);
  };
}

export function IsPositive() {
  return function (target: object, propertyKey: string): void {
    const rules = rulesMap.get(target) ?? [];
    rules.push({
      property: propertyKey,
      validate: (value) => typeof value === 'number' && value > 0,
      message: `${propertyKey} deve ser um número positivo`,
    });
    rulesMap.set(target, rules);
  };
}

export function validate(instance: object): void {
  const rules = rulesMap.get(Object.getPrototypeOf(instance)) ?? [];
  for (const rule of rules) {
    const value = (instance as Record<string, unknown>)[rule.property];
    if (!rule.validate(value)) {
      throw new Error(rule.message);
    }
  }
}
