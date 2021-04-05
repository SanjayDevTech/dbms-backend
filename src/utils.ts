export const isValid = (args: any[]) => args.every((v) => Boolean(String(v)));

export const isInValid = (args: any[]) => !isValid(args);
