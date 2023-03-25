import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { getSysServerInfo } from '../../store/actions/main/SysInfoAction';
import {Box,Card,CardContent,CardHeader,CircularProgress,Divider,Grid,LinearProgress,Typography} from '@mui/material';
const SysInfo = (props) => {
    const {sysInfoReducer,getServerInfo} = props;
    useEffect(()=>{
        getServerInfo()
        console.log(sysInfoReducer)
    },[])
    return (
        <div>
            <Grid container spacing={4}>
            <Grid item xs={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader   title="Disk" />
                        <Divider/>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item xs={7}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Total (MB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.disk.totalMb}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Used (MB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.disk.usedMb}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Total (GB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.disk.totalGb}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Used (GB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.disk.usedGb}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress variant="determinate" size={100} thickness={5} value={sysInfoReducer.serverInfo.disk.usedPercent}/>
                                        <Box
                                            sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            }}
                                        >
                                            <Typography variant="h5" component="div" color="text.secondary">
                                            {`${Math.round(sysInfoReducer.serverInfo.disk.usedPercent)}%`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader   title="RAM" />
                        <Divider/>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item xs={7}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Total (MB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.ram.totalMb}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Used (MB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.ram.usedMb}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Total (GB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{Number.parseInt(sysInfoReducer.serverInfo.ram.totalMb/1000)}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">Used (GB)</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">{Number.parseInt(sysInfoReducer.serverInfo.ram.usedMb/1000)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress variant="determinate" size={100} thickness={5} value={sysInfoReducer.serverInfo.ram.usedPercent}/>
                                        <Box
                                            sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            }}
                                        >
                                            <Typography variant="h5" component="div" color="text.secondary">
                                            {`${Math.round(sysInfoReducer.serverInfo.ram.usedPercent)}%`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader                        
                            title="Runtime"
                        />
                        <Divider/>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">OS</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.os.goos}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">CPU Number</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.os.numCpu}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">Compiler</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.os.compiler}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">Go Version</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.os.goVersion}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">Goroutine</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.os.numGoroutine}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader   title="CPU" />
                        <Divider/>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">Number Of Cores</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">{sysInfoReducer.serverInfo.cpu.cores}</Typography>
                                </Grid>
                            </Grid>
                            {sysInfoReducer.serverInfo.cpu.cpus && sysInfoReducer.serverInfo.cpu.cpus.map((item,index) => (
                                <Grid container alignItems="center">
                                    <Grid item xs={5}>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">Core {index} </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value={item} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{`${Math.round(item)}%`}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))}
                            
                            
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
            
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sysInfoReducer : state.SysInfoReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getServerInfo :()=>{dispatch(getSysServerInfo())}
});

export default connect(mapStateToProps, mapDispatchToProps)(SysInfo);