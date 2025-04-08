import { PERMISSION_PROFILES } from "@/data/permissions"

export type PermissionProfile = keyof typeof PERMISSION_PROFILES;
export type PermissionMap = typeof PERMISSION_PROFILES[PermissionProfile];