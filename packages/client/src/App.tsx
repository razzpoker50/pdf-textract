import React from "react"

import "./App.css"

function App() {
  const [selectedFile, setSelectedFile] = React.useState<any>(null)

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  const onFileUpload = () => {
    const formData = new FormData()

    formData.append("File", selectedFile)

    fetch("/upload", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        console.log("Success:", result)
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  return (
    <div className="App">
      <div>
        <input type="file" name="file" onChange={onFileChange} />
        {!!selectedFile ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={onFileUpload}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default App
