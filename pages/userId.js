import { useState, useEffect } from "react";
import { Box, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { Link } from "next/link";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${searchTerm}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to fetch users.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  return (
    <Box>
      <Heading>List of Users</Heading>
      <Input placeholder="Search users by name" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      <Stack spacing={4}>
        {users.map((user) => (
          <Box key={user.id} p={4} borderWidth="1px" borderRadius="lg">
            <Link href={`/users/${user.id}`}>
              <Heading as="h3" size="md" cursor="pointer">
                {user.name}
              </Heading>
            </Link>
            <Text mt={2}>{user.email}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Users;
