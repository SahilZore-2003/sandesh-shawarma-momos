import {
    Dialog,
    DialogContent,
    DialogOverlay
} from "@/components/ui/dialog";
import step1 from "../../public/step-1.jpg"
import step2 from "../../public/step-2.jpg"
import step3 from "../../public/step-3.jpg"

const DownloadAppSteps = ({
    showDialog, setShowDialog
}) => {
    return (
        <Dialog open={showDialog}>
            <DialogOverlay onClick={() => setShowDialog(false)} className={"bg-transparent"}>
                <DialogContent className={"max-h-[70vh] overflow-y-scroll"}>
                    <div className="pb-4 border-b-2 border-border">
                        <h1 className="font-bold text-xl">Step 1</h1>
                        <p className="flex items-center text-sm">click icon on right top corner.</p>
                        <img className="mt-2" src={step1} alt="" />
                    </div>
                    <div className="pb-4 border-b-2 border-border">
                        <h1 className="font-bold text-xl">Step 2</h1>
                        <p className="flex items-center text-sm">click icon add to home screen button.</p>
                        <img className="mt-2" src={step2} alt="" />
                    </div>
                    <div className="pb-4">
                        <h1 className="font-bold text-xl">Step 3</h1>
                        <p className="flex items-center text-sm">click on install button</p>
                        <img className="mt-2" src={step3} alt="" />
                    </div>

                </DialogContent>
            </DialogOverlay>
        </Dialog>

    )
}

export default DownloadAppSteps
