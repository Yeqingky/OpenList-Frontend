import * as i18n from "@solid-primitives/i18n"
import { createResource, createSignal } from "solid-js"
export { i18n }

// glob search by Vite
const langs = import.meta.glob("~/lang/*/index.json", {
  eager: true,
  import: "lang",
})

// all available languages
export const languages = Object.keys(langs).map((langPath) => {
  const langCode = langPath.split("/")[3]
  const langName = langs[langPath] as string
  return { code: langCode, lang: langName }
})

// Default language for this build: Simplified Chinese. The browser language is
// deliberately NOT consulted, so a fresh visitor always lands on Chinese and
// every page can be screenshotted or handed over with a consistent language.
// An explicit choice in localStorage still wins, and the switcher can change it.
const defaultLang =
  languages.find((lang) => lang.code === "zh-CN")?.code ?? "en"

// Get initial language from localStorage or fallback to defaultLang
export let initialLang = localStorage.getItem("lang") ?? defaultLang

if (!languages.some((lang) => lang.code === initialLang)) {
  initialLang = defaultLang
}

// Type imports
// use `type` to not include the actual dictionary in the bundle
import type * as en from "~/lang/en/entry"

export type Lang = keyof typeof langs
export type RawDictionary = typeof en.dict
export type Dictionary = i18n.Flatten<RawDictionary>

// English dictionary cache for fallback
let enDictCache: Dictionary | null = null

const fetchEnDict = async (): Promise<Dictionary> => {
  if (!enDictCache) {
    const dict: RawDictionary = (await import("~/lang/en/entry")).dict
    enDictCache = i18n.flatten(dict)
  }
  return enDictCache
}

// Fetch and flatten the dictionary, with English fallback
const fetchDictionary = async (locale: Lang): Promise<Dictionary> => {
  try {
    const dict: RawDictionary = (await import(`~/lang/${locale}/entry.ts`)).dict
    const flatDict = i18n.flatten(dict)

    // If not English, merge with English as fallback (English keys underneath, locale on top)
    if (locale !== "en") {
      const enDict = await fetchEnDict()
      return { ...enDict, ...flatDict } as Dictionary
    }

    return flatDict
  } catch (err) {
    console.error(`Error loading dictionary for locale: ${locale}`, err)
    // Fallback to English if the requested locale fails to load
    if (locale !== "en") {
      return await fetchEnDict()
    }
    throw new Error(`Failed to load dictionary for ${locale}`)
  }
}

// Signals to track current language and dictionary state
export const [currentLang, setCurrentLang] = createSignal<Lang>(initialLang)

export const [dict] = createResource(currentLang, fetchDictionary)
