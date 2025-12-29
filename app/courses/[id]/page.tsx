import CourseDetailPage from "@/components/courses/courseDetail"

const courseDetail=async ({params}:{params: Promise<{id:string}>})=>{
    console.log('iddd', params)
    const { id } = await params

    console.log('id', id)
 
    return(
        <CourseDetailPage id={id} />
    )
}

export default courseDetail
    