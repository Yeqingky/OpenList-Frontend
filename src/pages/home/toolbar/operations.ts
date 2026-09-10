import { IconTypes } from "solid-icons"
import { TiDeleteOutline } from "solid-icons/ti"
import { TbLink } from "solid-icons/tb"
import { AiTwotoneDelete } from "solid-icons/ai"
import { AiOutlineCloudDownload } from "solid-icons/ai"
import { FiExternalLink } from "solid-icons/fi"

export interface Operations {
  [key: string]: {
    icon: IconTypes
    color?: string
    p?: boolean
  }
}
export const operations: Operations = {
  open_with: { icon: FiExternalLink, color: "$info9" },
  delete: { icon: AiTwotoneDelete, color: "$danger9" },
  copy_link: { icon: TbLink, color: "$info9" },
  cancel_select: { icon: TiDeleteOutline },
  download: { icon: AiOutlineCloudDownload, color: "$primary9" },
}
