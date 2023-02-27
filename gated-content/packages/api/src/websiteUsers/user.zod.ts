import zod from "zod";

export const UserCreateSchema = zod.object({
    id: zod.string(),
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    email: zod.string().email(),
    group: zod.string()
});

/**
 * For this demo, only allow to update the `group` attribute.
 */
export const UserUpdateSchema = zod.object({
    group: zod.string()
});
