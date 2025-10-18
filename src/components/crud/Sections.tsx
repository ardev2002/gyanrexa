"use client";

import { UploadCloud, Upload, Trash2, Info, Check } from 'lucide-react';
import TaggedTextarea from '@/components/crud/TaggedTextArea';
import { inputValidator } from '@/utils/lib/inputValidator';
import { useState } from 'react';
import { BlogClientSection } from '@/type';
import { getPresignedUrlAction } from '@/utils/actions/getPresignedUrlAction';
import { uploadImageAction } from '@/utils/actions/uploadImageAction';
import { deleteImageAction } from '@/utils/actions/deleteImageAction';

interface SectionsProps {
  sections: BlogClientSection[];
  handleSectionChange: <K extends keyof BlogClientSection>(
    index: number,
    field: K,
    value: BlogClientSection[K]
  ) => void;
  removeSection?: (index: number) => void;
}

export default function Sections({ sections, handleSectionChange, removeSection }: SectionsProps) {
  const [signedUrl, setSignedUrl] = useState<string[]>([]);
  const [imgKeys, setImgKeys] = useState<string[]>([]);
  const [newImgUpload, setNewImgUpload] = useState<boolean[]>([]);
  const [uploading, setUploading] = useState<boolean[]>([]);
  const [deleting, setDeleting] = useState<boolean[]>([]);

  const handleFileSelection = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      handleSectionChange(index, 'previewUrl', reader.result as string);
      const { ok, imgKey, signedUrl } = await getPresignedUrlAction({ fileName: file.name, fileType: file.type });
      if (ok) {
        setSignedUrl(prev => {
          const copy = [...prev];
          copy[index] = signedUrl!;
          return copy;
        });
        setImgKeys(prev => {
          const copy = [...prev];
          copy[index] = imgKey!;
          return copy;
        });
      }
    };
    reader.readAsDataURL(file);
    handleSectionChange(index, 'imageFile', file);
  };

  const handleImageUpload = async (index: number) => {
    const file = sections[index].imageFile;
    if (!file || !signedUrl[index]) return;
    try {
      setUploading(prev => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
      });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signedUrl', signedUrl[index]);
      const { ok } = await uploadImageAction(formData);
      if (ok) {
        handleSectionChange(index, 'imgKey', imgKeys[index]);
        setNewImgUpload(prev => {
          const copy = [...prev];
          copy[index] = true;
          return copy;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(prev => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    }
  };

  const removeImage = async (index: number) => {
    const imgKey = sections[index].imgKey;
    try {
      if (imgKey) {
        setDeleting(prev => {
          const copy = [...prev];
          copy[index] = true;
          return copy;
        });
        const { ok } = await deleteImageAction(imgKey);
        if (ok) {
          handleSectionChange(index, 'imageFile', null);
          handleSectionChange(index, 'previewUrl', '');
          handleSectionChange(index, 'imgKey', '');
        }
      }
    } catch (error) {
      console.error('Error removing image:', error);
    } finally {
      setDeleting(prev => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    }
  };

  return (
    <div className="space-y-8 mt-6">
      {sections.map((section, index) => (
        <div key={index} className="p-4 bg-base-100 rounded shadow relative">
          {/* Section Heading & Remove Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Section {index + 1}</h2>
            {removeSection && sections.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="btn btn-sm btn-error flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            )}
          </div>

          {/* Subheading */}
          <div className="mb-4">
            <label className="label font-semibold mb-1">Section Title</label>
            <div className="relative">
              <input
                type="text"
                value={section.subheading}
                onBeforeInput={(e) => inputValidator(e, 'title')}
                onChange={(e) => handleSectionChange(index, 'subheading', e.target.value)}
                className="input input-bordered border-gray-400 dark:border-gray-600 w-full pr-10"
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

          {/* Paragraph */}
          <TaggedTextarea
            value={section.paragraph}
            onChange={(val:string) => handleSectionChange(index, 'paragraph', val)}
          />

          {/* Image Upload */}
          <div className="mb-4">
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer ${
                section.imageFile ? 'bg-base-200 opacity-60 grayscale pointer-events-none' : 'border-primary hover:bg-base-200 text-primary'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={!!section.imageFile}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelection(index, file);
                  e.target.value = '';
                }}
              />
              <div className="flex flex-col items-center justify-center text-primary">
                <UploadCloud className="w-8 h-8 mb-2" />
                <span className="font-medium">Click or drag to select image</span>
              </div>
            </div>

            {(section.previewUrl || section.imgKey) && (
              <div className="mt-4 flex items-center gap-6 justify-center flex-wrap">
                <img
                  src={section.previewUrl || `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${section.imgKey}`}
                  alt="Preview"
                  className="w-48 h-48 object-contain rounded-lg shadow"
                />

                <div className="flex flex-col gap-2">
                  {!section.imgKey && (
                    <button
                      type="button"
                      disabled={uploading[index]}
                      className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                      onClick={() => handleImageUpload(index)}
                    >
                      {uploading[index] ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <div className="flex items-center gap-2"><Upload className="w-4 h-4" /> Upload</div>
                      )}
                    </button>
                  )}

                  {section.imgKey && (
                    <button
                      type="button"
                      disabled={deleting[index]}
                      className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                      onClick={() => removeImage(index)}
                    >
                      {deleting[index] ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <div className="flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete Image</div>
                      )}
                    </button>
                  )}

                  {newImgUpload[index] && section.imgKey && (
                    <div className="text-sm alert alert-success flex items-center gap-1">
                      <Check className="w-4 h-4" /> Image uploaded
                    </div>
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
