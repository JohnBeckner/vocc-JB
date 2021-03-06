import React, { useState, useRef } from "react";
import "../../styles/buttons.scss";

type ImageFile = File | null;

interface IProps {
  onImageChange: (imageFile: ImageFile) => void;
}

interface IFile {
  fileName: string;
  hasLoadedImage: boolean;
}

function ImportButton({ onImageChange }: IProps): JSX.Element {
  const [file, setImageFile] = useState<IFile>({
    fileName: "No file name",
    hasLoadedImage: false
  });
  const fileInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (fileInput.current) {
      if (fileInput.current.files) {
        setImageFile({
          fileName: fileInput.current.files[0].name,
          hasLoadedImage: true
        });
        onImageChange(fileInput.current.files[0]);
      }
    }
  };

  const renderLoaded = (imageTitle: string): JSX.Element => (
    <div className="import-loaded">
      Loaded <em>{imageTitle}</em>
    </div>
  );

  const renderUnloaded = (): JSX.Element => (
    <button className="button import-button">
      <label>
        Import Image
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          ref={fileInput}
          onChange={handleSubmit}
        />
      </label>
    </button>
  );

  return file.hasLoadedImage ? renderLoaded(file.fileName) : renderUnloaded();
}

export default ImportButton;
