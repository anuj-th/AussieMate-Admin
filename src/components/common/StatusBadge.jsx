// Status configuration - centralized status types and their colors
export const STATUS_CONFIG = {
  // Job Statuses
  jobStatus: {
    Completed: {
      dot: "bg-[#17C653]",
      text: "text-[#17C653]",
      bg: "bg-[#EAFFF1]",
      border: "border-[#17C65333]",
      displayText: "Completed"
    },
    Ongoing: {
      dot: "bg-[#F6B100]",
      text: "text-[#F6B100]",
      bg: "bg-[#FFF8DD]",
      border: "border-[#F6B10033]",
      displayText: "Ongoing"
    },
    "In Progress": {
      dot: "bg-[#F6B100]",
      text: "text-[#F6B100]",
      bg: "bg-[#FFF8DD]",
      border: "border-[#F6B10033]",
      displayText: "In Progress"
    },
    Upcoming: {
      dot: "bg-[#2563EB]",
      text: "text-[#2563EB]",
      bg: "bg-[#EBF2FD]",
      border: "border-[#2563EB33]",
      displayText: "Upcoming"
    },
    Cancelled: {
      dot: "bg-[#EF4444]",
      text: "text-[#EF4444]",
      bg: "bg-[#FFE5E9]",
      border: "border-[#EF444433]",
      displayText: "Cancelled"
    },
    Rejected: {
      dot: "bg-[#EF4444]",
      text: "text-[#EF4444]",
      bg: "bg-[#FFE5E9]",
      border: "border-[#EF444433]",
      displayText: "Rejected"
    },
    Accepted: {
      dot: "bg-[#1B84FF]",
      text: "text-[#1B84FF]",
      bg: "bg-[#E1F0FF]",
      border: "border-[#1B84FF33]",
      displayText: "Accepted"
    }
  },

  // Payment Statuses
  paymentStatus: {
    Released: {
      dot: "bg-[#17C653]",
      text: "text-[#17C653]",
      bg: "bg-[#EAFFF1]",
      border: "border-[#17C65333]",
      displayText: "Released"
    },
    Held: {
      dot: "bg-[#F6B100]",
      text: "text-[#F6B100]",
      bg: "bg-[#FFF8DD]",
      border: "border-[#F6B10033]",
      displayText: "Held"
    },
    Cancelled: {
      dot: "bg-[#EF4444]",
      text: "text-[#EF4444]",
      bg: "bg-[#FFE5E9]",
      border: "border-[#EF444433]",
      displayText: "Cancelled"
    }
  },

  // Approval/KYC Statuses
  approvalStatus: {
    Verified: {
      dot: "bg-[#17C653]",
      text: "text-[#17C653]",
      bg: "bg-[#EAFFF1]",
      border: "border-[#17C65333]",
      displayText: "Verified"
    },
    Pending: {
      dot: "bg-[#F6B100]",
      text: "text-[#F6B100]",
      bg: "bg-[#FFF8DD]",
      border: "border-[#F6B10033]",
      displayText: "Pending"
    },
    Approved: {
      dot: "bg-[#17C653]",
      text: "text-[#17C653]",
      bg: "bg-[#EAFFF1]",
      border: "border-[#17C65333]",
      displayText: "Approved"
    },
    Accepted: {
      dot: "bg-[#17C653]",
      text: "text-[#17C653]",
      bg: "bg-[#EAFFF1]",
      border: "border-[#17C65333]",
      displayText: "Accepted"
    },
    Rejected: {
      dot: "bg-[#EF4444]",
      text: "text-[#EF4444]",
      bg: "bg-[#FFE5E9]",
      border: "border-[#EF444433]",
      displayText: "Rejected"
    },
    Expired: {
      dot: "bg-[#EF4444]",
      text: "text-[#EF4444]",
      bg: "bg-[#FFE5E9]",
      border: "border-[#EF444433]",
      displayText: "Expired"
    }
  },

  // Cleaner Statuses
  cleanerStatus: {
    Active: {
      dot: "bg-[#17C653]",
      text: "text-[#17C653]",
      bg: "bg-[#EAFFF1]",
      border: "border-[#17C65333]",
      displayText: "Active"
    },
    "In active": {
      dot: "bg-[#F6B100]",
      text: "text-[#F6B100]",
      bg: "bg-[#FFF8DD]",
      border: "border-[#F6B10033]",
      displayText: "In active"
    },
    Inactive: {
      dot: "bg-[#F6B100]",
      text: "text-[#F6B100]",
      bg: "bg-[#FFF8DD]",
      border: "border-[#F6B10033]",
      displayText: "Inactive"
    }
  }
};

