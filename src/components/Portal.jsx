import React, { useState, useEffect } from 'react';
import { AlertCircle, Loader2, Download, Link as LinkIcon, Clock } from 'lucide-react';

const Portal = () => {
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const [bulkLinks, setBulkLinks] = useState([]);
  const [bulkCount, setBulkCount] = useState(1);
  const [bulkDuration, setBulkDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('json');

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = document.cookie.includes('auth=true');
      const hasSecretPassword = document.cookie.includes('secretPassword');
      
      if (!authStatus || !hasSecretPassword) {
        window.location.href = '/protected';
      }
    };

    checkAuth();
  }, []);

  const handleCopyLink = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const generateLink = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!duration || duration <= 0) {
        throw new Error('Please enter a valid duration');
      }

      const response = await fetch('http://localhost:5000/api/generate-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ duration: parseInt(duration) }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate link');
      }

      const data = await response.json();
      setLink(data.link);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBulkLinks = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!bulkCount || bulkCount <= 0 || bulkCount > 100) {
        throw new Error('Please enter a valid number between 1 and 100');
      }

      if (!bulkDuration || bulkDuration <= 0) {
        throw new Error('Please enter a valid duration for bulk links');
      }

      const links = await Promise.all(
        Array(parseInt(bulkCount))
          .fill(null)
          .map(() =>
            fetch('http://localhost:5000/api/generate-link', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ duration: parseInt(bulkDuration) }),
            }).then(res => res.json())
          )
      );

      const linksWithMetadata = links.map((link, index) => ({
        id: index + 1,
        url: link.link,
        duration: bulkDuration,
        generatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + bulkDuration * 60000).toISOString()
      }));

      setBulkLinks(linksWithMetadata);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const exportBulkLinks = () => {
    try {
      let content;
      let filename;
      let type;

      if (downloadFormat === 'json') {
        content = JSON.stringify(bulkLinks, null, 2);
        filename = `bulk_links_${new Date().toISOString().split('T')[0]}.json`;
        type = 'application/json';
      } else if (downloadFormat === 'csv') {
        const headers = ['ID', 'URL', 'Duration (minutes)', 'Generated At', 'Expires At'];
        const csvContent = [
          headers.join(','),
          ...bulkLinks.map(link => [
            link.id,
            link.url,
            link.duration,
            link.generatedAt,
            link.expiresAt
          ].join(','))
        ].join('\n');
        content = csvContent;
        filename = `bulk_links_${new Date().toISOString().split('T')[0]}.csv`;
        type = 'text/csv';
      } else {
        content = bulkLinks.map(link => `${link.url}\n`).join('');
        filename = `bulk_links_${new Date().toISOString().split('T')[0]}.txt`;
        type = 'text/plain';
      }

      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      setError('Failed to export links');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center">
          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
          <div>
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Generate Single Access Link</h2>
          <p className="text-gray-600">Create a temporary access link with custom duration</p>
        </div>
        <div className="flex space-x-4">
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration in minutes"
            min="1"
            className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateLink}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LinkIcon className="mr-2 h-4 w-4" />
            )}
            Generate Link
          </button>
        </div>

        {link && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{link}</span>
              <button
                onClick={() => handleCopyLink(link)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Bulk Generate Links</h2>
          <p className="text-gray-600">Generate multiple access links with the same duration</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Links</label>
            <input
              type="number"
              value={bulkCount}
              onChange={(e) => setBulkCount(e.target.value)}
              placeholder="Number of links (max 100)"
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={bulkDuration}
              onChange={(e) => setBulkDuration(e.target.value)}
              placeholder="Duration in minutes"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          onClick={generateBulkLinks}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 mb-4"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <Clock className="mr-2 h-4 w-4" />
              Generate Bulk Links
            </>
          )}
        </button>

        {bulkLinks.length > 0 && (
          <div className="mt-4 space-y-4">
            <div className="max-h-60 overflow-y-auto rounded-lg border p-4">
              {bulkLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <span className="font-mono text-sm truncate block">{link.url}</span>
                    <span className="text-xs text-gray-500">
                      Expires: {new Date(link.expiresAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyLink(link.url)}
                    className="ml-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="txt">Text (URLs only)</option>
              </select>
              <button
                onClick={exportBulkLinks}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <Download className="mr-2 h-4 w-4" />
                Export as {downloadFormat.toUpperCase()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portal;