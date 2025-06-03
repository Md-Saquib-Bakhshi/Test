"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

function Modal({ isOpen, onClose, title, children, size = "md" }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClass = `modal-${size}`

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Background overlay */}
        <div className="modal-backdrop" onClick={onClose} />

        {/* Modal panel */}
        <div className={`modal-panel ${sizeClass}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
              <button onClick={onClose} className="modal-close">
                <X size={24} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
