import prisma from "@/lib/prisma"
import { getJobs } from "@/lib/data"
import Jobs from "./components/Jobs"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Index({jobs}) {
  const {data: session, status} = useSession()
  const router = useRouter()
  
  if(session && !session.user.name){
    router.push('/setup')
  }
  return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
      {!session && (
        <a
        className="flex justify-center w-24 px-8 py-2 mx-auto font-bold text-white bg-black border border-black rounded-full"
        href="/api/auth/signin"
        >login</a>
      )}
       <Jobs jobs={jobs}/>
        
    
    </div> 
  )
}

export async function getServerSideProps(context) {
 /*const jobs = await prisma.job.findMany({
    where: {
      published: true
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author:true,
    },
  })*/

  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))
  return {
    props: {
      jobs,
    },
  }
}