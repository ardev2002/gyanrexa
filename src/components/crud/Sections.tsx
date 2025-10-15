"use client";
import { UploadCloud, Upload, Trash2, Info } from 'lucide-react';
import TaggedTextarea from '@/components/crud/TaggedTextArea';
import { inputValidator } from '@/utils/lib/inputValidator';
import { useState } from 'react';
import { BlogClientSection } from '@/type';

interface SectionsProps {
  type: 'CREATE' | 'UPDATE';
  sections: BlogClientSection[];
  handleSectionChange: <E extends keyof BlogClientSection, T>(index: number, field: E, value: T) => void;
}

export default function Sections({ type, sections, handleSectionChange }: SectionsProps) {
  const [signedUrl, setSignedUrl] = useState<string[]>([]);
  const handleFileSelection = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      handleSectionChange(index, 'previewUrl', reader.result);
      const res = await fetch(`/api/s3/get-presigned-url?fileName=${encodeURIComponent(file.name)}&fileType=${file.type}`);
      const { signedUrl, key } = await res.json() as { signedUrl: string; key: string };
      setSignedUrl(prev => [...prev, signedUrl]);
      handleSectionChange(index, 'imgKey', key);
    };
    reader.readAsDataURL(file);
    handleSectionChange(index, 'imageFile', file);
  };

  const handleImageUpload = async (index: number) => {
    const file = sections[index].imageFile;
    if (!file || !signedUrl[index]) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('url', signedUrl[index]);
    formData.append('key', sections[index].imgKey);
    try {
      const res = await fetch('/api/s3/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) handleSectionChange(index, 'uploadProgress', 100);
    } catch (err) {
      console.error('Upload failed', err);
      handleSectionChange(index, 'uploadProgress', 0);
    }
  };

  const removeImage = async (index: number) => {
    const imgKey = sections[index].imgKey;

    try {
      if (imgKey) {
        const res = await fetch('/api/s3/remove', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imgKey }),
        });

        if (res.ok) {
          handleSectionChange(index, 'imageFile', null);
          handleSectionChange(index, 'previewUrl', '');
          handleSectionChange(index, 'uploadProgress', 0);
          handleSectionChange(index, 'imgKey', '');
        }
      }
    } catch (error) {
      console.error('Error removing image from S3:', error);
    }
  };

  return (
    <div className="space-y-8 mt-6">
      {sections.map((section: BlogClientSection, index: number) => (
        <div key={index} className="p-4 bg-base-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Section {index + 1}</h2>

          {/* Subheading */}
          <div className='mb-4'>
            <label className="label font-semibold mb-1">Section Title</label>
            <div className="relative">
              <input
                type="text"
                value={section.subheading}
                onKeyDown={(e) => inputValidator(e, 'title')}
                onChange={(e) =>
                  handleSectionChange(index, "subheading", e.target.value)
                }
                className="input input-bordered w-full pr-10"
                placeholder="Enter section subheading"
              />
              <div
                className="tooltip tooltip-left absolute right-2 top-1/2 -translate-y-1/2"
                data-tip="Give a short title for this section"
              >
                <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
              </div>
            </div>
          </div>

          <TaggedTextarea
            value={section.paragraph}
            onChange={(val: string) => handleSectionChange(index, "paragraph", val)}
          />

          {/* Image Upload UI */}
          <div className="mb-4">
            <div className={`relative border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer ${section.imageFile
              ? 'bg-base-200 opacity-60 grayscale pointer-events-none'
              : 'border-primary hover:bg-base-200 text-primary'
              }`}>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={!!section.imageFile}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelection(index, file);
                  e.target.value = "";
                }}
              />

              <div className="flex flex-col items-center justify-center text-primary">
                <UploadCloud className="w-8 h-8 mb-2" />
                <span className="font-medium">Click or drag to select image</span>
              </div>
            </div>

            {(section.previewUrl || section.imgKey) && (
              <div className="mt-4 flex items-center gap-6 justify-center">
                <img
                  src={section.previewUrl || `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${section.imgKey}`}
                  alt="Preview"
                  className="w-48 h-48 object-contain rounded-lg shadow"
                />

                <div className="flex flex-col gap-2">
                  {!section.imgKey && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                      onClick={() => handleImageUpload(index)}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Image
                  </button>

                  {section.imgKey && section.uploadProgress > 0 && (
                    <progress
                      className="progress progress-success w-full mt-2"
                      value={section.uploadProgress}
                      max="100"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}