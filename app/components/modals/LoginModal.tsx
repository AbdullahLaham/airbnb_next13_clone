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
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
// import Heading from "../Heading";
import Button from "../Button";
import Heading from '../Heading';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/app/hooks/useAuthStore';
import useRegisterModal from '@/app/hooks/useRegisterModal';
// import { Input } from 'postcss';

const LoginModal = () => {
    const loginModal = useLoginModal();
    const authStore = useAuthStore();
    const registerModal = useRegisterModal();
    console.log(authStore?.user)
    const [isLoading, setIsLoading] = useState(false);
    // router
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },

    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    console.log(loginModal.isOpen, 'yyyyyyyy');



    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
      },[loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4 '>
            <Heading title={'Welcome back'} subtitle='Login to your account' />
            <Input id='email' disabled={isLoading} label='Email' register={register} errors={errors} required  />
            
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
        <p>First Time using Airbnb?
          <span 
            onClick={toggle} 
            className="
              text-neutral-800
                cursor-pointer 
                hover:underline
                hover:font-semibold
            "
            > Register</span>
        </p>
      </div>
    </div>
  )

    let onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const {email, password} = data
        
        authStore.login(email, password)
        .then(() => {
            toast.success('Logged In!');
            router.refresh();
            loginModal.onClose();
            // loginModal.onOpen();
        })
        .catch((error) => {
        toast.error(error?.message);
        })
        .finally(() => {
        setIsLoading(false);
        })

    }
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal



