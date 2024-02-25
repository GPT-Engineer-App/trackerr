import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Heading, Text, Input, Button, InputGroup, InputLeftElement, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const toast = useToast();

  const addProject = () => {
    if (!newProjectName.trim()) {
      toast({
        title: "Error",
        description: "Project name can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setProjects([...projects, newProjectName]);
    setNewProjectName("");
  };

  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4} align="stretch">
          <Heading mb={4}>Project Tracker</Heading>

          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaPlus color="gray.300" />} />
            <Input placeholder="Add new project" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} onKeyPress={(e) => e.key === "Enter" && addProject()} />
            <Button ml={2} onClick={addProject}>
              Add
            </Button>
          </InputGroup>

          <List spacing={3}>
            {projects.map((project, index) => (
              <ListItem key={index} p={2} shadow="md" borderRadius="md" borderWidth="1px">
                <HStack justify="space-between">
                  <Text>{project}</Text>
                  <IconButton icon={<FaTrash />} onClick={() => deleteProject(index)} aria-label="Delete project" variant="ghost" />
                </HStack>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
