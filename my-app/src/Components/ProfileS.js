import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  HStack,
  Progress,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import img from "../Assests/images.png"
import {
  SiLeetcode,
  SiHackerrank,
  SiCodeforces,
} from 'react-icons/si';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MotionBox = motion(Box);

const profileData = {
  username: 'Ankit Kumar',
  branch: 'Computer Science',
  college: 'ITER (SOA)',
  semester: '2th',
  avatarUrl: img,
  platforms: [
    {
      name: 'LeetCode',
      icon: SiLeetcode,
      color: '#FFA116',
      rating: 1,
    },
    {
      name: 'HackerRank',
      icon: SiHackerrank,
      color: '#2EC866',
      rating: 2,
    },
    {
      name: 'Codeforces',
      icon: SiCodeforces,
      color: '#1F8ACB',
      rating: 1,
    },
  ],
  doubtsResolved: 50,
  progressPercentage: 0,
  progressOverTime: [
    { name: 'Jan', doubts: 0 },
    { name: 'Feb', doubts: 0 },
    { name: 'Mar', doubts: 0 },
    { name: 'Apr', doubts: 0 },
    { name: 'May', doubts: 0 },
    { name: 'Jun', doubts: 0 },
  ],
  semesterDoubts: [
    { topic: 'Course Assignments', count: 0 },
    { topic: 'Project Guidance', count: 0 },
    { topic: 'Exam Preparation', count: 0 },
    { topic: 'Research Topics', count: 0 },
  ],
  globalQuestions: [
    { topic: 'Career Development', count: 0 },
    { topic: 'Technology Trends', count: 0 },
    { topic: 'Study Techniques', count: 0 },
    { topic: 'Soft Skills', count: 0 },
  ],
};

const ProfileS = () => {
  const bg = useColorModeValue('gray.800', 'gray.900');
  const cardBg = useColorModeValue('gray.700', 'gray.800');
  const textColor = useColorModeValue('gray.200', 'gray.400');
  const highlightColor = useColorModeValue('cyan.400', 'cyan.500');

  const starRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          viewBox="0 0 20 20"
          color={i <= rating ? 'yellow.400' : 'gray.500'}
          boxSize={5}
        >
          <path
            fill="currentColor"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.046 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z"
          />
        </Icon>
      );
    }
    return <HStack>{stars}</HStack>;
  };

  const progressLineData = profileData.progressOverTime;
  const semesterDoubtData = profileData.semesterDoubts;
  const globalQuestionData = profileData.globalQuestions;

  return (
    <Box bg={bg} minH="100vh" py={10} px={5} color={textColor}>
      {/* Header Section */}
      <Box
        bgGradient="linear(to-r, cyan.500, blue.500)"
        borderRadius="xl"
        p={8}
        mb={10}
        boxShadow="2xl"
        position="relative"
        overflow="hidden"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
        >
          {/* User Info */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            textAlign={{ base: 'center', md: 'left' }}
            mb={{ base: 4, md: 0 }}
          >
            <Avatar
              size="2xl"
              name={profileData.username}
              src={profileData.avatarUrl}
              mb={4}
              border="4px solid white"
            />
            <Text fontSize="3xl" fontWeight="bold" color="white">
              {profileData.username}
            </Text>
            <Text fontSize="lg" color="whiteAlpha.800">
              {profileData.branch}
            </Text>
            <Text fontSize="lg" color="whiteAlpha.800">
              {profileData.college}
            </Text>
            <Text fontSize="lg" color="whiteAlpha.800">
              Semester: {profileData.semester}
            </Text>
          </MotionBox>

          {/* Platforms Info */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HStack spacing={6}>
              {profileData.platforms.map((platform) => (
                <Box
                  key={platform.name}
                  bg={cardBg}
                  p={4}
                  borderRadius="md"
                  boxShadow="lg"
                  textAlign="center"
                  _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
                >
                  <Icon
                    as={platform.icon}
                    boxSize={8}
                    color={platform.color}
                    mb={2}
                  />
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    {platform.name}
                  </Text>
                  {starRating(platform.rating)}
                </Box>
              ))}
            </HStack>
          </MotionBox>
        </Flex>
      </Box>

      {/* Main Content */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        gap={10}
      >
        {/* Progress Overview */}
        <MotionBox
          bg={cardBg}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Doubts Overview
          </Text>
          <Progress
            value={profileData.progressPercentage}
            colorScheme="cyan"
            size="lg"
            borderRadius="md"
            hasStripe
            isAnimated
            mb={4}
          />
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={highlightColor}
          >
            {profileData.progressPercentage}%
          </Text>
        </MotionBox>

        {/* Progress Line Chart */}
        <MotionBox
          bg={cardBg}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
            Doubts Asked Over Time
          </Text>
          <ResponsiveContainer width={300} height={200}>
            <LineChart data={progressLineData}>
              <XAxis dataKey="name" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="doubts"
                stroke={highlightColor}
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </MotionBox>

        {/* Semester Doubts Overview */}
        <MotionBox
          bg={cardBg}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Semester-Specific Doubts
          </Text>
          {profileData.semesterDoubts.map((doubt) => (
            <Flex
              key={doubt.topic}
              justify="space-between"
              align="center"
              mb={3}
            >
              <Text fontSize="lg" color={textColor}>
                {doubt.topic}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color={highlightColor}>
                {doubt.count}
              </Text>
            </Flex>
          ))}
        </MotionBox>

        {/* Global Questions Overview */}
        <MotionBox
          bg={cardBg}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Global Questions Overview
          </Text>
          {profileData.globalQuestions.map((question) => (
            <Flex
              key={question.topic}
              justify="space-between"
              align="center"
              mb={3}
            >
              <Text fontSize="lg" color={textColor}>
                {question.topic}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color={highlightColor}>
                {question.count}
              </Text>
            </Flex>
          ))}
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default ProfileS;
