import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {Box,CssBaseline,Paper,Toolbar} from '@mui/material';



import Header from './Header';
import Navi from './Navi';
const Frame = (props) => {  
  return (
     <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header/>
      
      <Navi />
      
      <Box sx={{ flexGrow: 1, p: 0,ml:2,mr:2 }}>
        <Toolbar />
         <Outlet/>
      </Box>
     </Box>
  );
};

export default Frame;