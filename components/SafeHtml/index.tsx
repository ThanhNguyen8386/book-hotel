"use client";

import React, { useState } from "react";
import DOMPurify from "dompurify";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
import clsx from "clsx";

type Props = {
    html: string;
    className?: string;
    title?: string;
    clampLines?: number; // số dòng hiển thị trước khi cắt
};

function SafeHtmlWithDialog({
    html,
    className = "",
    title = "Xem chi tiết",
    clampLines = 3
}: Props) {
    const [open, setOpen] = useState(false);
    const sanitizedHtml = DOMPurify.sanitize(html);

    return (
        <>
            <div className={`relative ${className}`}>
                <div
                    className={clsx(
                        "text-sm text-gray-700 max-w-none",
                        clampLines === 1 && "line-clamp-1",
                        clampLines === 2 && "line-clamp-2",
                        clampLines === 3 && "line-clamp-3",
                        clampLines === 4 && "line-clamp-4",
                        clampLines === 5 && "line-clamp-5",
                        clampLines === 6 && "line-clamp-6"
                    )}
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
                <div className="text-right mt-1">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Xem thêm
                    </button>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 } // bo góc đẹp
                }}
            >
                <DialogTitle className="flex justify-between items-center">
                    {title}
                    <IconButton onClick={() => setOpen(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <div
                        className="prose max-w-none text-sm text-gray-800"
                        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default dynamic(() => Promise.resolve(SafeHtmlWithDialog), { ssr: false });