// Normalize status value to match config keys
const normalizeStatus = (status, statusType) => {
  if (!status) return null;

  const statusLower = status.toLowerCase().trim();
  const config = STATUS_CONFIG[statusType] || {};
  const keys = Object.keys(config);

  // Direct match
  if (config[status]) return status;

  // Case-insensitive match
  const matchedKey = keys.find(key => key.toLowerCase() === statusLower);
  if (matchedKey) return matchedKey;

  // Map common variations
  const statusMappings = {
    jobStatus: {
      // Backend statuses mapped to frontend statuses
      // Backend: posted, quoted, accepted → Frontend: Upcoming
      "posted": "Upcoming",
      "quoted": "Upcoming",
      "accepted": "Upcoming",
      "accept": "Upcoming",

      // Backend: in_progress, started, pending_customer_confirmation → Frontend: Ongoing
      "in_progress": "Ongoing",
      "in-progress": "Ongoing",
      "started": "Ongoing",
      "pending_customer_confirmation": "Ongoing",
      "pending-customer-confirmation": "Ongoing",

      // Backend: completed → Frontend: Completed
      "completed": "Completed",
      "complete": "Completed",
      "done": "Completed",
      "finished": "Completed",

      // Backend: cancelled → Frontend: Cancelled
      "cancelled": "Cancelled",
      "canceled": "Cancelled",
      "cancel": "Cancelled",

      // Legacy/alternative mappings
      "ongoing": "Ongoing",
      "active": "Ongoing",
      "progress": "Ongoing",
      "upcoming": "Upcoming",
      "scheduled": "Upcoming",
      "pending": "Upcoming",
      "booked": "Upcoming"
    },
    paymentStatus: {
      "released": "Released",
      "release": "Released",
      "paid": "Released",
      "held": "Held",
      "hold": "Held",
      "pending": "Held",
      "cancelled": "Cancelled",
      "canceled": "Cancelled"
    },
    approvalStatus: {
      "verified": "Verified",
      "verify": "Verified",
      "approved": "Approved",
      "approve": "Approved",
      "accepted": "Accepted",
      "accept": "Accepted",
      "pending": "Pending",
      "rejected": "Rejected",
      "reject": "Rejected",
      "expired": "Expired"
    },
    cleanerStatus: {
      "active": "Active",
      "inactive": "Inactive",
      "in active": "In active"
    }
  };

  const mappings = statusMappings[statusType] || {};
  const mappedStatus = mappings[statusLower];
  if (mappedStatus && config[mappedStatus]) return mappedStatus;

  // Return capitalized version if it exists in config
  const capitalized = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  if (config[capitalized]) return capitalized;

  return null;
};

/**
 * StatusBadge Component
 * 
 * @param {string} status - The status value to display
 * @param {string} statusType - Type of status: 'jobStatus', 'paymentStatus', 'approvalStatus', 'cleanerStatus'
 * @param {string} className - Additional CSS classes
 * @param {string} size - Size variant: 'sm' (default) or 'md'
 * @param {string} customDisplayText - Override the display text
 */
export default function StatusBadge({
  status,
  statusType = 'jobStatus',
  className = '',
  size = 'sm',
  customDisplayText = null
}) {
  const normalizedStatus = normalizeStatus(status, statusType);
  const config = STATUS_CONFIG[statusType] || {};
  const statusConfig = normalizedStatus ? config[normalizedStatus] : null;

  // Default/fallback config
  const defaultConfig = {
    dot: "bg-gray-400",
    text: "text-gray-400",
    bg: "bg-gray-100",
    border: "border-gray-300",
    displayText: status || "Unknown"
  };

  const finalConfig = statusConfig || defaultConfig;
  const displayText = customDisplayText || finalConfig.displayText;

  // Size classes
  const sizeClasses = {
    sm: {
      text: "text-xs",
      padding: "px-2.5 py-1",
      dot: "w-1.5 h-1.5",
      gap: "gap-1.5"
    },
    md: {
      text: "text-sm",
      padding: "px-3 py-1.5",
      dot: "w-2 h-2",
      gap: "gap-2"
    }
  };

  const sizeConfig = sizeClasses[size] || sizeClasses.sm;

  return (
    <span
      className={`inline-flex items-center ${sizeConfig.gap} ${sizeConfig.padding} rounded-full border ${sizeConfig.text} font-medium ${finalConfig.bg} ${finalConfig.border} ${finalConfig.text} ${className}`}
    >
      <span
        className={`${sizeConfig.dot} rounded-full ${finalConfig.dot}`}
      />
      {displayText}
    </span>
  );
}

