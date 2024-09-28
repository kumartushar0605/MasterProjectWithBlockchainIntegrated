import React, { useContext } from 'react';
import { Box, Button, HStack, IconButton, Image, Menu, MenuButton, MenuList, MenuItem, useColorModeValue, Text, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import img from "../Assests/CC.png";
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const imageSrc = img; // Replace with your image path
  const { teacherr } = useContext(Context);
  const bg = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const navigate = useNavigate();
const profileTT =()=>{
  navigate("/profileT")
}
  return (
    <Box as="header" bg={bg} p={4} boxShadow="lg">
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          {/* Circular Image with Dropdown Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Image src={imageSrc} borderRadius="full" boxSize="50px" objectFit="cover" />}
              aria-label="Options"
              variant="ghost"
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            />
            <MenuList>
              <MenuItem onClick={profileTT} icon={<FaUser />}>Profile</MenuItem>
              <MenuItem icon={<FaSignOutAlt />}>Logout</MenuItem>
            </MenuList>
          </Menu>

          {/* Display College Name */}
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            {teacherr.collegeName}
          </Text>
        </HStack>

        <Spacer />

        {/* Navigation Links */}
        <HStack spacing={1}>
          <Button as={Link} to="/" variant="ghost" colorScheme="blue" fontWeight="medium" _hover={{ bg: useColorModeValue('blue.100', 'blue.700') }}>
            Home
          </Button>
         
          <Button as={Link} to="/about" variant="ghost" colorScheme="blue" fontWeight="medium" _hover={{ bg: useColorModeValue('blue.100', 'blue.700') }}>
            About Us
          </Button>
          <Button as={Link} to="/contact" variant="ghost" colorScheme="blue" fontWeight="medium" _hover={{ bg: useColorModeValue('blue.100', 'blue.700') }}>
            Contact Us
          </Button>
          
          <Button as={Link} to="/globalt" variant="ghost" colorScheme="blue" fontWeight="medium" _hover={{ bg: useColorModeValue('blue.100', 'blue.700') }}>
            Global
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
