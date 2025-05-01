// React
import React from "react";

// CSS
import styles from "../styles/Modal.module.css";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  showCancel = true,
  showConfirm = !!onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className={styles.ModalOverlay}>
      <div className={styles.ModalContent}>
        <div className={styles.ModalHeader}>
          <h4 className={styles.ModalTitle}>{title}</h4>
          <button onClick={onClose} className={styles.CloseButton}>
            x
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.ModalBody}>{children}</div>

        {/* Modal Footer */}
        <div className={styles.ModalFooter}>
          {showCancel && (
            <button onClick={onClose} className={styles.CancelButton}>
              Close
            </button>
          )}
          {showConfirm && onConfirm && (
            <button onClick={onConfirm} className={styles.DeleteButton}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
