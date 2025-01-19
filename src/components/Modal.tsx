import styles from "./Modal.module.css";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    visible: boolean;
  }
  
  const Modal: React.FC<ModalProps> = ({ onClose, children, visible }) => {
    return (
        <div 
        className={`${styles.modalOverlay} ${visible ? styles.show : styles.hide}`}
        onClick={onClose}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
  