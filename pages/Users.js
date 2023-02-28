import { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Stack, Text, useToast } from "@chakra-ui/react";
import Link from 'next/link'

function User({ user }) {
    return (
      <div>
        <Link href={`/users/${user.id}`}>
          <a>{user.name}</a>
        </Link>
        <p>{user.email}</p>
      </div>
    )
  }

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  const fetchArticles = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=25&q=${searchTerm}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to fetch articles.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, searchTerm]);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
      toast({
        title: "Article deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to delete article.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    
    <Box>
      <Heading>List of Articles</Heading>
      <Input placeholder="Search articles by content" value={searchTerm} onChange={handleSearch} />
      <Stack spacing={4}>
        {articles.map((article) => (
          <Box key={article.id} p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h3" size="md">
              {article.title}
            </Heading>
            <Text mt={2}>{article.body}</Text>
            <Button mt={2} onClick={() => handleDelete(article.id)}>
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
      <Box mt={4}>
        <Button mr={4} onClick={handlePrevious}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

export default Articles;
