import prisma from "@/lib/prisma"
import { fromJSON } from "postcss"
import { getJobs } from "@/lib/data"
import Jobs from "./components/Jobs"

export default function Index({jobs}) {
  return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
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