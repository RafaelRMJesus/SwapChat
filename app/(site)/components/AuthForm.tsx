'use client';

import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
 
type Variant = 'signin' | 'signup';

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();
	const [variant, setVariant] = useState<Variant>('signin');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/users');
		}
	}, [session?.status, router]);


	const toggleVariant = useCallback(() => {
		if (variant === 'signin') {
			setVariant('signup');
		} else {
			setVariant('signin');
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		if (variant === 'signup') {
			axios.post('/api/register', data) 
			.then (()=> signIn('credentials', data))
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsLoading(false));
		}
		if (variant === 'signin') {
			signIn('credentials', {
				...data,
				redirect: false,
			})
			.then((callback) => {
				if (callback?.error) {
					toast.error('Something went wrong!');
				} 
				if (callback?.ok && !callback?.error) {
					toast.success('Logged in successfully!');
					router.push('/users');
				}
			})
			.finally(() => setIsLoading(false))
		}
	}

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, { redirect: false })
		.then((callback) => {
			if (callback?.error) {
				toast.error('Something went wrong!');
			}
			if (callback?.ok && !callback?.error) {
				toast.success('Logged in successfully!');
			}
		}).finally(() => setIsLoading(false));
	}

  return (
	<div
		className="
		mt-8
		sm:mx-auto
		sm:w-full
		sm:max-w-md
		"

	>
		<div
			className="
			bg-white
			py-8
			px-4
			shadow
			sm:rounded-lg
			sm:px-10
			"
		>
			<form
				className="space-y-6"
				onSubmit={handleSubmit(onSubmit)}
			>
				{variant === 'signup' && (
					
				<Input
					id='name'
					label="Name"
					register={register}
					errors={errors}
				/>
				)} 

				<Input
					id='email'
					label="Email Address"
					type='email'
					register={register}
					errors={errors}
				/>

				<Input
				id='password'
				label="Password"
				type='password'
				register={register}
				errors={errors}
				/>
				<div className='w-full' >
					<Button fullWidth type='submit' disabled={isLoading}>{variant === 'signin' ? 'Sign In': 'Sign Up'}</Button>
				</div>
			</form>
			<div className='mt-6'>
				<div className='relative'>
					<div
						className='
						absolute
						inset-0
						flex
						items-center'
					>
						<div className='w-full border-t border-gray-300' />

					</div>
					<div
						className='
						relative
						flex
						justify-center
						text-sm
						'
					>
						<span
							className='
							bg-white
							px-2
							text-gray-500
							'
						>
							Or continue with
						</span>
					</div>
				</div>
				<div className='mt-6 grid grid-cols-2 gap-3'>
					<div>
						<AuthSocialButton
							icon={BsGithub}
							onClick={() => socialAction('github')}
						/>
					</div>
					<div>
						<AuthSocialButton
							icon={BsGoogle}
							onClick={() => socialAction('google')}
						/>
					</div>
				</div>

				<div className='
				flex
				gap-2
				justify-center
				text-sm
				text-gray-500
				mt-6
				px-2'>
					<div>
						{variant === 'signin' ? 'Don\'t have an account?' : 'Already have an account?'}
					</div>
					<div
						onClick={toggleVariant}
						className='
						underline
						cursor-pointer
						'>
						{variant === 'signin' ? 'Sign Up' : 'Sign In'}
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default AuthForm;
