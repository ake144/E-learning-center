'use client'

import BookDetailPage from "@/components/library/detailPage"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LibraryDetail=()=>{

     const params = useParams()
      const router = useRouter()
      const [showAccessDialog, setShowAccessDialog] = useState(false)

      const bookId = params.id as string
        
    return(

  <BookDetailPage   bookId={bookId} />

    )
}

export default LibraryDetail;