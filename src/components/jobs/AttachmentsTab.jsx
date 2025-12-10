export default function AttachmentsTab({ jobDetails }) {
    return (
        <div className="bg-white rounded-xl border border-[#EEF0F5] shadow-sm">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-primary px-4 py-2  border-b border-[#F1F1F4]">Attachments</h2>

            <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 px-4 py-4">
                <div>
                    <div className="relative">
                        <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100 w-full">
                            <img
                                src={jobDetails.attachments.before}
                                alt="Before"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Text */}
                            <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                                Before
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100 w-full">
                        <img
                            src={jobDetails.attachments.after}
                            alt="After"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay Text */}
                        <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                            After
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

