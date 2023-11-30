import React from 'react';
import _ from 'lodash';
import { Card, CardMedia, CardContent, Typography, IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DialogComponent from './dialog-component';

const useStyles = makeStyles({
    root1: {
        width: 300,
        height: 380,
        margin: '15px 0',
    },
    media: {
        height: 140,
    },
});


export default function CardComponent({ props: { reduxStore }, vacation, onDelete, onEdit, onFollow }) {
    const classes = useStyles();

    const { description, destination, image, start_date, end_date, price } = vacation;

    const onFollowChange = id => {
        onFollow(id);
    }

    const checkIsAdmin = () => {
        if (reduxStore.isAdmin === 1) {
            return (
                <DialogComponent
                    vacation={vacation}
                    onEdit={value => onEdit(value)}
                    onDelete={id => onDelete(id)}
                />
            )
        } else {
            return <IconButton
                size="small"
                color={!_.isUndefined(reduxStore.followedVacations.find(x => x.vacation_id === vacation.id)) ?
                    "secondary" :
                    "default"}
                onClick={() => onFollowChange(vacation.id)}
            >
                <FavoriteIcon />
            </IconButton>
        }
    }

    return (
        <div>
            <Card className={classes.root1}>
                <CardMedia
                    className={classes.media}
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {destination}
                    </Typography>
                    <Typography variant="body2" style={{ overflow: 'auto', height: '80px' }} color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <Typography
                    style={{ marginLeft: '10px' }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    start date:{new Date(start_date).toLocaleDateString()}
                </Typography>
                <Typography
                    style={{ marginLeft: '10px' }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    end date:{new Date(end_date).toLocaleDateString()}
                </Typography>
                <Typography
                    style={{ float: 'left', marginLeft: '10px' }}
                    variant="overline"
                    color="textSecondary"
                    component="p"
                >
                    price: {price}$
                    </Typography>
                <div align="right" style={{ marginRight: '5px' }}>
                    {checkIsAdmin()}
                </div>
            </Card>
        </div>);
}