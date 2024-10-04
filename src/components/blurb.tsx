import { Card, CardContent } from "@/components/ui/card"

export default function Blurb() {
  return (
    <Card className="mx-auto my-8 bg-primary/8">
      <CardContent className="p-6">
        <p className="text-sm text-left text-primary">
          Note: Thoughts I add here are <em className="font-medium">my personal notes and learnings only.</em>
        </p>
      </CardContent>
    </Card>
  )
}