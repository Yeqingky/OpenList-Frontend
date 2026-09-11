import { createResource } from "solid-js"
import { objStore } from "~/store"
import { decodeText, fetchText, notify } from "~/utils"
import { useT, useLink } from "."

async function checkClipboardPermission(
  mode: "clipboard-read" | "clipboard-write",
): Promise<boolean> {
  try {
    const status = await navigator.permissions.query({
      name: mode as PermissionName,
    })
    return status.state === "granted" || status.state === "prompt"
  } catch {
    // Safari does not support permissions.query for clipboard;
    // assume permission is available if navigator.clipboard exists.
    return !!navigator.clipboard
  }
}

export const useUtil = () => {
  const t = useT()
  return {
    copy: async (text: string) => {
      let copied = false
      try {
        if (!(await checkClipboardPermission("clipboard-write"))) {
          throw new Error("permission denied")
        }
        await navigator.clipboard.writeText(text)
        copied = true
      } catch {
        const ta = document.createElement("textarea")
        ta.value = text
        ta.style.position = "fixed"
        ta.style.opacity = "0"
        const root = document.fullscreenElement ?? document.body
        try {
          root.appendChild(ta)
          ta.select()
          copied = document.execCommand("copy")
        } catch {
          copied = false
        } finally {
          ta.remove()
        }
      }
      if (copied) {
        notify.success(t("global.copied"))
      } else {
        notify.error(t("global.clipboard_denied"))
      }
    },
    paste: async (): Promise<string> => {
      try {
        if (!(await checkClipboardPermission("clipboard-read"))) {
          throw new Error(t("global.clipboard_denied"))
        }
        return navigator.clipboard.readText()
      } catch (e: any) {
        notify.error(e.message || t("global.clipboard_denied"))
        return ""
      }
    },
  }
}

export function useFetchText() {
  const { proxyLink } = useLink()
  const fetchContent = async () => {
    let fileurl = proxyLink(objStore.obj, true)
    return fetchText(fileurl)
  }
  return createResource("", fetchContent)
}

export function useParseText(data?: string | ArrayBuffer) {
  const isString = typeof data === "string"
  const text = (encoding = "utf-8") => {
    if (!data) {
      return ""
    }
    if (isString) {
      return data as string
    }
    return decodeText(data as ArrayBuffer, encoding)
  }
  return {
    isString,
    text,
  }
}
