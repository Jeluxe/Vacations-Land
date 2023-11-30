import React from 'react';
import { IconButton, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import _ from 'lodash';


class DialogComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editOpen: false,
            deleteOpen: false,
            id: this.props.vacation.id,
            description: '',
            destination: '',
            image: '',
            start_date: '',
            end_date: '',
            price: null,
        };
    }

    fixDate = (date) => {
        let d = _.split(date, 'T', 1)[0]
        d = _.split(d, '-', 3);
        d[2] = parseInt(d[2]) + 1;
        return d.join('-');
    }

    onChangeHandler = (value, field) => {
        if (field === 'price') {
            this.setState({ [field]: Number(value) });
        } else {
            this.setState({ [field]: value });
        }
    }

    openCloseHandle = (field, value) => {
        this.setState({ [field]: value });
    };

    DeleteHandle = value => {
        this.props.onDelete(value);
    }
    //input attribute maxlength="10"

    handleSave = () => {
        const vacationToUpdate = _.omit(this.state, ['editOpen', 'deleteOpen']);
        for (let field in vacationToUpdate) {
            if (vacationToUpdate[field] === '' || vacationToUpdate[field] === null) {
                if (field === 'start_date' || field === 'end_date') {
                    vacationToUpdate[field] = this.fixDate(this.props.vacation[field]);
                } else {
                    vacationToUpdate[field] = this.props.vacation[field];
                }
            }
        }

        if (_.difference(_.values(vacationToUpdate), _.values(this.props.vacation)).length > 0 &&
            Date.parse(vacationToUpdate.start_date) <= Date.parse(vacationToUpdate.end_date)) {
            this.props.onEdit(vacationToUpdate);
        }
        this.setState({ editOpen: false });
    };


    render() {
        const { id, description, destination, image, start_date, end_date, price } = this.props.vacation;
        return (
            <div>
                <IconButton aria-label="edit" onClick={() => this.openCloseHandle('editOpen', true)} >
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => this.openCloseHandle('deleteOpen', true)}>
                    <DeleteForeverIcon />
                </IconButton>
                <Dialog
                    open={this.state.deleteOpen}
                    onClose={() => this.openCloseHandle("deleteOpen", false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete it?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You won't be able to retrieve it after deleting it.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.openCloseHandle("deleteOpen", false)} color="secondary">
                            No, i'm not!
                        </Button>
                        <Button onClick={() => this.DeleteHandle(id)} color="primary" autoFocus>
                            Yes, I'm sure!
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.editOpen}
                    onClose={() => this.openCloseHandle("editOpen", false)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <TextField
                            defaultValue={destination}
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'destination')}
                            autoFocus
                            inputProps={{ maxlength: "50" }}
                            margin="dense"
                            label="Destination"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            defaultValue={description}
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'description')}
                            margin="dense"
                            inputProps={{ maxlength: "175" }}
                            label="Description"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            defaultValue={image}
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'image')}
                            margin="dense"
                            label="Image"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            defaultValue={this.fixDate(start_date)}
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'start_date')}
                            margin="dense"
                            label="Start Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            defaultValue={this.fixDate(end_date)}
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'end_date')}
                            margin="dense"
                            label="End Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            defaultValue={price}
                            onChange={({ target: { value } }) => this.onChangeHandler(value, 'price')}
                            margin="dense"
                            label="Price"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.openCloseHandle("editOpen", false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default DialogComponent;