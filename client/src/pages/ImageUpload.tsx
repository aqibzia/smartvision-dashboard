// src/pages/ImageUpload.tsx
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel, Input, Button, Image, Textarea, Progress } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function ImageUpload() {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");

  const handleFileChange = (e: any) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadImage = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post("/api/images/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / (e.total || 1))),
      });
      setResult(res.data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/images/generate", { prompt }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(res.data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6}>
      <Tabs>
        <TabList>
          <Tab>Upload</Tab>
          <Tab>AI Generate</Tab>
        </TabList>

        <TabPanels>
          {/* Upload Tab */}
          <TabPanel>
            <FormControl>
              <FormLabel>Select Image</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
            {preview && <Image src={preview} mt={4} maxH="200px" />}
            {loading && <Progress value={progress} size="sm" mt={2} />}
            <Button onClick={uploadImage} colorScheme="blue" mt={4} isLoading={loading}>
              Upload
            </Button>
          </TabPanel>

          {/* AI Generate Tab */}
          <TabPanel>
            <FormControl>
              <FormLabel>Enter Prompt</FormLabel>
              <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </FormControl>
            <Button onClick={generateImage} colorScheme="green" mt={4} isLoading={loading}>
              Generate
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {result && (
        <Box mt={8}>
          <Image src={result} maxH="300px" borderRadius="md" />
        </Box>
      )}
    </Box>
  );
}
