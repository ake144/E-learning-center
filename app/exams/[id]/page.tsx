'use client'

import ExamDetailPage from "@/components/exams/detailPage"
import { useParams, useRouter } from "next/navigation"

const ExamDetail = ()=>{
     const params = useParams()
      const router = useRouter()
      const examId = Number(params.id)
    return(
        <ExamDetailPage examId={examId} />
    )
}

export default ExamDetail;