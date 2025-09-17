import React from "react";
import { FilesData } from "../data/FilesData";
import "../styles/LatestNotes.css";

export default function LatestNotes() {
  // Function to get the latest three files across all branches/semesters/subjects
  const getLatestFiles = () => {
    const allFiles = [];

    // Iterate through the nested structure
    Object.entries(FilesData).forEach(([branch, semesters]) => {
      Object.entries(semesters).forEach(([semester, subjects]) => {
        Object.entries(subjects).forEach(([subject, files]) => {
          files.forEach((file) => {
            allFiles.push({
              ...file,
              branch,
              semester,
              subject,
            });
          });
        });
      });
    });

    // Return the last 3 files
    return allFiles.slice(-3);
  };

  const latestFiles = getLatestFiles();

  return (
    <div className="latest-notes">
      <h1>Latest Uploaded Notes</h1>
      <div className="cards-container">
        {latestFiles.map((file, index) => (
          <div key={index} className="note-card">
            <h3>{file.name}</h3>
            <div className="card-details">
              <p>
                <strong>Branch:</strong> {file.branch}
              </p>
              <p>
                <strong>Semester:</strong> {file.semester}
              </p>
              <p>
                <strong>Subject:</strong> {file.subject}
              </p>
              <p>
                <strong>Size:</strong> {file.size}
              </p>
              {file.pages && (
                <p>
                  <strong>Pages:</strong> {file.pages}
                </p>
              )}
            </div>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-button">
              View Notes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
