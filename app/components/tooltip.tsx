import { useState, useRef, useEffect } from "react";

interface TooltipProps {
    text: string;
    position: "top" | "bottom" | "left" | "right";
    children: React.ReactNode;
}

function Tooltip({ text, position: initialPosition, children }: TooltipProps) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [position, setPosition] = useState(initialPosition);
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

    useEffect(() => {
        const adjustPosition = () => {
            if (!tooltipRef.current || !containerRef.current || !isTooltipVisible) return;

            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const padding = 10; // 화면 경계와의 최소 간격

            // 초기 위치 설정
            let newPosition = initialPosition;

            // 화면 경계 체크
            if (initialPosition === 'top' && tooltipRect.top < padding) {
                newPosition = 'bottom';
            } else if (initialPosition === 'bottom' && tooltipRect.bottom > window.innerHeight - padding) {
                newPosition = 'top';
            } else if (initialPosition === 'left' && tooltipRect.left < padding) {
                newPosition = 'right';
            } else if (initialPosition === 'right' && tooltipRect.right > window.innerWidth - padding) {
                newPosition = 'left';
            }

            // 수평 방향 오버플로우 체크 (top/bottom 위치일 때)
            if ((newPosition === 'top' || newPosition === 'bottom') && 
                (tooltipRect.left < padding || tooltipRect.right > window.innerWidth - padding)) {
                // 컨테이너 중앙에서 왼쪽으로 치우친 경우
                if (containerRect.left < window.innerWidth / 2) {
                    tooltipRef.current.style.left = '0';
                    tooltipRef.current.style.transform = 'translateX(0)';
                } else {
                    tooltipRef.current.style.left = 'auto';
                    tooltipRef.current.style.right = '0';
                    tooltipRef.current.style.transform = 'translateX(0)';
                }
            }

            setPosition(newPosition);
        };

        // 툴팁이 표시될 때와 윈도우 리사이즈시 위치 조정
        adjustPosition();
        window.addEventListener('resize', adjustPosition);
        window.addEventListener('scroll', adjustPosition);

        return () => {
            window.removeEventListener('resize', adjustPosition);
            window.removeEventListener('scroll', adjustPosition);
        };
    }, [isTooltipVisible, initialPosition]);

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
                    className={` absolute ${getTooltipPosition()} z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md whitespace-nowrap transition-all duration-200 ${isTooltipVisible ? 'opacity-100' : 'opacity-0'}`}
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