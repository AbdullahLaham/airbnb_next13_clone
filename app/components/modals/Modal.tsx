'use client'
import React, {useState, useEffect, useCallback} from 'react'

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title: string,
    body: React.ReactElement,
    footer: React.ReactElement,
    actionLabel: string,
    disabled: boolean,
    secondaryAction: () => void,
    secondaryActionLabel: () => string,
}
const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    title, 
    body, 
    actionLabel, 
    footer, 
    disabled,
    secondaryAction,
    secondaryActionLabel
  }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen]);

    const handleClose = useCallback(
        () => {
            callback
        },
        [input]
    )
  return (
    <div>Modal</div>
  )
}

export default Modal