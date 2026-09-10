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
  sso_id: string
  disabled: boolean
  allow_ldap: boolean
  // otp: boolean;
}

export const UserPermissions = [
  "see_hides",
  "access_without_password",
  // bit 2 is reserved by the backend (was: add offline download tasks).
  // Keep this placeholder so every later index == permission bit stays aligned.
  "offline_download",
  "write_content",
  "rename",
  "move",
  "copy",
  "delete",
  "webdav_read",
  "webdav_manage",
  "ftp_read",
  "ftp_manage",
  "read_archives",
  "decompress",
] as const

// Permissions whose feature no longer exists in this build (the backend is an
// upload/download/delete middleware). The array entries above MUST stay, because
// index == permission bit; only the management UI hides them so admins are not
// offered toggles for capabilities that do nothing.
export const HiddenPermissions = [
  "offline_download",
  "rename",
  "move",
  "copy",
  "read_archives",
  "decompress",
  "ftp_read",
  "ftp_manage",
] as const

export const isHiddenPermission = (name: string): boolean =>
  (HiddenPermissions as readonly string[]).includes(name)

export const UserMethods = {
  is_guest: (user: User) => user.role === UserRole.GUEST,
  is_admin: (user: User) => user.role === UserRole.ADMIN,
  is_general: (user: User) => user.role === UserRole.GENERAL,
  can: (user: User, permission: number) => {
    return ((user.permission >> permission) & 1) == 1
  },
  // can_see_hides: (user: User) =>
  //   UserMethods.is_admin(user) || (user.permission & 1) == 1,
  // can_access_without_password: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 1) & 1) == 1,
  // can_offline_download_tasks: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 2) & 1) == 1,
  // can_write: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 3) & 1) == 1,
  // can_rename: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 4) & 1) == 1,
  // can_move: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 5) & 1) == 1,
  // can_copy: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 6) & 1) == 1,
  // can_remove: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 7) & 1) == 1,
  // can_webdav_read: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 8) & 1) == 1,
  // can_webdav_manage: (user: User) =>
  //   UserMethods.is_admin(user) || ((user.permission >> 9) & 1) == 1,
}
