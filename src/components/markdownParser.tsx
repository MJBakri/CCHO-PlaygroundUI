import Markdown from "react-markdown"

interface MarkdownParserProps {
  children: string
}

export default function MarkdownParser({ children }: MarkdownParserProps) {
  return (
    <Markdown
      components={{
        p: ({ node, ...props }) => <p {...props} className="mb-4" />,
        li: ({ node, ...props }) => (
          <li {...props} className="last:mb-2 list-disc list-inside" />
        ),
      }}
    >
      {children}
    </Markdown>
  )
}
