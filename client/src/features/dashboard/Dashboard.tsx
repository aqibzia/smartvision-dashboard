// src/pages/Dashboard.tsx
import { Box, Flex, Avatar, Text, Heading, Stat, StatLabel, StatNumber, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, recentRes] = await Promise.all([
          axios.get("/api/user/stats", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/api/images/recent", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setStats(statsRes.data);
        setRecent(recentRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      {/* Profile */}
      <Flex align="center" mb={8}>
        <Avatar name={user?.email} size="xl" mr={4} />
        <Box>
          <Heading>{user?.email}</Heading>
          <Text color="gray.500">Welcome back!</Text>
        </Box>
      </Flex>

      {/* Stats */}
      <SimpleGrid columns={[1, 3]} spacing={6} mb={10}>
        <Stat p={4} shadow="md" borderRadius="md" bg="white">
          <StatLabel>Total Images</StatLabel>
          <StatNumber>{stats?.totalImages || 0}</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderRadius="md" bg="white">
          <StatLabel>AI Generated</StatLabel>
          <StatNumber>{stats?.aiGenerated || 0}</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderRadius="md" bg="white">
          <StatLabel>Uploads</StatLabel>
          <StatNumber>{stats?.uploads || 0}</StatNumber>
        </Stat>
      </SimpleGrid>

      {/* Recent Images */}
      <Heading size="md" mb={4}>Recent Images</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Type</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recent?.map((img) => (
            <Tr key={img.id}>
              <Td><img src={img.url} alt="" width="60" /></Td>
              <Td>{img.type}</Td>
              <Td>{new Date(img.createdAt).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
