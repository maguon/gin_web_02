import React from 'react';
import {Dialog, Typography} from '@mui/material';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: "#FFF",
        minWidth: 400
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});


const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, ...other} = props;
    return (
        <MuiDialogTitle disabletypography="true" className={classes.root} {...other}>
            <Typography style={{fontSize:"1.5rem"}}>{children}</Typography>
        </MuiDialogTitle>
    );
});


const DialogContent = withStyles((theme) => {
    return {
        root: {
            padding: theme.spacing(2),
        }
    }
})(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    }
}))(MuiDialogActions);

export default function SimpleModal(props) {
    const [open, setOpen] = React.useState(false);
    const {title, children, footer, maxWidth, ...other} = props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog aria-labelledby="customized-dialog-title" open={props.open} onClose={props.onClose} maxWidth={maxWidth} fullWidth>

            <DialogTitle id="customized-dialog-title">
                {props.title}
            </DialogTitle>

            <DialogContent dividers>
                {children}
            </DialogContent>

            {props.showFooter && (
                <DialogActions>
                    {props.footer}
                </DialogActions>
            )}
        </Dialog>
    )
}

