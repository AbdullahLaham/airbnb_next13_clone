'use client'


import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryBox from '../navbar/CategoryBox';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, set, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import Map from '../Map';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';

const RentModal = () => {
    const rentModal = useRentModal();
    // const handleSubmit = useCallback(() => {

    // }, []);
    enum STEPS {
        CATEGORY = 0,
        LOCATION = 1,
        INFO = 2,
        IMAGES = 3,
        DESCRIPTION = 4,
        PRICE = 5,

    }
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [selected, setSelected] = useState('');

    const {register, handleSubmit, setValue, watch, formState: { errors }, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',

        }
    })
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const bathroomCount = watch('bathroomCount');
    const roomCount = watch('roomCount')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const setCustomValue = (id: string, value: any) => {

        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
        });

    }
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        } 
        return 'Back'
    }, [step]);
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading title='wich of these describes your place?' subtitle='Pick a Category' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto '>
                {categories?.map(({label, icon}) => {
                    return (
                        <div className='col-span-1'>
                            <CategoryInput label={label} icon={icon} selected={category === label ? true : false} onClick={(category) => setCustomValue('category', category)}  />
                        </div>
                    )
                })}
            </div>
        </div>
    )
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='where is your place located ?' subtitle='Help guests find you!' />
                <CountrySelect onChang={(value) => setCustomValue('location', value)} value={location} />
                <Map center={location?.latlng} />
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='share some basics about your place ?' subtitle='what amenties do yoy have!' />
                <Counter title='Guests' subtitle='How many guests ? ' onChange={(value) => setCustomValue('guestCount', value)} value={guestCount} />
                <Counter title='Rooms' subtitle='How many rooms do you have ? ' onChange={(value) => setCustomValue('roomCount', value)} value={roomCount} />
                <Counter title='Bathrooms' subtitle='How many bathrooms do you have ? ' onChange={(value) => setCustomValue('bathroomCount', value)} value={bathroomCount} />
            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Add a photo of your place' subtitle='show guests what your place looks like!' />
                <ImageUpload />
            </div>
        )
    }

  return (
    <Modal 
        title='Airbnb your home!'
        onClose={rentModal.onClose}
        isOpen={rentModal.isOpen}
        onSubmit={onNext}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS?.CATEGORY ? undefined : onBack}
        actionLabel={actionLabel}
        body={bodyContent}


    />
  )
}

export default RentModal