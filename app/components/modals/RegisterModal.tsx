'use client'


import React from 'react'

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
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
import Input from "../inputs/Input";
// import Heading from "../Heading";
import Button from "../Button";
import Heading from '../Heading';
import useLoginModal from '@/app/hooks/useLoginModal';
// import { Input } from 'postcss';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
    console.log(registerModal.isOpen, 'yyyyyyyy');



    const toggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4 '>
            <Heading title={'Welcome to Airbnb'} subtitle='Create an Account!' />
            <Input id='email' disabled={isLoading} label='Email' register={register} errors={errors} required  />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

        </div>
    );
    const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      {/* <Button putline label='Continue with Google' /> */}
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={toggle} 
            className="
              text-neutral-800
                cursor-pointer 
                hover:underline
                hover:font-semibold
            "
            > Log in</span>
        </p>
      </div>
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
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal