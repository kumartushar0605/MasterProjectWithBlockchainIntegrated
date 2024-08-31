import React from 'react';
import { Box, Button, Heading, Text, HStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionIcon } from '@chakra-ui/icons'; // Import icons
import backgroundImage from '../Assests/book.jpg'; // Update with your image path
import {FaSchool,FaGlobe} from 'react-icons/fa'

const Page = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sem, email, name } = location.state || '';

    const semester = () => {
        navigate("/home", { state: { sem, email, name } });
    };

    const global = () => {
        navigate("/globals");
    };

    return (
        <Box
            bgImage={`url(${backgroundImage})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgAttachment="fixed"
            p={8}
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            overflow="hidden"
        >
            {/* Overlay to create a blur effect */}
            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bg="rgba(0, 0, 0, 0.6)" // Darker overlay for better contrast
                backdropFilter="blur(10px)" // Blur effect
                zIndex={-1}
            />

            <HStack spacing={8} align="center">
                <Box
                    bgGradient="linear(to-r, black, gray.900)" // Gradient background for a more dynamic look
                    borderRadius="2xl" // Extra rounded corners for a softer look
                    boxShadow="dark-lg"
                    p={8}
                    width="100%"
                    maxWidth="500px"
                    height="auto"
                    borderLeftWidth={8}
                    borderLeftColor="teal.400" // Bright accent color
                    textAlign="center"
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                        transform: 'scale(1.08)',
                        boxShadow: '2xl',
                        bgGradient: 'linear(to-r, gray.900, black)', // Gradient shift on hover
                    }}
                >
                    <FaSchool boxSize={8} color="teal.300" mb={4} /> {/* Added icon */}
                    <Heading as="h2" size="lg" mb={4} color="teal.300" fontFamily="Poppins">
                        Ask Semester Questions
                    </Heading>
                    <Text fontSize="md" mb={6} color="gray.400" fontFamily="Poppins">
                        Have questions related to your semester? Post them here and get answers from your peers.
                    </Text>
                    <Button onClick={semester} colorScheme="teal" variant="outline" size="lg" fontWeight="bold" _hover={{ bg: 'teal.500', color: 'white' }}>
                        Ask Now
                    </Button>
                </Box>

                <Box
                    bgGradient="linear(to-r, black, gray.900)" // Matching gradient
                    borderRadius="2xl" // Extra rounded corners for a softer look
                    boxShadow="dark-lg"
                    p={8}
                    width="100%"
                    maxWidth="500px"
                    height="auto"
                    borderLeftWidth={8}
                    borderLeftColor="cyan.400" // Bright accent color
                    textAlign="center"
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                        transform: 'scale(1.08)',
                        boxShadow: '2xl',
                        bgGradient: 'linear(to-r, gray.900, black)', // Gradient shift on hover
                    }}
                >
                    <FaGlobe boxSize={8} color="teal.300" mb={4} /> {/* Added icon */}

                    <Heading as="h2" size="lg" mb={4} color="cyan.300" fontFamily="Poppins">
                        Ask Questions Globally
                    </Heading>
                    <Text fontSize="md" mb={6} color="gray.400" fontFamily="Poppins">
                        Want to ask something that spans beyond your semester? Post it here to get answers from the global community.
                    </Text>
                    <Button onClick={global} colorScheme="cyan" variant="outline" size="lg" fontWeight="bold" _hover={{ bg: 'cyan.500', color: 'white' }}>
                        Ask Now
                    </Button>
                </Box>
            </HStack>
        </Box>
    );
};

export default Page;
