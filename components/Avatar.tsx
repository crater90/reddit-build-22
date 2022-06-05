import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
    seed?: String
    large?: boolean
}

function Avatar({ seed, large }: Props) {
    const { data: session } = useSession()

    return (
        <div className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${large && 'h-20 w-20'}`}>
            <Image
                layout='fill'
                className=''
                src={`https://avatars.dicebear.com/api/open-peeps/${seed || session?.user?.name || 'placeholder'}.svg`}
            />
        </div>
    )
}

export default Avatar