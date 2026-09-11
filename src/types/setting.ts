import { Type } from "."

export enum Group {
  SINGLE = 0,
  SITE = 1,
  STYLE = 2,
  PREVIEW = 3,
  GLOBAL = 4,
  // 5: reserved (was the offline download group), kept so the remaining groups
  // keep the values the Go backend assigns via iota.
  // 9: reserved (was S3) and 10: reserved (was FTP), removed with those servers.
  // 11: reserved (was TRAFFIC), removed with the traffic settings page.
  INDEX = 6,
  SSO = 7,
  LDAP = 8,
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
