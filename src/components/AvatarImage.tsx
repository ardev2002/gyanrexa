import Image from 'next/image'
import React from 'react'

export default function AvatarImage({ img, letter }: { img: string, letter: string }) {
    return (
        img ? <Image
            src={img}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full" />
            :
            <span className="text-2xl font-bold text-white bg-primary rounded-full w-10 h-10">{letter}</span>
    )
}
