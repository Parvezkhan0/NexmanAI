import { DashboardPage } from "@/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()

  // Redirect to sign-in page if user is not authenticated
  if (!auth) {
    redirect("/sign-in")
  }

  // Find the user in the database based on their external ID
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  // Redirect to welcome page if the user is not found
  if (!user) {
    return redirect("/welcome")
  }

  const intent = searchParams.intent

  return (
    <DashboardPage title="Dashboard" cta="Create New" hideBackButton={false}>
      {/* Render the content of the DashboardPage */}
      {intent === "create" ? (
        <Button>
          <PlusIcon /> Create New Item
        </Button>
      ) : (
        <div>Welcome to your dashboard!</div>
      )}
    </DashboardPage>
  )
}

export default Page
