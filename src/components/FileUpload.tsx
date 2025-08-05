import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export const FileUpload = ({ onFileUpload, isLoading }: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setUploadedFile(file);
        onFileUpload(file);
        toast.success(`File "${file.name}" uploaded successfully!`);
      } else {
        toast.error("Please upload a valid CSV, XLS, or XLSX file");
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg p-12 text-center transition-colors duration-200 ${
            isDragActive ? 'bg-muted border-foreground' : 'hover:bg-muted/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-6" />
          <h3 className="text-xl font-semibold mb-3 text-foreground">Upload your data file</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
            Drag and drop your CSV, XLS, or XLSX file here, or click to browse
          </p>
          <Button variant="outline" className="font-medium">
            Choose File
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center space-x-4">
            <File className="h-10 w-10 text-notion-blue" />
            <div>
              <p className="font-semibold text-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
};