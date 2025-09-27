import CourseDetailPage from "@/components/courses/courseDetail"

const courseDetail=({params}:{params:{id:string}})=>{
    return(
        <CourseDetailPage id={params.id} />
    )
}

export default courseDetail
    