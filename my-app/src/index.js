import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider,extendTheme, ColorModeScript } from '@chakra-ui/react';
import App from './App';
import { createContext, useState } from 'react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
export const Context = createContext();

const AppWrapper = ()=>{

  const [studentt,setStudentt] = useState({});
  const [teacherr,setTeacherr] = useState({});
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [TeIsAuthenticated,setTeIsAuthenticated]= useState(false);
  

  return(
      <Context.Provider value={{
          studentt,
          setStudentt,
          teacherr,
         setTeacherr,
         isAuthenticated,
         setIsAuthenticated,
         TeIsAuthenticated,
         setTeIsAuthenticated
      }}>
          {/* <StrictMode> */}
  <ColorModeScript/>
<ChakraProvider>
{/* <ColorModeSwitcher/> */}

  <App />
</ChakraProvider>
  {/* </StrictMode> */}
      </Context.Provider>
  )
} 

const theme = extendTheme({ config });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
  //   <ChakraProvider theme={theme}>
  //     <App />
  //   </ChakraProvider>
  // </React.StrictMode>
  <AppWrapper/>
);
