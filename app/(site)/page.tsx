import Image from "next/image"
import AuthForm from "./components/AuthForm"
import { SiSublimetext } from 'react-icons/si';

export default function Home() {
  return (
    <div className="
    flex
    min-h-full
    flex-col
    justify-center
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
    background-cover
    "
    style={{backgroundImage: `url(${"/images/backgreen.svg"})`}}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md"> 
        <Image
          src={"/images/logo.svg"}
          alt="Logo"
          width="60"
          height="60"
          className="mx-auto w-auto"
        />
        <h2 
        className="
        mt-6
        text-center
        text-3xl
        font-extrabold
        text-gray-900"
        >
          Sign up to your account
        </h2>
        <AuthForm />
        <h4
                className="
                bg-white
                py-8
                px-4
                shadow
                sm:rounded-lg
                sm:px-10
                mt-[10%]
                text-center
                text-xl
                font-bold
                text-gray-900"
        >This is a portfolio project <br />
         Rafael Jesus</h4>
      </div>
    </div>
  )
}
