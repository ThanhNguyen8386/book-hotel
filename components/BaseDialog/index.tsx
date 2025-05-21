// components/BaseDialog.tsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

interface BaseDialogProps {
    open: boolean;
    title?: string;
    children?: ReactNode;
    actions?: ReactNode;
    onClose?: () => void;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    hideCloseButton?: boolean;
}

const BaseDialog = ({
    open,
    title,
    children,
    actions,
    onClose,
    maxWidth = 'sm',
    fullWidth = true,
    hideCloseButton = false,
}: BaseDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            PaperProps={{
                sx: {
                    borderRadius: 3, // tương đương rounded-xl (~24px)
                },
            }}
        >
            {title && (
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pr: hideCloseButton ? 2 : 1,
                    }}
                    className="font-work"
                >
                    {title}
                    {!hideCloseButton && (
                        <IconButton onClick={onClose} size="small">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                </DialogTitle>
            )}
            <DialogContent dividers>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
};

export default BaseDialog;
