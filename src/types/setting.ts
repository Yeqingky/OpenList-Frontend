import { Type } from "."

export enum Group {
  SINGLE,
  SITE,
  STYLE,
  PREVIEW,
  GLOBAL,
  ARIA2,
  INDEX,
  SSO,
  LDAP,
  // Values 9 (S3) and 10 (FTP) were dropped together with the S3 and FTP
  // servers. TRAFFIC is numbered explicitly so the remaining groups keep the
  // values the Go backend assigns via iota.
  TRAFFIC = 11,
}
export enum Flag {
  PUBLIC,
  PRIVATE,
  READONLY,
  DEPRECATED,
}

export interface SettingItem {
  key: string
  value: string
  type: Type
  help: string
  options?: string
  group: Group
  flag: Flag
}
