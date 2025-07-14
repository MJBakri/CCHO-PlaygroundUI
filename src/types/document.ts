type DocumentStatus = "pending" | "done" | "error"

interface Survey {
  title: string
  description: string | null
  file_name: string
  document_id: string
  uploaded_on: number
  processed_finished: number | null
  status: DocumentStatus
  pages: number
  content: {
    whole_document: string
  }
}

interface Analytics {
  title: string
  description: string | null
  file_name: string
  document_id: string
  uploaded_on: number
  content: {
    whole: string
  }
}
