import React, { useContext, useState } from 'react';
import { ChakraProvider, Box, Image, Input, Button, keyframes,VStack, Text, useToast, Textarea } from '@chakra-ui/react';
import img from '../Assests/CC.png'
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
function GlobalS() {
  const [doubt, setDoubt] = useState('');
  const toast = useToast();
  const {studentt} = useContext(Context);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setDoubt(e.target.value);
  };
  const colorChange = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;


  const handleSubmit = async () => {
    if (!doubt) {
      toast({
        title: "Input is empty.",
        description: "Please enter your doubt before submitting.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/doubts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
             doubt , 
             sem :studentt.semester,
             name:studentt.name,
             email:studentt.email,
             chapter:"",
             subject:"",
             global:"YES"
            }),
      });

      if (response.ok) {
        toast({
          title: "Doubt Submitted.",
          description: "Your doubt has been successfully submitted.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setDoubt('');  // Clear the input field after successful submission
        navigate("/accept")
        
      } else {
        toast({
          title: "Submission Failed.",
          description: "There was an error submitting your doubt. Please try again later.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network Error.",
        description: "Unable to connect to the backend. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        bgGradient="linear(to-r, teal.400, blue.500)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={4}
        
      >
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="xl"
          padding={8}
        //   maxW="lg"  // Increased width
        width={800}
          textAlign="center"
        >
          <VStack spacing={5}>
            <Text color="gray.600">Ask your doubts globally.</Text>
            <Image
  boxSize="150px"
  src={img}
  alt="Profile Image"
  borderRadius="full"
  objectFit="cover"
  // boxShadow="0 0 20px rgba(255, 255, 255, 0.7)"
  animation={`${colorChange} 5s infinite linear`}
  boxShadow="0px 10px 15px rgba(0, 0, 0, 0.4)"  // Custom shadow with more spread and opacity
/>
            <Textarea
              placeholder=" youAskr doubts"
              variant="filled"
              borderColor={'teal'}
              color={'black'}
              focusBorderColor="teal.500"
              size="lg"
              height={20}
              value={doubt}
              onChange={handleInputChange}
              width="100%"  // Made input field wider
            />
            <Button
              colorScheme="teal"
              size="lg"
              width="100%"
              onClick={handleSubmit}
            >
              Ask
            </Button>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default GlobalS;
