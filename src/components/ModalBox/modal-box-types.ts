export interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  closeIcon?: boolean;
  width?: number;
  closable?: boolean;
}
