"use client"

import { DataTable } from "@/components/table"
import useSurveyService from "@/hooks/useSurveyService"
import { get } from "http"
import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { analyticsColumns, surveyColumns } from "../config/tables"
import { Button } from "@/components/ui/button"
import { LucideIcon, RefreshCcw, Upload } from "lucide-react"
import useAnalyticsService from "@/hooks/useAnalyticsService"

function InterfaceButton({
  buttonIcon: ButtonIcon,
  variant,
  label,
  onClick,
  ...props
}: {
  buttonIcon?: React.ComponentType<{ size?: number }>
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  label?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Button
      {...props}
      onClick={onClick}
      variant={variant}
      className="flex item-center justify-center gap-2"
    >
      {ButtonIcon && <ButtonIcon size={18} />}
      {label}
    </Button>
  )
}

export function ActionButton({
  buttonIcon: ButtonIcon,
  variant,
  label,
  onClick,
  disabled,
  ...props
}: {
  buttonIcon?: React.ComponentType<{ size?: number }>
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  label?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      className="flex p-1 px-4 h-fit text-xs rounded-full item-center justify-center gap-2"
      {...props}
    >
      {ButtonIcon && <ButtonIcon size={18} />}
      {label}
    </Button>
  )
}

export default function SurveyLibrary() {
  const { loadAnalytics, analytics, isLoading, isUploading, uploadAnalytics } =
    useAnalyticsService()

  const InputFileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadAnalytics()
  }, [])
  return (
    <div className="flex-grow h-0 space-y-3">
      <div className="mx-6 mt-11 mb-3">
        <h2 className="text-2xl font-bold text-center">Analytics Library</h2>
      </div>
      <div className="max-w-xl border justify-center gap-3 flex border-neutral-200 rounded-xl mx-auto p-4 shadow-lg mb-7">
        <InterfaceButton
          onClick={() => {
            InputFileRef.current?.click()
          }}
          variant="outline"
          buttonIcon={Upload}
          label="Upload"
        />
        <InterfaceButton
          onClick={() => {
            loadAnalytics()
          }}
          variant="outline"
          buttonIcon={RefreshCcw}
          label="Refresh"
        />
        <input
          onChange={(e) => {
            if (!e.target.files) {
              console.warn("No files to upload.")
              return
            }
            uploadAnalytics(e.target.files[0])
          }}
          ref={InputFileRef}
          type="file"
          className="hidden"
        />
      </div>
      <div className="h-[50vh]  overflow-auto mx-6">
        <DataTable
          columns={analyticsColumns}
          data={analytics}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
