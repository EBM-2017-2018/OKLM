import {createMuiTheme} from 'material-ui';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#18435a',
            light: '#385f71',
            dark: '#01161e'
        },
        secondary: {
            main: '#ff7800',
            contrastText: '#f5f0f6'
        }
    }
});

export default theme;
