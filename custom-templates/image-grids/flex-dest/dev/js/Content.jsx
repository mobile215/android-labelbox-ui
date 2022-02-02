import React, { useCallback } from 'react';
import ListingDetailsHeader from './ListingDetailsHeader';
import ImageGrid from './ImageGrid';
import formatEditDataForSubmission from './formatEditDataForSubmission';

export default function Content({
  assetData,
  gridImages,
  isLoading,
  onClickImage,
  labels,
  photoEdits,
  selectedListing,
  selectedImageIdx,
  setIsLoading,
  setSelectedListing,
  setSelectedImageIdx,
  setPhotoEdits,
}) {
  const handleSkip = useCallback(() => {
    setSelectedListing();
    setSelectedImageIdx();
    setIsLoading(true);
    Labelbox.skip().then(() => {
      Labelbox.fetchNextAssetToLabel();
    });
  }, []);

  const handleSubmit = useCallback(() => {
    setSelectedListing();
    setSelectedImageIdx();

    const formattedData = formatEditDataForSubmission(
      photoEdits,
      assetData?.attribute,
      assetData?.qualityTier
    );

    Labelbox.setLabelForAsset(formattedData, 'ANY').then(() => {
      Labelbox.fetchNextAssetToLabel();
      setIsLoading(true);
      setPhotoEdits([]);
    });
  }, [photoEdits, assetData]);

  return (
    <div className="content">
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <ListingDetailsHeader
            attribute={assetData?.attribute}
            qualityTier={assetData?.qualityTier}
            selectedListing={selectedListing}
          />
          <ImageGrid
            images={gridImages}
            onClickImage={onClickImage}
            labels={labels}
            photoEdits={photoEdits}
            qualityTier={assetData?.qualityTier}
            selectedImageIdx={selectedImageIdx}
          />
        </>
      )}
      <div className="cta-container">
        <a className="cta skip-cta" onClick={handleSkip}>
          Skip
        </a>
        <a className="cta submit-cta" onClick={handleSubmit}>
          Submit
        </a>
      </div>
    </div>
  );
}
