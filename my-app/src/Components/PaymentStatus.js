import React, { useState, useEffect } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import {
  Box,
  Spinner,
  Input,
  useToast,
  VStack,
  Text,
  Heading,
  Button,
} from '@chakra-ui/react';

const PaymentStatus = () => {
    const location = useLocation();
    const { emaill } = location.state || '';
    const [sec, setSec] = useState('');
    const navigate = useNavigate();


  const [status, setStatus] = useState('NO');
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  


  useEffect(() => {
    console.log("hiii")
    const fetchStatus = async () => {
      try {
        
        // Replace this with your actual API call to check status from MongoDB
        const response = await fetch(`http://localhost:5000/address/${emaill}`);
        const data = await response.json();
        console.log(data)

        if (data.payment === 'YES') {
          setLoading(false);
          setStatus('YES');
        } else {
          setStatus('NO');
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    const interval = setInterval(fetchStatus, 3000); // Poll every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  

  useEffect(() => {
    if (status === 'YES') {
      toast({
        title: 'Payment Successful!',
        description: "Please enter the secret code to proceed.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [status, toast]);


  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sec/${emaill}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secretCode: sec }),
        
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Secret code submitted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // Handle successful submission, maybe navigate to another page

        navigate("/meet",{state:{sec}});
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to submit the secret code.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, teal.500, blue.500)"
    >
      <VStack
        spacing={6}
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        maxW="400px"
        w="full"
        textAlign="center"
      >
        <Heading size="lg" color="teal.600">
          Payment Status
        </Heading>

        {loading ? (
          <VStack spacing={4}>
            <Spinner
              size="xl"
              speed="0.8s"
              thickness="4px"
              color="teal.500"
              emptyColor="gray.200"
            />
            <Text fontSize="md" color="gray.600">
              Waiting for the payment to be done. Please wait...
            </Text>
          </VStack>
        ) : (
          <VStack spacing={4}>
            <Text fontSize="lg" color="green.500">
              Payment received! Enter any room code
            </Text>
            <Input
              placeholder="Enter your secret code"
              size="md"
              focusBorderColor="teal.500"
              onChange={(e) => setSec(e.target.value)}
              color={'black'}
              borderColor={'teal'}
              value={sec}
              _hover={{ borderColor: 'teal.400' }}
            />
            <Button
              colorScheme="teal"
              variant="solid"
              size="md"
              w="full"
              onClick={handleSubmit}
              mt={4}
            >
              Submit
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default PaymentStatus;
