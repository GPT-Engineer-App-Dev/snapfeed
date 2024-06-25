import React, { useState } from 'react';
import { Box, Button, Container, Flex, Grid, Heading, Image, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { FaCamera, FaHeart, FaComment } from "react-icons/fa";

const Header = ({ onUploadClick }) => (
  <Box bg="blue.500" py={4}>
    <Container maxW="container.xl">
      <Flex justify="space-between" align="center">
        <Heading color="white">PhotoShare</Heading>
        <Button leftIcon={<FaCamera />} onClick={onUploadClick} colorScheme="whiteAlpha">
          Upload
        </Button>
      </Flex>
    </Container>
  </Box>
);

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result);
        onClose();
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input type="file" onChange={handleFileChange} accept="image/*" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpload}>
            Upload
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PhotoCard = ({ imageUrl, likes, comments, onLike, isLiked }) => {
  const handleLikeClick = () => {
    onLike();
  };

  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt="User photo" />
      <Flex p={4} justify="space-between">
        <Flex align="center">
          <Button
            leftIcon={<FaHeart color={isLiked ? "red" : "gray"} />}
            onClick={handleLikeClick}
            variant="ghost"
          >
            {likes}
          </Button>
        </Flex>
        <Flex align="center">
          <FaComment />
          <Text ml={2}>{comments}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const PhotoFeed = ({ photos, onLike }) => (
  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
    {photos.map((photo, index) => (
      <PhotoCard key={index} {...photo} onLike={() => onLike(index)} />
    ))}
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
  const [photos, setPhotos] = useState([
    { imageUrl: "https://via.placeholder.com/300", likes: 15, comments: 3, isLiked: false },
    { imageUrl: "https://via.placeholder.com/300", likes: 20, comments: 5, isLiked: false },
    { imageUrl: "https://via.placeholder.com/300", likes: 10, comments: 2, isLiked: false },
    { imageUrl: "https://via.placeholder.com/300", likes: 25, comments: 7, isLiked: false },
    { imageUrl: "https://via.placeholder.com/300", likes: 18, comments: 4, isLiked: false },
    { imageUrl: "https://via.placeholder.com/300", likes: 30, comments: 8, isLiked: false }
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpload = (imageUrl) => {
    setPhotos([{ imageUrl, likes: 0, comments: 0, isLiked: false }, ...photos]);
  };

  const handleLike = (index) => {
    setPhotos(photos.map((photo, i) => {
      if (i === index) {
        return { 
          ...photo, 
          likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1,
          isLiked: !photo.isLiked
        };
      }
      return photo;
    }));
  };

  return (
    <VStack spacing={0} align="stretch" minH="100vh">
      <Header onUploadClick={onOpen} />
      <Container maxW="container.xl" flex={1} py={8}>
        <PhotoFeed photos={photos} onLike={handleLike} />
      </Container>
      <Footer />
      <UploadModal isOpen={isOpen} onClose={onClose} onUpload={handleUpload} />
    </VStack>
  );
};

export default Index;