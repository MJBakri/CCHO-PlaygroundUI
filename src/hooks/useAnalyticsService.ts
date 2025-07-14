"use-client"

import { apiClient } from "@/services/api"
import { useState } from "react"

export default function useAnalyticsService() {
  const [analytics, setAnalytics] = useState<Analytics[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const loadAnalytics = async () => {
    setLoading(true)
    const analyticsSheet = await apiClient
      .get<{ analytics_list: Analytics[] }>("analytics")
      .finally(() => setLoading(false))
    setAnalytics(analyticsSheet.data.analytics_list)
  }

  const uploadAnalytics = async (file: File) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await apiClient.post("add-analytics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      await loadAnalytics()
      return response.data
    } catch (error) {
      console.error("Error uploading survey:", error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  return {
    loadAnalytics,
    analytics,
    uploadAnalytics,
    isLoading,
    isUploading,
  }
}
