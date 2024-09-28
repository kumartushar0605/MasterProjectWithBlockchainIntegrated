import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Avatar, Text, useBreakpointValue, useDisclosure, useToast, useColorModeValue, Stack, HStack, Center, IconButton, Spinner } from '@chakra-ui/react';
import { FaPhone, FaComment,FaArrowRight, FaRedo } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Context } from '../index';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import config from '../config.json';
import collegeConnect from '../abis/collegeConnect.json';
import Chatwindow from './Chatwindow';

const DoubtBox = ({ name, email, semester, ether, price, doubt, _id, readyId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { studentt } = useContext(Context);
  const [buttonClicked, setButtonClicked] = useState(false);
  const boxBg = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('blue.500', 'blue.300');
  const [provider, setProvider] = useState(null);
  const [Tname, setTeacherName] = useState("");
  const [collegeConnectt, setcollegeConnect] = useState(null);
  const [account, setAccount] = useState(null);
  const [addresss, setAddress] = useState('');
  const [payment, setPayment] = useState("");
  const [sec, setSec] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);  // New loading state

  useEffect(() => {
    loadBlockchainData();
    fetchTeacher();
  
  }, []);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(ethers.utils.getAddress(accounts[0]));
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(ethers.utils.getAddress(accounts[0]));
    });
    const network = await provider.getNetwork();
    const CollegeConnect = new ethers.Contract(config[network.chainId].collegeConnect.address, collegeConnect, provider);
    setcollegeConnect(CollegeConnect);
  };

  const updateHandler = async () => {
    const emaill = studentt.email;
    try {
      setButtonClicked(true);
      await fetch(`http://localhost:5000/status/${emaill}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, _id }),
       
      });
      toast({
        title: "Success",
        description: "Payment done....",
        status: "Success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeacher = async () => {
    try {
      const response = await fetch(`http://localhost:5000/address/${email}`);
      const result = await response.json();
      setAddress(result.Address);
      setPayment(result.payment);
      setSec(result.secretCode);
      setTeacherID(result._id);
      setTeacherName(result.name);
    } catch (error) {
      console.log(error);
    }
  };

  const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
  };

  const deletee = async () => {
    try {
      setButtonClicked(true);
      await fetch(`http://localhost:5000/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, _id, readyId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();
      const transaction = await collegeConnectt.connect(signer).sendEther(addresss, { value: tokens(ether) });
      await transaction.wait(); 
      updatePayment();
      await fetchTeacher(); 
    setIsLoading(true);  // Start loading animation
   
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTeacher(); // Re-fetch data every 5 seconds
    }, 5000);
  
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // Empty dependency array ensures it runs only once on mount
  useEffect(() => {
    console.log("secccccccccccccccc"+sec)
    if (sec!=="L" && sec!=="") {
      // If `sec` is now populated, stop the loading animation and proceed
      setIsLoading(false);
      deletee();
      navigate("/meet", { state: { sec } });
    }
  }, [sec]);

  const buyHandler2 = () => {
    navigate("/checkout", { state: { teacherID, sec, email, _id, readyId } });
  };

  const updatePayment = async () => {
    try {
      await fetch(`http://localhost:5000/pay/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bg={boxBg}
      width={useBreakpointValue({ base: '90%', sm: '400px' })}
      mb={4}
      position="relative"
    >
      <HStack spacing={4}>
        <Avatar name={name} src={`https://api.adorable.io/avatars/150/${email}.png`} />
        <Stack spacing={1}>
          <Text fontSize="xl" fontWeight="bold" color={headingColor}>{name}</Text>
          <Text fontSize="md" color="gray.600">Email: {email}</Text>
          <Text fontSize="md" color="gray.600">Semester: {semester}</Text>
          <Text fontSize="md" color="gray.600">Your doubt: {doubt}</Text>
          <Text fontSize="md" color="gray.600">Rating: <strong>1</strong></Text>
          <Text fontSize="md" fontWeight="bold" color="teal.500">
            Rate: {ether > 0 ? `${ether} Ether` : ''}{ether > 0 && price > 0 ? ' | ' : ''}{price > 0 ? `₹${price}` : ''}
          </Text>
        </Stack>
      </HStack>
      <HStack spacing={4} mt={4} justify="center">
        <Button onClick={onOpen} leftIcon={<FaComment />} colorScheme="blue" variant="outline" size="sm">
          Chat
        </Button>
        {!buttonClicked && (
          <Button
            onClick={updateHandler}
            rightIcon={<FaArrowRight />}
            colorScheme="purple"
            variant="outline"
            size="sm"
          >
            Continue
          </Button>
        )}
      </HStack>
      {isOpen && <Chatwindow name={Tname} onClose={onClose} />}
      {buttonClicked && (
        <HStack spacing={4} mt={4} justify="center">
          {ether > 0 && (
            <Button colorScheme="yellow" variant="outline" size="sm" onClick={buyHandler}>
              Pay via Ether
            </Button>
          )}
          {price > 0 && (
            <Button onClick={buyHandler2} colorScheme="orange" variant="outline" size="sm">
              Pay via INR
            </Button>
          )}
        </HStack>
      )}

      {/* Loading Animation Box */}
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1"
          borderRadius="lg"
        >
          <Center>
            <Spinner size="xl" color="blue.500" />
            <Text ml={3} fontSize="lg" color="white">Wait for a while...</Text>
          </Center>
        </Box>
      )}
    </Box>
  );
};


// App component
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { email } = location.state || {};
  const { studentt } = useContext(Context);

  console.log(studentt.email);
  const emaill = studentt.email;
  
  useEffect(() => {
    // Fetching data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data'); // Adjust the URL to your backend
        const result = await response.json();
        console.log(result);
        console.log("checkingg")
       
        console.log(studentt.email)

        const filterData = result.filter((teacher) => teacher.Semail === emaill);
        console.log(filterData);
        setData(filterData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [email, emaill]);

  return (
    <Center minH="100vh" bg={useColorModeValue('gray.100', 'gray.800')} position="relative">
      <IconButton
        icon={<FaRedo />}
        colorScheme="blue"
        variant="solid"
        size="lg"
        position="absolute"
        top={4}
        right={4}
        boxShadow="lg"
        onClick={() => window.location.reload()}
        aria-label="Refresh page"
        borderRadius="full"
        _hover={{ bg: useColorModeValue('blue.600', 'blue.400') }}
        _active={{ bg: useColorModeValue('blue.700', 'blue.500') }}
      />
      <Stack spacing={6} p={6} maxWidth="1200px" width="full">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center">
          Welcome to the Doubts Clearing Platform
        </Text>
        <Text fontSize="lg" textAlign="center" color="gray.600">
          Here you can get in touch with experts to resolve your queries quickly and efficiently.
        </Text>
        {loading ? (
          <Text fontSize="lg" textAlign="center" color="gray.600">
            Waiting for response...
          </Text>
        ) : data.length === 0 ? (
          <Text fontSize="lg" textAlign="center" color="gray.600">
            Waiting for the response....
          </Text>
        ) : (
          <HStack spacing={4} wrap="wrap" justify="center">
            {data.map((item, index) => (
              <DoubtBox 
                key={index} 
                name={item.name} 
                email={item.email} 
                semester={item.semester} 
                ether={item.ether}
                price={item.price}
                doubt={item.doubt}
                _id={item._idS}
                readyId={item._id}
              />
            ))}
          </HStack>
        )}
      </Stack>
    </Center>
  );
};

export default App;
