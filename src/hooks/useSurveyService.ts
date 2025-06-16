"use-client"

import { apiClient } from "@/services/api"
import { useState } from "react"

export default function useSurveyService() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const loadSurveys = async () => {
    setLoading(true)
    const surveys = await apiClient
      .get<{ survey_list: Survey[] }>("surveys")
      .finally(() => setLoading(false))
    console.log("Surveys fetched:", surveys.data)
    setSurveys(surveys.data.survey_list)
  }

  const uploadSurvey = async (file: File) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await apiClient.post("add-survey", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      await loadSurveys()
      return response.data
    } catch (error) {
      console.error("Error uploading survey:", error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  return {
    loadSurveys,
    surveys,
    uploadSurvey,
    isLoading,
    isUploading,
  }
}
