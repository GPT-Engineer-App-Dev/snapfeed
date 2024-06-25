import React from 'react';
import { Box, Container, Flex, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FaCamera, FaHeart, FaComment } from "react-icons/fa";

const Header = () => (
  <Box bg="blue.500" py={4}>
    <Container maxW="container.xl">
      <Flex justify="space-between" align="center">
        <Heading color="white">PhotoShare</Heading>
        <FaCamera color="white" size={24} />
      </Flex>
    </Container>
  </Box>
);

const PhotoCard = ({ imageUrl, likes, comments }) => (
  <Box borderWidth={1} borderRadius="lg" overflow="hidden">
    <Image src={imageUrl} alt="User photo" />
    <Flex p={4} justify="space-between">
      <Flex align="center">
        <FaHeart />
        <Text ml={2}>{likes}</Text>
      </Flex>
      <Flex align="center">
        <FaComment />
        <Text ml={2}>{comments}</Text>
      </Flex>
    </Flex>
  </Box>
);

const PhotoFeed = () => (
  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
    <PhotoCard imageUrl="https://via.placeholder.com/300" likes={15} comments={3} />
    <PhotoCard imageUrl="https://via.placeholder.com/300" likes={20} comments={5} />
    <PhotoCard imageUrl="https://via.placeholder.com/300" likes={10} comments={2} />
    <PhotoCard imageUrl="https://via.placeholder.com/300" likes={25} comments={7} />
    <PhotoCard imageUrl="https://via.placeholder.com/300" likes={18} comments={4} />
    <PhotoCard imageUrl="https://via.placeholder.com/300" likes={30} comments={8} />
  </Grid>
);

const Footer = () => (
  <Box bg="gray.100" py={4} mt={8}>
    <Container maxW="container.xl">
      <Text textAlign="center">&copy; 2023 PhotoShare. All rights reserved.</Text>
    </Container>
  </Box>
);

const Index = () => {
  return (
    <VStack spacing={0} align="stretch" minH="100vh">
      <Header />
      <Container maxW="container.xl" flex={1} py={8}>
        <PhotoFeed />
      </Container>
      <Footer />
    </VStack>
  );
};

export default Index;