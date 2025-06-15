import { useState, useRef, useEffect } from "react";

interface TooltipProps {
    text: string;
    position: "top" | "bottom" | "left" | "right";
    children: React.ReactNode;
}

function Tooltip({ text, position, children }: TooltipProps) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const getTooltipPosition = () => {
        switch (position) {
            case "top":
                return "bottom-full left-1/2 -translate-x-1/2 mb-2";
            case "bottom":
                return "top-full left-1/2 -translate-x-1/2 mt-2";
            case "left":
                return "right-full top-1/2 -translate-y-1/2 mr-2";
            case "right":
                return "left-full top-1/2 -translate-y-1/2 ml-2";
            default:
                return "top-full left-1/2 -translate-x-1/2 mt-2";
        }
    };

    return (
        <div 
            className="relative inline-block"
            ref={containerRef}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
        >
            {isTooltipVisible && (
                <div
                    ref={tooltipRef}
                    className={`absolute ${getTooltipPosition()} z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md whitespace-nowrap transition-opacity duration-200 ${isTooltipVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                    {text}
                    <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 
                        ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : 
                          position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : 
                          position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : 
                          'left-[-4px] top-1/2 -translate-y-1/2'}`}
                    />
                </div>
            )}
            {children}
        </div>
    );
}

export default Tooltip;