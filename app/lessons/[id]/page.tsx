'use client'

import CourseDetail from "@/components/lessons/details";
import { useParams } from "next/navigation";

const CourseDetailPage = () => {
    const params = useParams();

    const id = params?.id;



    return <div><CourseDetail  /></div>
}

export default CourseDetailPage;