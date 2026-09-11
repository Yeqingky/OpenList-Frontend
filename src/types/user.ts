export enum UserRole {
  GENERAL,
  GUEST,
  ADMIN,
}

export interface User {
  id: number
  username: string
  password: string
  base_path: string
  role: UserRole
  permission: number
  disabled: boolean
  // otp: boolean;
}

// Permission bits, in order: the index of an entry is its bit position in the
// backend's `permission` field, so the order here must match the Go side.
export const UserPermissions = [
  "write_content",
  "delete",
  "webdav_read",
  "webdav_manage",
] as const

export const UserMethods = {
  is_guest: (user: User) => user.role === UserRole.GUEST,
  is_admin: (user: User) => user.role === UserRole.ADMIN,
  is_general: (user: User) => user.role === UserRole.GENERAL,
  can: (user: User, permission: number) => {
    return ((user.permission >> permission) & 1) == 1
  },
}
