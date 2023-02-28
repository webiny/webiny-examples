import zod from "zod";

export const GroupPermissionSchema = zod.object({
    name: zod.string()
})

export const GroupCreateSchema = zod.object({
    name: zod.string().min(1),
    description: zod.string().min(1),
    slug: zod.string().min(1),
    permissions: zod.array(GroupPermissionSchema)
});

export const GroupUpdateSchema = zod.object({
    name: zod.string().min(1),
    description: zod.string().min(1),
    permissions: zod.array(GroupPermissionSchema)
});
