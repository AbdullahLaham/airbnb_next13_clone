'use client'

import React from 'react'

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
// import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

// import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
// import Input from "../inputs/Input";
// import Heading from "../Heading";
import Button from "../Button";
import Heading from '../Heading';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },

    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const bodyContent = (
        <div className='flex flex-col gap-4 '>
            <Heading />
        </div>
    )
    let onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(() => {
            toast.success('Registered!');
            registerModal.onClose();
            // loginModal.onOpen();
        })
        .catch((error) => {
        toast.error(error);
        })
        .finally(() => {
        setIsLoading(false);
        })
    }
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    //   body={bodyContent}
    //   footer={footerContent}
    />
  )
}

export default RegisterModal