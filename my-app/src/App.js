import Header from './Components/Header';
import Register from './Components/Register';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Intro from './Components/Into';
import TechReg from './Components/TechReg';
import StuLogin from './Components/StuLogin';
import TeacherLogin from './Components/TeacherLogin';
import { Context } from './index';
import axios from 'axios';
import { useContext ,useEffect} from 'react';


function App() {
  const {studentt,setStudentt,teacherr,setTeacherr,setIsAuthenticated,setTeIsAuthenticated} = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Tme`, {
          withCredentials: true,
        });
        setTeacherr(response.data.user);
        
        console.log(response.data.user);
        setIsAuthenticated(true);
        setTeIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
         setTeacherr({})
      }
      
    };

    const fetchDataa = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Sme`, {
          withCredentials: true,
        });
        setStudentt(response.data.user);
        setIsAuthenticated(true)
        console.log("hiimm")
        console.log(response.data.user);

        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setStudentt({});
        
      }
      
    };

    fetchData();
    fetchDataa();

  }, [setStudentt,setTeacherr]);
  return (    
   <Router>
    <Routes>
     
      <Route path='/Slogin' element={<StuLogin/>} />
      <Route path='/Tlogin' element={<TeacherLogin/>}/>
      <Route path='/res' element={<Register/>}/>
      <Route path='/ress' element={<TechReg/>}/>
      <Route path='/' element={<Intro/>}/>
     
    </Routes>
   </Router>
   
  );
}

export default App;
