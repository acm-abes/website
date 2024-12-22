"use client";

import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ children, loading = false, loadingText, ...props }, ref) => {
    return (
      <Button {...props} ref={ref} disabled={loading || props.disabled}>
        <div className="flex items-center justify-center w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            {loading && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="mr-2"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
          <span>{loading && loadingText ? loadingText : children}</span>
        </div>
      </Button>
    );
  },
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
