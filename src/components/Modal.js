// CSS
import btnStyles from "../styles/Buttons.module.css";
import styles from "../styles/Modal.module.css";

// React
import React from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  showCancel = true,
  showConfirm = !!onConfirm,
  customFooter = null,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.ModalContent}>
        <div className={styles.ModalHeader}>
          <h4 className={styles.ModalTitle}>{title}</h4>
        </div>

        <div className={styles.ModalBody}>{children}</div>

        <div className={styles.ModalFooter}>
          {customFooter ? (
            customFooter
          ) : (
            <>
              {showCancel && (
                <button onClick={onClose} className={btnStyles.ModalCancelBtn}>
                  Close
                </button>
              )}
              {showConfirm && onConfirm && (
                <button
                  onClick={onConfirm}
                  className={btnStyles.ModalDeleteBtn}
                >
                  Confirm
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
