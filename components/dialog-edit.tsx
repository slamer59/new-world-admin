import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { usePathname } from "next/navigation"
import PlayerForm from "./forms/player-form"

export function DialogPlayerEdit({ playerData }) {
    const redirectPath = usePathname()
    console.log("🚀 ~ DialogPlayerEdit ~ redirectPath:", redirectPath)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <PlayerForm
                    player={playerData}
                    redirectPath={redirectPath}
                    revalidateThisPath={redirectPath}
                />
            </DialogContent>
        </Dialog>
    )
}
