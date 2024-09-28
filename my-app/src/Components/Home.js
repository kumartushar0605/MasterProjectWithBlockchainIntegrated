import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Center, Grid, GridItem, List, ListItem, Spinner, Text, VStack, useColorModeValue, useBreakpointValue, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../index';

const Home = () => {
  const location = useLocation();
  const { sem ,email,name} = location.state || {};
  const {studentt} = useContext(Context)
  console.log("checking")
  console.log(studentt.name)

  const [semester, setSemester] = useState(1); // Default semester value
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null); // State to track selected chapter
  const [doubt, setDoubt] = useState(''); // State to track the user's doubt
  const [loading, setLoading] = useState(false);
  const [boxWidth, setBoxWidth] = useState(useBreakpointValue({ base: '90%', md: '500px' }));
  const formBg = useColorModeValue('white', 'gray.700');
  const navigate = useNavigate();
  const defaultBoxWidth = useBreakpointValue({ base: '90%', md: '500px' });
  const extendedBoxWidth = useBreakpointValue({ base: '90%', md: '800px' });
  const toast = useToast();

  useEffect(() => {
    // Fetch subjects and chapters for the current semester
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/subjects/${sem}`); // Send semester as part of the URL
        const data = response.data;
        
        // Set subjects with chapters
        setSubjects(data.subjects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [semester]);

  useEffect(() => {
    if (chapters.length !== 0) {
      setBoxWidth(extendedBoxWidth);
    } else {
      setBoxWidth(defaultBoxWidth);
    }
  }, [chapters, defaultBoxWidth, extendedBoxWidth]);

  const handleSubjectClick = (subject) => {
    const selectedSubject = subjects.find(sub => sub.subjectName === subject);
    if (selectedSubject) {
      setChapters(selectedSubject.chapters);
      setSelectedChapter(null); // Reset selected chapter when a new subject is selected
    }
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleDoubtChange = (e) => {
    setDoubt(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(Number(e.target.value)); // Update semester based on user selection
  };

  const handleSubmit = async () => {
    if (!selectedChapter || !doubt) {
      toast({
        title: 'Error',
        description: 'Please select a chapter and enter your doubt.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/doubts', {
        sem,
        subject: subjects.find(sub => sub.chapters.includes(selectedChapter)).subjectName,
        chapter: selectedChapter,
        doubt,
        name,
        email,
        global:"NO"
      });

      toast({
        title: 'Success',
        description: 'Your doubt has been submitted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setSelectedChapter(null);
      setDoubt('');

      navigate('/accept',{state:{email}})

    } catch (error) {
      console.error('Error submitting doubt:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your doubt. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center minH="90vh" bg={useColorModeValue('gray.100', 'gray.600')}>
      <Box p={8} width={boxWidth} maxW="800px" borderWidth={1} borderRadius="lg" boxShadow="lg" bg={formBg}>
        <Text fontSize="2xl" mb={5} textAlign="center">Subjects for Semester {sem}</Text>
       
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Grid templateColumns={chapters.length > 0 ? "repeat(2, 1fr)" : "1fr"} gap={6}>
            <GridItem>
              <VStack spacing={4}>
                <List spacing={3}>
                  {subjects.map((subject, index) => (
                    <ListItem key={index}>
                      <Button width="full" onClick={() => handleSubjectClick(subject.subjectName)}>
                        {subject.subjectName}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </VStack>
            </GridItem>
            {chapters.length > 0 && (
              <GridItem>
                <VStack spacing={4}>
                  <Box>
                    <Text fontSize="xl" mb={4} textAlign="center">Chapters</Text>
                    <List spacing={3}>
                      {chapters.map((chapter, index) => (
                        <ListItem key={index}>
                          <Button width="full" onClick={() => handleChapterClick(chapter)}>
                            {chapter}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  {selectedChapter && (
                    <Box mt={6} width="full">
                      <FormControl>
                        <FormLabel>What's your doubt in "{selectedChapter}"?</FormLabel>
                        <Input 
                          placeholder="Enter your doubt here..." 
                          value={doubt}
                          onChange={handleDoubtChange}
                        />
                      </FormControl>
                      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
                        Submit Doubt
                      </Button>
                    </Box>
                  )}
                </VStack>
              </GridItem>
            )}
          </Grid>
        )}
      </Box>
    </Center>
  );
};

export default Home;
