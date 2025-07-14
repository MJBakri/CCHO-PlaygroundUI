import { ColumnDef } from "@tanstack/react-table"
import { DOCUMENT_STATUS } from "./status"
import { Badge } from "@/components/ui/badge"
import { ActionButton } from "../survey-library/page"
import { useRouter } from "next/navigation"

export const surveyColumns: ColumnDef<Survey>[] = [
  {
    accessorKey: "title",
    header: "File Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = DOCUMENT_STATUS[row.getValue<DocumentStatus>("status")]

      return (
        <Badge
          variant={
            status === "Done"
              ? "default"
              : status === "Pending"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    header: "Actions",
    cell: ({ row, table }) => {
      const router = useRouter()
      console.log("DOCID", row.original)
      return (
        <ActionButton
          onClick={() => {
            router.push(
              `/survey-session/${row.original.document_id}/2dcf98ca-fec6-41eb-9de3-a98a64c8e9de`
            )
          }}
          disabled={row.original.status !== "done"}
          variant="outline"
          label="Start Survey"
        />
      )
    },
  },
]
export const analyticsColumns: ColumnDef<Analytics>[] = [
  {
    accessorKey: "title",
    header: "File Name",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const status = DOCUMENT_STATUS[row.getValue<DocumentStatus>("status")]

  //     return (
  //       <Badge
  //         variant={
  //           status === "Done"
  //             ? "default"
  //             : status === "Pending"
  //             ? "secondary"
  //             : "destructive"
  //         }
  //       >
  //         {status}
  //       </Badge>
  //     )
  //   },
  // },
  {
    header: "Actions",
    cell: ({ row, table }) => {
      const router = useRouter()
      console.log("DOCID", row.original)
      return (
        <ActionButton
          onClick={() => {
            router.push(
              `/analytics-session/${row.original.document_id}/2dcf98ca-fec6-41eb-9de3-a98a64c8e9de`
            )
          }}
          disabled={false}
          variant="outline"
          label="Start Session"
        />
      )
    },
  },
]
