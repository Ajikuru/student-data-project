import React, { useEffect } from 'react';

const DownloadComponent = () => {
  useEffect(() => {
    // Simulate file download
    // Replace 'fileUrl' with the actual URL of the file to be downloaded
    const fileUrl = '/path/to/your/file.pdf';
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = 'filename.pdf';
    document.body.appendChild(anchor);
    anchor.click();

    // Close the window after 5 seconds
    const timeoutId = setTimeout(() => {
      window.close();
    }, 5000);

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount
  }, []);

  return (
    <div>
      <p>Your download will start shortly...</p>
    </div>
  );
};

export default DownloadComponent;
