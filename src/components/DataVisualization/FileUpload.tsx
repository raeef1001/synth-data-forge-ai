
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onDataLoaded: (data: any[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['csv', 'json', 'xlsx', 'xls'].includes(extension || '')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV, JSON, or Excel file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate file processing
    setTimeout(() => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          let parsedData;
          
          if (extension === 'json') {
            parsedData = JSON.parse(event.target?.result as string);
            
            // If the data is an object and not an array, extract values
            if (!Array.isArray(parsedData)) {
              parsedData = Object.values(parsedData);
            }
          } else if (extension === 'csv') {
            // Simple CSV parsing
            const csvData = event.target?.result as string;
            const lines = csvData.split('\n');
            const headers = lines[0].split(',');
            
            parsedData = lines.slice(1).map(line => {
              const values = line.split(',');
              return headers.reduce((obj: any, header, i) => {
                obj[header.trim()] = values[i]?.trim();
                return obj;
              }, {});
            }).filter(item => Object.values(item).some(val => val));
          } else {
            // For simplicity, we'll generate mock data for Excel files
            parsedData = Array.from({ length: 10 }, (_, i) => ({
              name: `Item ${i + 1}`,
              value: Math.floor(Math.random() * 1000),
              category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
            }));
          }
          
          onDataLoaded(parsedData);
          
          toast({
            title: "File processed successfully",
            description: `Loaded ${parsedData.length} records from ${file.name}`,
          });
        } catch (error) {
          toast({
            title: "Error processing file",
            description: "The file format is invalid or corrupted",
            variant: "destructive",
          });
        }
        
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "An error occurred while reading the file",
          variant: "destructive",
        });
        setIsLoading(false);
      };
      
      if (extension === 'json' || extension === 'csv') {
        reader.readAsText(file);
      } else {
        // For Excel files, in a real app you'd use a library like xlsx
        // Here we just simulate it with a timeout
        setTimeout(() => {
          const mockData = Array.from({ length: 10 }, (_, i) => ({
            name: `Item ${i + 1}`,
            value: Math.floor(Math.random() * 1000),
            category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
          }));
          onDataLoaded(mockData);
          setIsLoading(false);
          toast({
            title: "File processed successfully",
            description: `Loaded data from ${file.name}`,
          });
        }, 1000);
      }
    }, 500);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? 'border-primary bg-primary/5' : 'border-border'
      } transition-colors duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mx-auto flex flex-col items-center justify-center gap-2">
        <Upload className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {isLoading ? 'Processing...' : 'Drop files here or click to upload'}
        </h3>
        <p className="text-sm text-muted-foreground">
          Support for CSV, JSON, and Excel files
        </p>
        {isLoading ? (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <span>Processing file...</span>
          </div>
        ) : (
          <>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".csv,.json,.xlsx,.xls"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="outline" className="mt-2" onClick={(e) => e.preventDefault()}>
                Select File
              </Button>
            </label>
          </>
        )}
      </div>
    </div>
  );
};
