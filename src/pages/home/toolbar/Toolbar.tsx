import { Portal } from "solid-js/web"
import { Center } from "./Center"
import { Right } from "./Right"
import { Delete } from "./Delete"
import { PackageDownloadModal } from "./Download"
import { lazy } from "solid-js"
import { ModalWrapper } from "./ModalWrapper"
import { LocalSettings } from "./LocalSettings"
import { BackTop } from "./BackTop"
import { Mkdir } from "./Mkdir"

const Upload = lazy(() => import("../uploads/Upload"))

export const Modal = () => {
  return (
    <>
      <Delete />
      <Mkdir />
      <PackageDownloadModal />
      <ModalWrapper name="upload" title="home.toolbar.upload">
        <Upload />
      </ModalWrapper>
      <LocalSettings />
    </>
  )
}

export const Toolbar = () => {
  return (
    <Portal>
      <Right />
      <Center />
      <Modal />
      <BackTop />
    </Portal>
  )
}
