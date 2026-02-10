export default function AttachmentsTab({ jobDetails }) {
    const beforePhotos = jobDetails.attachments?.beforePhotos || [];
    const afterPhotos = jobDetails.attachments?.afterPhotos || [];
    const hasBeforePhotos = beforePhotos.length > 0;
    const hasAfterPhotos = afterPhotos.length > 0;

    return (
        <div className="bg-white rounded-xl border border-[#EEF0F5] shadow-sm overflow-hidden">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-primary px-4 py-2 border-b border-[#F1F1F4]">Attachments</h2>

            {!hasBeforePhotos && !hasAfterPhotos ? (
                <div className="p-8 text-center bg-white">
                    <p className="text-sm text-primary-light ">No document uploaded</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 px-4 py-4">
                    {/* Before Photos */}
                    <div>
                        {hasBeforePhotos ? (
                            <div className="relative">
                                <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100 w-full">
                                    <img
                                        src={beforePhotos[0].url || beforePhotos[0]}
                                        alt="Before"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay Text */}
                                    <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                                        Before
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100 w-full flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-sm text-primary-light">No photo uploaded</p>
                                    <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                                        Before
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* After Photos */}
                    <div>
                        {hasAfterPhotos ? (
                            <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100 w-full">
                                <img
                                    src={afterPhotos[0].url || afterPhotos[0]}
                                    alt="After"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay Text */}
                                <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                                    After
                                </span>
                            </div>
                        ) : (
                            <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100 w-full flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-sm text-primary-light">No photo uploaded</p>
                                    <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                                        After
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

