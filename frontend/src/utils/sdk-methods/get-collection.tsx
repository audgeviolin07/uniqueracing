import React, { useState } from "react";
import { CreateCollectionParams, CreateCollectionResult } from "./types";


const CreateCollectionComponent: React.FC = () => {
  // const { createCollection, loading, error, collectionId } = useCreateCollection();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    // const params: CreateCollectionParams = {
    //   name,
    //   description,
    //   symbol,
    // };

    // const result = await createCollection(params);
    // if (result.error) {
    //   alert(result.error);
    // }
  };

  return (
    <div>
      <h1>Create Collection</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          required
        />
        {/* <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Collection"}
        </button> */}
      </form>
      {/* {error && <p>Error: {error}</p>}
      {collectionId && <p>Collection created with ID: {collectionId}</p>} */}
    </div>
  );
};

export default CreateCollectionComponent;
