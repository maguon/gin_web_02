import { useEffect } from 'react';
import './App.css';
import {connect} from 'react-redux';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { usePromiseTracker } from "react-promise-tracker";
import LoadProgress from './pages/layout/LoadProgress';

const {routes} = require('./routers');
const App = (props) =>{
  const {appReducer} = props;
  const { promiseInProgress } = usePromiseTracker();
  useEffect(()=>{
  },[])
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((router) => {
            if (router.key=="index" && router.children ) {
              
              return (
                <Route path={router.path} key={router.key} element={router.component} >
                    {
                      router.children.map((childrenRouter) => {
                        let routerPath ;
                        if(childrenRouter.path.indexOf('/:')>0){
                          routerPath =childrenRouter.path.substring(0, childrenRouter.path.indexOf('/:', 1))
                        }else{
                          routerPath = childrenRouter.path
                        }
                        //console.log(childrenRouter.path,routerPath)  
                        if(appReducer.currentUserMenu.linkMenu && appReducer.currentUserMenu.linkMenu.has(routerPath)){
                          console.log(childrenRouter.path) 
                          return <Route path={childrenRouter.path} key={childrenRouter.key} element={childrenRouter.component} />
                        }
                      })
                    }
                </Route>
              )
            } else if(router.key=="index" ){
              
              let routerPath ;
              if(router.path.indexOf('/:', 1)>0){
                routerPath =router.path.substring(0, router.path.indexOf('/:', 1))
              }else{
                routerPath = router.path
              }
              if(appReducer.currentUserMenu.linkMenu && appReducer.currentUserMenu.linkMenu.has(routerPath)){
                
                return <Route path={router.path} key={router.key} element={router.component} />
              }
            }else{
              return <Route path={router.path} key={router.key} element={router.component} />
            }            
          })
        }
      </Routes>
      { promiseInProgress && <LoadProgress/>}
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    appReducer: state.AppReducer
  }
};

const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
