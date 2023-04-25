import { getJob } from "@/lib/data"
import prisma from "@/lib/prisma"
import Link from "next/link"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { alreadyApplied } from "@/lib/data"


export default function Job({ job, applied }) {
    return (
        <>
            <div className='flex flex-col w-1/2 mx-auto'>
                <div className='text-center p-4 m-4'>
                    <Link href={`/`} className='mb-10 text-sm font-bold underline'>
                        back
                    </Link>
                </div>
                <div className='text-center p-4 m-4'>
                    <h2 className='mb-10 text-4xl font-bold'>{job.title}</h2>
                </div>
                {applied ? (
                    <div className="mt-20 flex justify-center">
                        <Link href={`/dashboard`}>
                            <button className="border px-8 py-2 mt-0 font-bold rounded-full bg-black text-white">

                                You already applied
                            </button>
                        </Link>

                    </div>

                ):(
                <div className='mt-20 flex justify-center'>
                        <Link href={`/job/${job.id}/apply`}>
                            <button className="border px-8 py-2 mt-0 font-bold rounded-full bg-black text-white">
                                Apply to this job
                                </button>
                        </Link>
                </div>

                )}             
                <div className='mt-4'>
                    <h4 className='inline'>Posted by</h4>
                    <div className='inline'>
                        <div className='ml-3 -mt-6 inline'>
                            <span>
                                <Link href={`/company/${job.author.id}`}>
                                    <span className='text-base font-medium color-primary underline'>
                                        {job.author.name}
                                    </span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
    let job = await getJob(context.params.id, prisma)
    job = JSON.parse(JSON.stringify(job))

    const applied = await alreadyApplied(
        session.user.id,
        context.params.id,
        prisma
    )
  
    return {
        props: {
            job,
            applied,
        }
    }
}