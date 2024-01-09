import { Modal as ModalPortal } from './Modal'
import { ModalForm } from './ModalForm'

const Modal = ({ children }: { children: React.ReactNode }) => children

Modal.Portal = ModalPortal
Modal.Form = ModalForm

export default Modal
