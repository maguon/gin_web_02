import React from 'react';
import {connect} from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const INITIAL_STATE = {
    darkMode: false,
};



const  ThemeContext = (props) =>{
    const {darkMode,children} = props
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode: darkMode,
            },
          })
      );
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
const mapStateToProps = (state) => {
    return {
        darkMode: state.AppReducer.darkMode
    }
};

const mapDispatchToProps = (dispatch) => ({
    toggleDarkMode: (values) => {
        
        
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ThemeContext);
 