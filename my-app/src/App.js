import Header from './Components/Header';
import Register from './Components/Register';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Intro from './Components/Into';
import TechReg from './Components/TechReg';
import StuLogin from './Components/StuLogin';
import TeacherLogin from './Components/TeacherLogin';
import { Context } from './index';
import Header from './Components/Header';
import RateFix from './Components/RateFix';
import StuInput from './Components/StuInput';
import HeaderT from './Components/HeaderT';
import Header from './Components/Header';

import axios from 'axios';
import Page from './Components/Page';
import Home from './Components/Home';
import TechHome from './Components/TechHome';
import GlobalS from './Components/GlobalS';
import GlobalT from './Components/GlobalT';
import Details2 from './Components/Details2';



import ContactUs from './Components/ContactUs';
import About from './Components/About';
import Contests from './Components/Contests';
import HeaderT from './Components/HeaderT';


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
      <Route path='/about' element={<About/>}/>
      <Route path='/con' element={<Contests/>}/>
      <Route path='/page' element={<Page/>}/>
      <Route path='/home2' element={<><HeaderT/><TechHome/></>}/>
      <Route path="/home" element={<><Header/><Home/></>}/>
      <Route path='/globals' element={<GlobalS/>}/>
      <Route path='/globalt' element={<GlobalT/>}/>
      <Route path='/rate' element={<RateFix/>}/>

      <Route path="/det2" element={<Details2/>}/>
      <Route path='/stud' element={<StuInput/>}/>






      <Route path='/contact' element={<ContactUs/>}/>
      



     
    </Routes>
   </Router>
   
  );
}

export default App;
