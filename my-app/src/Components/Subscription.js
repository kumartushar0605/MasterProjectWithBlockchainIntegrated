import React from 'react';
import { Box, Button, Flex, Heading, Text, Image, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Subscription = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      justify="center"
      align="center"
      height="100vh"
      bg={isDark ? "gray.900" : "gray.50"}
    >
      <Flex>
        <MotionBox
          bg={isDark ? "gray.800" : "white"}
          borderRadius="md"
          boxShadow="2xl"
          p={6}
          m={4}
          textAlign="center"
          width="300px"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://via.placeholder.com/150"
            alt="Monthly Subscription"
            borderRadius="full"
            mb={4}
          />
          <Heading as="h2" size="lg" mb={4} color={isDark ? "white" : "black"}>
            Monthly Subscription
          </Heading>
          <Text fontSize="2xl" color="teal.400" mb={6}>
            ₹20
          </Text>
          <MotionButton
            colorScheme="teal"
            size="lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Continue
          </MotionButton>
        </MotionBox>
        <MotionBox
          bg={isDark ? "gray.800" : "white"}
          borderRadius="md"
          boxShadow="2xl"
          p={6}
          m={4}
          textAlign="center"
          width="300px"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://via.placeholder.com/150"
            alt="Yearly Subscription"
            borderRadius="full"
            mb={4}
          />
          <Heading as="h2" size="lg" mb={4} color={isDark ? "white" : "black"}>
            Yearly Subscription
          </Heading>
          <Text fontSize="2xl" color="teal.400" mb={6}>
            ₹200
          </Text>
          <MotionButton
            colorScheme="teal"
            size="lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Continue
          </MotionButton>
        </MotionBox>
      </Flex>
    </Flex>
  );
};

export default Subscription;
