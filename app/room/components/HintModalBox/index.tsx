import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface HintModalBoxProps {
  children: ReactNode;
  url: string;
}

const HintModalBox: React.FC<HintModalBoxProps> = ({ children, url = "https://abes-acm.vercel.app/" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    // Only allow closing when explicitly triggered (not via outside clicks)
    // to prevent closing when clicking outside
    if (!open) return;
    setIsOpen(open);
  };
  return (
    <>
      <Dialog modal={true} onOpenChange={handleOpenChange}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Hint ?</DialogTitle>
            <DialogDescription>
              Scan the belew QR to get hint :)
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <QRCodeSVG
              value={url}
              size={160}
              bgColor="#000000"
              fgColor="#FFFFFF"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HintModalBox;
