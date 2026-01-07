// src/components/client/DocumentUpload.tsx
'use client';

import React, { useState } from 'react';
import { Upload, X, File, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  orderId: number;
  orderNumber: string;
  onUploadComplete?: () => void;
  onClose: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

export default function DocumentUpload({ orderId, orderNumber, onUploadComplete, onClose }: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: 'pending' | 'uploading' | 'success' | 'error' }>({});
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({});
  const [documentType, setDocumentType] = useState('general');
  const [description, setDescription] = useState('');

  const acceptedFileTypes = [
    '.pdf',
    '.doc',
    '.docx',
    '.jpg',
    '.jpeg',
    '.png',
    '.txt',
    '.xls',
    '.xlsx'
  ].join(',');

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    selectedFiles.forEach(file => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name} is too large (max 10MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    // REPLACE files instead of appending (fixes duplicate upload issue)
    setFiles(validFiles);
    
    // Clear previous upload status when selecting new files
    setUploadStatus({});
    setUploadProgress({});
    setUploadErrors({});
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    
    // Also clear status for this file
    if (fileToRemove) {
      setUploadStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[fileToRemove.name];
        return newStatus;
      });
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileToRemove.name];
        return newProgress;
      });
      setUploadErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fileToRemove.name];
        return newErrors;
      });
    }
  };

  const clearAllFiles = () => {
    setFiles([]);
    setUploadStatus({});
    setUploadProgress({});
    setUploadErrors({});
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('clientToken');

    if (!token) {
      alert('Please log in to upload documents');
      setUploading(false);
      return;
    }

    // Upload only files that haven't succeeded yet
    const filesToUpload = files.filter(file => 
      uploadStatus[file.name] !== 'success'
    );

    if (filesToUpload.length === 0) {
      alert('All files have already been uploaded successfully!');
      setUploading(false);
      return;
    }

    // Track results
    let successCount = 0;
    let failedCount = 0;

    try {
      // Upload files one by one
      for (const file of filesToUpload) {
        const fileName = file.name;
        setUploadStatus(prev => ({ ...prev, [fileName]: 'uploading' }));
        setUploadProgress(prev => ({ ...prev, [fileName]: 0 }));

        const formData = new FormData();
        formData.append('file', file);
        formData.append('orderId', orderId.toString());
        formData.append('documentType', documentType);
        formData.append('description', description);

        try {
          const response = await fetch(`${API_BASE_URL}/api/public/client/documents/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });

          const data = await response.json();
          console.log('Upload response for', fileName, ':', response.status, data);

          if (!response.ok) {
            console.error(`Failed to upload ${fileName}:`, data);
            
            // Mark as failed
            const errorMsg = data.error || data.message || 'Upload failed';
            setUploadStatus(prev => ({ ...prev, [fileName]: 'error' }));
            setUploadErrors(prev => ({ ...prev, [fileName]: errorMsg }));
            failedCount++;
          } else {
            // Mark as success
            console.log('Upload successful:', data);
            setUploadStatus(prev => ({ ...prev, [fileName]: 'success' }));
            setUploadProgress(prev => ({ ...prev, [fileName]: 100 }));
            successCount++;
          }
        } catch (error) {
          console.error(`Error uploading ${fileName}:`, error);
          const errorMessage = error instanceof Error ? error.message : 'Network error';
          setUploadStatus(prev => ({ ...prev, [fileName]: 'error' }));
          setUploadErrors(prev => ({ ...prev, [fileName]: errorMessage }));
          failedCount++;
        }
      }

      // Handle results
      console.log('Upload complete:', { successCount, failedCount });
      
      if (successCount > 0 && onUploadComplete) {
        onUploadComplete();
      }

      if (failedCount === 0) {
        // All successful - close automatically
        alert(`All ${successCount} document(s) uploaded successfully!`);
        onClose();
      } else if (successCount > 0) {
        // Partial success - show message but stay open
        alert(`${successCount} document(s) uploaded successfully, but ${failedCount} failed.\n\nYou can retry the failed uploads or close this dialog.`);
      } else {
        // All failed - show message and stay open
        alert(`All uploads failed. Please check the error messages below and try again.`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading documents. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const retryFailedUploads = () => {
    // Clear error status for failed files so they can be retried
    const failedFiles = files.filter(file => uploadStatus[file.name] === 'error');
    
    if (failedFiles.length === 0) {
      alert('No failed uploads to retry');
      return;
    }

    failedFiles.forEach(file => {
      setUploadStatus(prev => ({ ...prev, [file.name]: 'pending' }));
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      setUploadErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[file.name];
        return newErrors;
      });
    });

    // Automatically start upload
    handleUpload();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const hasSuccessful = files.some(f => uploadStatus[f.name] === 'success');
  const hasFailed = files.some(f => uploadStatus[f.name] === 'error');
  const allSuccess = files.length > 0 && files.every(f => uploadStatus[f.name] === 'success');
  const pendingCount = files.filter(f => uploadStatus[f.name] !== 'success').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
            <p className="text-sm text-gray-600 mt-1">Order: {orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            disabled={uploading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              disabled={uploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="general">General Document</option>
              <option value="contract">Contract</option>
              <option value="court_filing">Court Filing</option>
              <option value="evidence">Evidence</option>
              <option value="correspondence">Correspondence</option>
              <option value="identification">Identification</option>
              <option value="financial">Financial Document</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={uploading}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add any notes about these documents..."
            />
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Files
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                multiple
                accept={acceptedFileTypes}
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
                id="file-upload"
                key={files.length} // Reset input when files change
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, PNG, TXT, XLS, XLSX (max 10MB)
                </p>
              </label>
            </div>
          </div>

          {/* Selected Files List */}
          {files.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Selected Files ({files.length})
                  </h3>
                  {hasSuccessful && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      {files.filter(f => uploadStatus[f.name] === 'success').length} uploaded
                    </span>
                  )}
                  {hasFailed && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                      {files.filter(f => uploadStatus[f.name] === 'error').length} failed
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {hasFailed && !uploading && (
                    <button
                      onClick={retryFailedUploads}
                      className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors font-medium"
                    >
                      Retry Failed
                    </button>
                  )}
                  {!uploading && (
                    <button
                      onClick={clearAllFiles}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {files.map((file, index) => {
                  const status = uploadStatus[file.name] || 'pending';
                  const progress = uploadProgress[file.name] || 0;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                        
                        {/* Progress Bar */}
                        {status === 'uploading' && (
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-indigo-600 h-1.5 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                        
                        {/* Error Message */}
                        {status === 'error' && uploadErrors[file.name] && (
                          <p className="mt-1 text-xs text-red-600">
                            {uploadErrors[file.name]}
                          </p>
                        )}
                      </div>

                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {status === 'uploading' && (
                          <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                        )}
                        {status === 'success' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        {status === 'pending' && !uploading && (
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-violet-900">
                <p className="font-medium mb-1">Important:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Maximum file size: 10MB per file</li>
                  <li>Accepted formats: PDF, DOC, DOCX, JPG, PNG, TXT, XLS, XLSX</li>
                  <li>All documents are encrypted and securely stored</li>
                  <li>Your lawyer will be notified of new uploads</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {uploading && (
              <span>Uploading {pendingCount} file(s)...</span>
            )}
            {!uploading && allSuccess && (
              <span className="text-green-600 font-medium">All files uploaded successfully!</span>
            )}
            {!uploading && hasFailed && !allSuccess && (
              <span className="text-red-600 font-medium">Some uploads failed</span>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={uploading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {hasSuccessful ? 'Close' : 'Cancel'}
            </button>
            
            {hasFailed && !uploading && (
              <button
                onClick={retryFailedUploads}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Retry Failed ({files.filter(f => uploadStatus[f.name] === 'error').length})
              </button>
            )}
            
            <button
              onClick={handleUpload}
              disabled={uploading || files.length === 0 || allSuccess}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  {allSuccess ? 'Uploaded' : `Upload${pendingCount > 0 ? ` (${pendingCount})` : ''}`}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}