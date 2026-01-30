import { Footprints } from "lucide-react";

export default function JobInfoTab({ jobDetails }) {
    return (
        <div className="bg-white rounded-xl border border-[#EEF0F5] shadow-sm">
            <h2 className="font-semibold text-sm sm:text-base text-primary px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-4 border-b border-[#F1F1F4]">Job Info</h2>

            <div className="space-y-3 px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-4">
                <div>
                    <p className="text-sm sm:text-base text-primary font-medium">
                        {jobDetails.jobInfo.category} • {jobDetails.jobInfo.petType} • {jobDetails.jobInfo.breed}
                    </p>
                    {jobDetails.jobType && jobDetails.jobType.toLowerCase().includes("pet") && (
                        <p className="text-xs sm:text-sm text-primary-light">
                            Number of pets: {jobDetails.jobInfo.numberOfPets}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2 font-medium">
                    <Footprints size={16} className="text-primary-light" />
                    <span className="text-xs sm:text-sm text-primary">
                        {jobDetails.jobInfo.serviceType}
                    </span>
                </div>

                <p className="text-xs sm:text-sm text-primary-light">{jobDetails.jobInfo.description}</p>

                {jobDetails.jobInfo.images && jobDetails.jobInfo.images.length > 0 && (
                    <div className="w-full mt-4 ">
                        <div className="grid grid-cols-2 p-2 bg-[#E5E7EB] gap-1 sm:gap-1 sm:max-w-[200px] md:max-w-[250px] rounded-xl ">
                            {jobDetails.jobInfo.images.map((img, index) => (
                                <div
                                    key={index}
                                    className="w-full aspect-square rounded-xl overflow-hidden sm:max-w-[150px] md:max-w-[150px]"
                                >
                                    <img
                                        src={img}
                                        alt={`Photo ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}