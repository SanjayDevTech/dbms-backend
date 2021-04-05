export const isValid = (args: any[]) => args.every((v) => Boolean(String(v)));

export const isInValid = (args: any[]) => args.some((v) => !Boolean(String(v)));
