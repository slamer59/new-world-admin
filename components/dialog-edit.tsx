import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { usePathname } from "next/navigation"
import PlayerForm from "./forms/player-form"

export function DialogPlayerEdit({ playerData }: { playerData: any }) {
    const redirectPath = usePathname()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <PlayerForm
                    player={playerData}
                />
            </DialogContent>
        </Dialog>
    )
}
