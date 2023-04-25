import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import Link from 'next/link'

import { getJob } from 'lib/data'
import prisma from 'lib/prisma'

export default function Apply({ job }) {
  const [coverletter, setCoverletter] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()

  if (!session) return null

  return (
    <form
    onSubmit={async (e) => {
        e.preventDefault()

        await fetch('/api/application', {
          body: JSON.stringify({
            coverletter,
            job: job.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        router.push('/dashboard')
      }}
    >
      <div className='flex flex-col w-1/2 mx-auto'>
        <div className='mt-10'>
          <div className='p-4 m-4 text-center'>
            <Link
              href={`/job/${job.id}`}
              className='mb-10 text-sm font-bold underline'>
              back
            </Link>
          </div>
          <div className='p-4 m-4 text-center'>
            <h2 className='mb-10 text-4xl font-bold'>
              Apply to the job {job.title}
            </h2>
          </div>

          <div className='mt-20 mb-4'>
            <div className='pl-16 pr-16 -mt-6'>
              <p className='mt-3 text-base font-normal'>{job.description}</p>
              <div className='mt-4'>
                <h4 className='inline'>Posted by</h4>
                <div className='inline'>
                  <div className='inline ml-3 -mt-6'>
                    <span>
                      <Link href={`/company/${job.author.id}`}>
                        <span className='text-base font-medium underline color-primary'>
                          {job.author.name}
                        </span>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-2 mt-2 mr-1 '>
          <textarea
            className='w-full p-4 text-lg font-medium bg-transparent border outline-none color-primary '
            rows={6}
            cols={50}
            placeholder='Cover letter'
            required
            onChange={(e) => setCoverletter(e.target.value)}
          />
        </div>
        <div className='mt-5'>
          <button className='float-right px-8 py-2 mt-0 font-bold border rounded-full'>
            Apply to this job
          </button>
        </div>
      </div>
    </form>
  )
}

export async function getServerSideProps(context) {
  let job = await getJob(context.params.id, prisma)
  job = JSON.parse(JSON.stringify(job))

  return {
    props: {
      job,
    },
  }
}