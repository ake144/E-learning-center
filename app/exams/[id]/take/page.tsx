'use client'

import TakeExamPage from "@/components/exams/takeExam"
import { useParams, useRouter } from "next/navigation"

const TakeExam = () => {
  
    const params = useParams()
  const router = useRouter()
  const examId = Number(params.id)
    return(
        <TakeExamPage examId={examId} />
    )
}

export default TakeExam;