import Link from "next/link"

const Job = ({job, isDashboard}) => {
    return (
        <div className='mb-4 mt-20 pl-16 pr-16'>
            <Link href={`/job/${job.id}`} className="text-xl font-bold underline">{job.title}</Link>
            <h2 className="text-base font-normal mt-3">{job.description}</h2>
            <div className="mt-4">
                {isDashboard && job.published && (
                    <span className="bg-black text-white uppercase text-sm p-2 mr-5">
                        published
                    </span>
                )}
                {isDashboard && !job.published && (
                    <span className="bg-black text-white uppercase text-sm p-2 mr-5">
                        Unpublished
                    </span>
                )}
                <p className="inline">Posted by</p>
                <span className='pl-1 text-base font-medium underline color-primary'>
                    {job.author.name}
                </span>

            </div>

        </div>
    )
}
export default Job