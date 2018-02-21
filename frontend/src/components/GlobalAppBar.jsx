import React, {PureComponent} from 'react';
import {AppBar, Toolbar, Typography} from 'material-ui';

class GlobalAppBar extends PureComponent {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        EBM Boilerplate
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default GlobalAppBar;
