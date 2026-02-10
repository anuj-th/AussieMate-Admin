import { useState } from "react";

/**
 * Avatar component that shows an image or initials fallback
 * @param {string} src - Image source URL
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} fullName - User's full name (fallback if first/last not provided)
 * @param {string} id - Unique ID for consistent background color hash
 * @param {string} className - Additional CSS classes
 * @param {number} size - Size in pixels (optional, default to responsive)
 */
export default function Avatar({ src, firstName, lastName, fullName, id, className = "", size }) {
    const [imageFailed, setImageFailed] = useState(false);

    // Helper to get initials
    const getInitials = (fName, lName, full) => {
        if (fName && lName) {
            return `${fName.charAt(0).toUpperCase()}${lName.charAt(0).toUpperCase()}`;
        }
        if (full) {
            const parts = full.trim().split(/\s+/);
            if (parts.length >= 2) {
                return `${parts[0].charAt(0).toUpperCase()}${parts[parts.length - 1].charAt(0).toUpperCase()}`;
            }
            return parts[0].charAt(0).toUpperCase();
        }
        return "?";
    };

    // Helper to get consistent background color
    const getBackgroundColor = (name, uid) => {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F',
            '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80', '#EC7063', '#5DADE2',
            '#F1948A', '#82E0AA', '#F4D03F', '#A569BD',
        ];
        const str = name || uid || 'default';
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const isValidUrl = (url) => {
        if (!url || typeof url !== 'string') return false;
        return url.startsWith('http') || url.startsWith('data:');
    };

    const initials = getInitials(firstName, lastName, fullName || firstName);
    const bgColor = getBackgroundColor(fullName || firstName, id);

    const containerStyle = size ? { width: `${size}px`, height: `${size}px` } : {};

    const isShowingImage = src && isValidUrl(src) && !imageFailed;

    return (
        <div
            className={`rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-100 ${className}`}
            style={{
                ...containerStyle,
                backgroundColor: isShowingImage ? 'transparent' : bgColor
            }}
        >
            {src && isValidUrl(src) && !imageFailed ? (
                <img
                    src={src}
                    alt={fullName || firstName || "Avatar"}
                    className="w-full h-full object-cover"
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <span className="text-white font-semibold text-[10px] md:text-xs leading-none" style={{ fontSize: size ? `${size * 0.35}px` : '' }}>
                    {initials}
                </span>
            )}
        </div>
    );
}
