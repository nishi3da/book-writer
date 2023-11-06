import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { L } from "../../labels";
import { InputBase, InputLabel, alpha, styled } from "@mui/material";
import EditorGrid from "../EditorGrid";
import AuthorGrid from "../AuthorGrid";

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CustomInput = styled(InputBase)(({ theme }) => ({
        "&": {
            width: "100%",
            maxWidth: "100%",
        },
        "& .MuiInputBase-input": {
            borderRadius: 4,
            position: "relative",
            backgroundColor:
                theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
            border: "1px solid #ced4da",
            fontSize: 16,
            width: "100%",
            padding: "10px 12px",
            marginBottom: "10px",
            transition: theme.transitions.create([
                "border-color",
                "background-color",
                "box-shadow",
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
            ].join(","),
            "&S:focus": {
                boxShadow: `${alpha(
                    theme.palette.primary.main,
                    0.25
                )} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));

    const CustomInputLable = styled(InputLabel)(({ theme }) => ({
        "&": {
            fontSize: "25px",
            marginTop: "20px",
            color: "black",
        },
    }));

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                {L.BookGrid.AddBook.ButtonLabel}
            </Button>
            <Dialog open={open} onClose={handleClose} fullScreen>
                <DialogTitle>{L.BookGrid.AddBook.Dialog.Title}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText></DialogContentText> */}
                    <CustomInputLable shrink htmlFor="custom-input">
                        {L.BookGrid.AddBook.Dialog.BookTitle}
                    </CustomInputLable>
                    <CustomInput
                        placeholder={L.BookGrid.AddBook.Dialog.BookTitle}
                    />

                    <CustomInputLable shrink htmlFor="custom-input">
                        {L.BookGrid.AddBook.Dialog.BookSubTitle}
                    </CustomInputLable>
                    <CustomInput
                        placeholder={L.BookGrid.AddBook.Dialog.BookSubTitle}
                    />

                    <CustomInputLable shrink htmlFor="custom-input">
                        {L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
                    </CustomInputLable>
                    <CustomInput
                        type="number"
                        inputProps={{
                            min: 1,
                            max: 500,
                        }}
                        placeholder={
                            L.BookGrid.AddBook.Dialog.BookNumberOfArticles
                        }
                    />

                    <CustomInputLable shrink htmlFor="custom-input">
                        {L.BookGrid.AddBook.Dialog.BookNumberOfSections}
                    </CustomInputLable>
                    <CustomInput
                        type="number"
                        inputProps={{
                            min: 1,
                            max: 500,
                        }}
                        placeholder={
                            L.BookGrid.AddBook.Dialog.BookNumberOfSections
                        }
                    />

                    <CustomInputLable shrink htmlFor="custom-input">
                        編集者
                    </CustomInputLable>
                    <EditorGrid />

                    <CustomInputLable shrink htmlFor="custom-input">
                        執筆者者
                    </CustomInputLable>
                    <AuthorGrid />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {L.BookGrid.AddBook.Dialog.Cancel}
                    </Button>
                    <Button onClick={handleClose}>
                        {L.BookGrid.AddBook.Dialog.Ok}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
